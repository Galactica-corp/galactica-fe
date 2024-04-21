import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import { QueryKey, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useLocalStorage } from "usehooks-ts";
import { Address, getContract } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import { verificationSBTAbi } from "shared/config/abi";
import { useSnapClient } from "shared/providers/wagmi";
import { UseQueryOptions } from "shared/types";

import { SNAP_LS_KEYS } from "../const";
import { SbtDetails } from "../types";
import { snapsKeys } from "./keys";

const dappAddress = null;
const humanID = null;

export const useSbtsQuery = <TData = SbtDetails>(
  options?: { extraEnabled?: boolean } & UseQueryOptions<
    SbtDetails,
    Error,
    TData,
    QueryKey
  >
) => {
  const { address, isConnected, chainId } = useAccount();
  const contracts = sdkConfig.contracts[chainId as unknown as ChainId];

  const client = useSnapClient();
  const pc = usePublicClient({ chainId: chainId });

  const [_, setLatestBlockChecked] = useLocalStorage<string>(
    SNAP_LS_KEYS.latestBlockChecked(address),
    "0"
  );

  const [__, setSbtDetails] = useLocalStorage<SbtDetails>(
    SNAP_LS_KEYS.sbtDetails(address),
    { sbts: [] }
  );

  return useQuery<SbtDetails, Error, TData, QueryKey>({
    queryKey: snapsKeys.allSbtByUser({
      userAddress: address,
    }),
    queryFn: async () => {
      invariant(address);
      invariant(client);
      invariant(pc);
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

      const contract = getContract({
        client: client,
        address: contracts.verificationSbt as Address,
        abi: verificationSBTAbi,
      });

      const currentBlock = await pc.getBlockNumber();
      const lastBlockTime = (await pc.getBlock({ blockNumber: currentBlock }))
        .timestamp;
      //
      console.log("currentBlock: ", currentBlock);
      console.log("lastBlockTime: ", lastBlockTime);
      //
      const notExpiredSbts = sbtDetails?.sbts.filter(
        (sbt) => sbt.expirationTime > lastBlockTime
      );

      const deploymentBlock = await contract.read.deploymentBlock({
        account: address,
      });

      console.log("deploymentBlock: ", deploymentBlock);

      const firstBlock = Math.max(
        parseInt(latestBlockChecked.replaceAll('"', "")),
        Number(deploymentBlock)
      );

      console.log("firstBlock: ", firstBlock);

      const maxBlockInterval = 10000;

      for (let i = firstBlock; i < currentBlock; i += maxBlockInterval) {
        const maxBlock = Math.min(i + maxBlockInterval, Number(currentBlock));

        const logs = await contract.getEvents.VerificationSBTMinted(
          {
            dApp: dappAddress ? dappAddress : null,
            user: address ? address : null,
            humanID: humanID ? humanID : null,
          },
          {
            fromBlock: BigInt(i),
            toBlock: BigInt(maxBlock),
          }
        );

        for (const log of logs) {
          log.args.dApp;
          if (!log.args.dApp) continue;

          const sbtInfo = await contract.read.getVerificationSBTInfo(
            [address, log.args.dApp],
            {
              account: address,
            }
          );

          if (sbtInfo.expirationTime < BigInt(lastBlockTime)) {
            continue; // skip expired SBT
          }

          const foundSbt = {
            ...sbtInfo,
            expirationTime: Number(sbtInfo.expirationTime),
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

      return newSbtDetails;
    },
    enabled: isConnected,
    staleTime: 1000 * 60 * 10, // 10 min
    ...options,
  });
};
