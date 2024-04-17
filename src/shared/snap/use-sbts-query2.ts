// import { ChainId, sdkConfig } from "@galactica-net/snap-api";
// import { UseQueryOptions, useQuery } from "@tanstack/react-query";
// import invariant from "tiny-invariant";
// import { Address, pad, slice, toFunctionSelector } from "viem";
// import { useAccount, useChainId, usePublicClient } from "wagmi";

// import { verificationSBTAbi } from "shared/config/abi";

// import { SNAP_LS_KEYS } from "./const";
// import { snapsKeys } from "./keys";
// import { SbtDetails } from "./types";

// const dappAddress = null;
// const humanID = null;

// export const useSbtsQuery = <TData = SbtDetails>(
//   options?: { extraEnabled?: boolean } & UseQueryOptions<
//     SbtDetails,
//     Error,
//     TData,
//     ReturnType<typeof snapsKeys.allSbtByUser>
//   >
// ) => {
//   const chainId = useChainId();
//   const contracts = sdkConfig.contracts[chainId as unknown as ChainId];
//   const { address } = useAccount();
//   const pc = usePublicClient({ chainId });

//   return useQuery({
//     queryKey: snapsKeys.allSbtByUser({
//       userAddress: address,
//     }),
//     queryFn: async () => {
//       invariant(address);
//       invariant(pc);
//       const sbtDetailsStringified = localStorage.getItem(
//         SNAP_LS_KEYS.sbtDetails(address)
//       );

//       const sbtDetails: SbtDetails = sbtDetailsStringified
//         ? JSON.parse(sbtDetailsStringified)
//         : {
//             sbts: [],
//             latestBlockChecked: 0,
//           };

//       // const x = await pc.readContract({
//       //   account: address,
//       //   abi: verificationSBTAbi,
//       //   address: contracts.verificationSbt as Address,
//       //   functionName: "deploymentBlock",
//       // });

//       const currentBlock = await pc.getBlockNumber();
//       const lastBlockTime = (await pc.getBlock({ blockNumber: currentBlock }))
//         .timestamp;

//       const notExpiredSbts = sbtDetails?.sbts.filter(
//         (sbt) => sbt.expirationTime > lastBlockTime
//       );

//       // filter through all logs adding a verification SBT for the user
//       const filter = {
//         address: contracts.verificationSbt,
//         topics: [
//           toFunctionSelector("VerificationSBTMinted(address,address,bytes32)"),
//           dappAddress ? pad(dappAddress, { size: 32 }) : null,
//           address ? pad(address, { size: 32 }) : null,
//           humanID ? pad(humanID, { size: 32 }) : null,
//         ],
//       };

//       const filter2 = await pc.createContractEventFilter({
//         address: contracts.verificationSbt as Address,
//         abi: verificationSBTAbi,
//         eventName: "VerificationSBTMinted",
//         args: {
//           dappAddress: dappAddress ? pad(dappAddress, { size: 32 }) : null,
//           address: address ? pad(address, { size: 32 }) : null,
//           humanID: humanID ? pad(humanID, { size: 32 }) : null,
//         },
//       });

//       const earliestBlock = await sbtSC.deploymentBlock();
//       const firstBlock = Math.max(
//         sbtDetails.latestBlockChecked,
//         earliestBlock.toNumber()
//       );
//       const maxBlockInterval = 10000;

//       for (let i = firstBlock; i < currentBlock; i += maxBlockInterval) {
//         const maxBlock = Math.min(i + maxBlockInterval, Number(currentBlock));
//         const logs = await pc.getFilterLogs({ filter: filter2 });
//         // const createStakeLogs = await sbtSC.queryFilter(
//         //   filter as EventFilter,
//         //   i,
//         //   maxBlock
//         // );

//         for (const log of logs) {
//           const dappTopic = log.topics[1];
//           if (dappTopic === undefined) {
//             continue;
//           }
//           const loggedDApp = slice(dappTopic, 12);
//           pc.readContract({
//             abi: verificationSBTAbi,
//             functionName: "getVerificationSBTInfo",
//           });
//           const sbtInfo = await sbtSC.getVerificationSBTInfo(
//             address,
//             loggedDApp
//           );

//           if (sbtInfo.expirationTime < BigInt(lastBlockTime)) {
//             continue; // skip expired SBT
//           }

//           const foundSbt = {
//             ...sbtInfo,
//             expirationTime: BigNumber.from(sbtInfo.expirationTime).toNumber(),
//             userPubKey: sbtInfo.userPubKey.map((pubKey) => pubKey.toString()),
//             providerPubKey: sbtInfo.userPubKey.toString(),
//           };

//           notExpiredSbts.push(foundSbt);
//         }
//       }

//       const newSbtDetails: SbtDetails = {
//         sbts: notExpiredSbts,
//       };

//       localStorage.setItem(
//         SNAP_LS_KEYS.sbtDetails(address),
//         JSON.stringify(newSbtDetails)
//       );

//       return newSbtDetails;
//     },
//     enabled:
//       Boolean(address) && options?.extraEnabled === undefined
//         ? true
//         : Boolean(options?.extraEnabled),
//     staleTime: 1000 * 60 * 10, // 10 min
//     ...options,
//   });
// };
