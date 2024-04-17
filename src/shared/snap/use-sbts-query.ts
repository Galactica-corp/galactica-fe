import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { BigNumber, EventFilter, ethers } from "ethers";
import invariant from "tiny-invariant";
import { useLocalStorage } from "usehooks-ts";
import { useAccount, useProvider } from "wagmi";
import { useChain } from "shared/config/hooks";
import { IVerificationSBT__factory } from "shared/contracts";
import { SNAP_LS_KEYS } from "./const";
import { snapsKeys } from "./keys";
import { SBT, SbtDetails } from "./types";

const dappAddress = null;
const humanID = null;

export const useSbtsQuery = <TData = SbtDetails>(
  options?: UseQueryOptions<
    SbtDetails,
    Error,
    TData,
    ReturnType<typeof snapsKeys.allSbtByUser>
  > & { extraEnabled?: boolean }
) => {
  const chain = useChain();
  const contracts = sdkConfig.contracts[chain.id as unknown as ChainId];
  const { address } = useAccount();
  const provider = useProvider({ chainId: chain.id });

  const [_, setLatestBlockChecked] = useLocalStorage<string>(
    SNAP_LS_KEYS.latestBlockChecked(address),
    "0"
  );

  const [__, setSbtDetails] = useLocalStorage<SbtDetails>(
    SNAP_LS_KEYS.sbtDetails(address),
    { sbts: [] }
  );

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: snapsKeys.allSbtByUser({
      userAddress: address,
    }),
    queryFn: async () => {
      invariant(address);
      const sbtDetailsStringified = localStorage.getItem(
        SNAP_LS_KEYS.sbtDetails(address)
      );
      const latestBlockChecked =
        localStorage.getItem(SNAP_LS_KEYS.latestBlockChecked(address)) || "0";

      const sbtDetails: SbtDetails = sbtDetailsStringified
        ? JSON.parse(sbtDetailsStringified)
        : {
            sbts: [],
          };

      const sbtSC = IVerificationSBT__factory.connect(
        contracts.verificationSbt,
        provider
      );

      const currentBlock = await provider.getBlockNumber();
      const lastBlockTime = (await provider.getBlock(currentBlock)).timestamp;

      const notExpiredSbts = sbtDetails?.sbts.filter(
        (sbt) => sbt.expirationTime > lastBlockTime
      );

      // filter through all logs adding a verification SBT for the user
      const filter = {
        address: contracts.verificationSbt,
        topics: [
          ethers.utils.id("VerificationSBTMinted(address,address,bytes32)"),
          dappAddress ? ethers.utils.hexZeroPad(dappAddress, 32) : null,
          address ? ethers.utils.hexZeroPad(address, 32) : null,
          humanID ? ethers.utils.hexZeroPad(humanID, 32) : null,
        ],
      };

      const earliestBlock = await sbtSC.deploymentBlock();
      const firstBlock = Math.max(
        parseInt(latestBlockChecked.replaceAll('"', "")),
        earliestBlock.toNumber()
      );
      const maxBlockInterval = 10000;

      console.log("address", address);
      console.log("deploymentBlock: ", earliestBlock.toNumber());
      console.log("firstBlock: ", firstBlock);

      for (let i = firstBlock; i < currentBlock; i += maxBlockInterval) {
        const maxBlock = Math.min(i + maxBlockInterval, currentBlock);
        console.log(`${i}-${maxBlock}`);
        const createStakeLogs = await sbtSC.queryFilter(
          filter as EventFilter,
          i,
          maxBlock
        );

        console.log(createStakeLogs);

        for (const log of createStakeLogs) {
          if (log.topics === undefined) {
            continue;
          }
          const loggedDApp = ethers.utils.hexDataSlice(log.topics[1], 12);
          const sbtInfo = await sbtSC.getVerificationSBTInfo(
            address,
            loggedDApp
          );

          if (sbtInfo.expirationTime < BigNumber.from(lastBlockTime)) {
            continue; // skip expired SBT
          }

          const foundSbt: SBT = {
            ...sbtInfo,
            expirationTime: BigNumber.from(sbtInfo.expirationTime).toNumber(),
            userPubKey: sbtInfo.userPubKey.map((pubKey) => pubKey.toString()),
            providerPubKey: sbtInfo.userPubKey.toString(),
          };

          notExpiredSbts.push(foundSbt);
        }
        setSbtDetails({ sbts: notExpiredSbts });
        setLatestBlockChecked(maxBlock.toString());
      }

      const newSbtDetails: SbtDetails = {
        sbts: notExpiredSbts,
      };

      localStorage.setItem(
        SNAP_LS_KEYS.sbtDetails(address),
        JSON.stringify(newSbtDetails)
      );

      return newSbtDetails;
    },
    enabled:
      Boolean(address) && options?.extraEnabled === undefined
        ? true
        : Boolean(options?.extraEnabled),
    staleTime: 1000 * 60 * 10, // 10 min
    ...options,
  });
};
