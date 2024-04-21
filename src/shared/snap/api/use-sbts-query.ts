import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, pad, slice } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import { verificationSBTAbi } from "shared/config/abi";
import { useSnapClient } from "shared/providers/wagmi";

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

  return useQuery({
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

      const sbtDetails: SbtDetails = sbtDetailsStringified
        ? JSON.parse(sbtDetailsStringified)
        : {
            sbts: [],
            latestBlockChecked: 0,
          };

      const currentBlock = await pc.getBlockNumber();
      const lastBlockTime = (await pc.getBlock({ blockNumber: currentBlock }))
        .timestamp;

      const notExpiredSbts = sbtDetails?.sbts.filter(
        (sbt) => sbt.expirationTime > lastBlockTime
      );

      const filter = await pc.createContractEventFilter({
        address: contracts.verificationSbt as Address,
        abi: verificationSBTAbi,
        eventName: "VerificationSBTMinted",
        args: {
          dappAddress: dappAddress ? pad(dappAddress, { size: 32 }) : null,
          address: address ? pad(address, { size: 32 }) : null,
          humanID: humanID ? pad(humanID, { size: 32 }) : null,
        },
      });

      const deploymentBlock = await pc.readContract({
        account: address,
        abi: verificationSBTAbi,
        address: contracts.verificationSbt as Address,
        functionName: "deploymentBlock",
      });

      const firstBlock = Math.max(
        sbtDetails.latestBlockChecked,
        Number(deploymentBlock)
      );
      const maxBlockInterval = 10000;

      for (let i = firstBlock; i < currentBlock; i += maxBlockInterval) {
        const maxBlock = Math.min(i + maxBlockInterval, Number(currentBlock));
        const logs = await pc.getFilterLogs({ filter });

        for (const log of logs) {
          const dappTopic = log.topics[1];
          if (dappTopic === undefined) {
            continue;
          }
          const loggedDApp = slice(dappTopic, 12);
          const sbtInfo = await pc.readContract({
            account: address,
            address: contracts.verificationSbt as Address,
            abi: verificationSBTAbi,
            functionName: "getVerificationSBTInfo",
            args: [address, loggedDApp],
          });

          if (sbtInfo.expirationTime < BigInt(lastBlockTime)) {
            continue; // skip expired SBT
          }

          const foundSbt = {
            ...sbtInfo,
            expirationTime: Number(sbtInfo.expirationTime),
            userPubKey: sbtInfo.userPubKey.map((pubKey) => pubKey.toString()),
            providerPubKey: sbtInfo.userPubKey.toString(),
          };

          console.log(foundSbt);

          // notExpiredSbts.push(foundSbt);
        }
      }

      const newSbtDetails: SbtDetails = {
        sbts: notExpiredSbts,
        latestBlockChecked: 0,
      };

      localStorage.setItem(
        SNAP_LS_KEYS.sbtDetails(address),
        JSON.stringify(newSbtDetails)
      );

      return newSbtDetails;
    },
    enabled: isConnected,
    staleTime: 1000 * 60 * 10, // 10 min
    ...options,
  });
};
