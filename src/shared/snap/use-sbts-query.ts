import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { BigNumber, EventFilter, ethers } from "ethers";
import invariant from "tiny-invariant";
import { useAccount, useProvider } from "wagmi";
import { IVerificationSBT__factory } from "shared/contracts";
import { CONTRACTS_ADDRESSES } from "./const";
import { useSbtDetails } from "./hooks/use-sbt-details";
import { snapsKeys } from "./keys";
import { SbtDetails } from "./types";

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
  const { address } = useAccount();
  const provider = useProvider();

  const [sbtDetails, setSbtDetails] = useSbtDetails();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: snapsKeys.allSbtByUser({
      userAddress: address,
    }),
    queryFn: async () => {
      invariant(address);
      const sbtSC = IVerificationSBT__factory.connect(
        CONTRACTS_ADDRESSES.VERIFICATION_SBT,
        provider
      );

      const currentBlock = await provider.getBlockNumber();
      const lastBlockTime = (await provider.getBlock(currentBlock)).timestamp;

      const notExpiredSbts = sbtDetails.sbts.filter(
        (sbt) => sbt.expirationTime > lastBlockTime
      );

      // filter through all logs adding a verification SBT for the user
      const filter = {
        address: CONTRACTS_ADDRESSES.VERIFICATION_SBT,
        topics: [
          ethers.utils.id("VerificationSBTMinted(address,address,bytes32)"),
          dappAddress ? ethers.utils.hexZeroPad(dappAddress, 32) : null,
          address ? ethers.utils.hexZeroPad(address, 32) : null,
          humanID ? ethers.utils.hexZeroPad(humanID, 32) : null,
        ],
      };

      const earliestBlock = await sbtSC.deploymentBlock();
      const firstBlock = Math.max(
        sbtDetails.latestBlockChecked,
        earliestBlock.toNumber()
      );
      const maxBlockInterval = 10000;

      for (let i = firstBlock; i < currentBlock; i += maxBlockInterval) {
        const maxBlock = Math.min(i + maxBlockInterval, currentBlock);
        console.log(`Querying logs from block ${i} to ${maxBlock}...`);
        const createStakeLogs = await sbtSC.queryFilter(
          filter as EventFilter,
          i,
          maxBlock
        );

        for (const log of createStakeLogs) {
          console.log(`found sbtInfo: ${JSON.stringify(log, null, 2)}}`);
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

          notExpiredSbts.push({
            ...sbtInfo,
            expirationTime: BigNumber.from(sbtInfo.expirationTime).toNumber(),
            userPubKey: sbtInfo.userPubKey.map((pubKey) => pubKey.toString()),
            providerPubKey: sbtInfo.userPubKey.toString(),
          });
        }
      }

      const newSbtDetails: SbtDetails = {
        latestBlockChecked: currentBlock,
        sbts: notExpiredSbts,
      };

      setSbtDetails(newSbtDetails);

      return newSbtDetails;
    },
    enabled:
      Boolean(address) && options?.extraEnabled === undefined
        ? true
        : options?.extraEnabled,
    staleTime: 1000 * 60 * 10,
    ...options,
  });
};
