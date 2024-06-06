import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";

import { SNAP_ID } from "shared/config/const";
import { useSnapClient } from "shared/providers/wagmi";

import { Method, WalletInvokeSnap } from "../hooks/types";

type Pa = {
  clearStorage: {
    hello: string;
  };
  deleteZkCert: Record<string, unknown>;
  exportZkCert: Record<string, unknown>;
  genZkKycProof: Record<string, unknown>;
  getHolderCommitment: Record<string, unknown>;
  getZkCertHashes: Record<string, unknown>;
  getZkCertStorageHashes: Record<string, unknown>;
  importZkCert: Record<string, unknown>;
  listZkCerts: Record<string, unknown>;
  updateMerkleProof: Record<string, unknown>;
  updateMerkleProofURL: Record<string, unknown>;
};

export const useInvokeSnapMutation = <TReturn = unknown>(
  method: Method,
  options?: UseMutationOptions<TReturn, Error, Pa[Method]>
) => {
  const client = useSnapClient();

  return useMutation({
    mutationFn: async (params?: Pa[Method]) => {
      invariant(client);
      return await client.request<WalletInvokeSnap<TReturn, Pa[Method]>>({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method,
            params,
          },
        },
      });
    },
    ...options,
  });
};
