// import { UseMutationOptions, useMutation } from "@tanstack/react-query";
// import invariant from "tiny-invariant";
// import { useChainId, useConnectorClient } from "wagmi";

// import { SNAP_ID } from "shared/config/const";
// import { WalletInvokeSnap } from "shared/providers/wagmi";

// // import { useZkCertHash } from "./hooks/use-zk-cert-hash";
// // import { useZkCerts } from "./hooks/use-zk-certs";
// // import { useGetZkCertStorageHashesQuery } from "./use-get-zk-cert-storage-hashes-query";

// type ZkCertListItem = {
//   expirationDate: number;
//   providerPubKey: {
//     ax: string;
//     ay: string;
//   };
//   verificationLevel: string;
// };

// export const useZkCertsMutation = () => {
//   const [_, setCertsList] = useZkCerts();
//   const [_h, setZkHash] = useZkCertHash();
//   const hashQuery = useGetZkCertStorageHashesQuery();

//   const chainId = useChainId();
//   const { data: client } = useConnectorClient({ chainId });

//   return useMutation({
//     mutationFn: async () => {
//       invariant(client);
//       const certs = await client.request<
//         WalletInvokeSnap<{ gip69: ZkCertListItem[] }>
//       >({
//         method: "wallet_invokeSnap",
//         params: {
//           snapId: SNAP_ID,
//           request: {
//             method: "listZkCerts",
//           },
//         },
//       });
//       return certs;
//     },
//     onSuccess: (data) => {
//       console.log(data);
//       if (!hashQuery.data) return;
//       setCertsList(data.gip69 ?? []);
//       setZkHash(hashQuery.data.gip69 ?? "");
//     },
//   });
// };
