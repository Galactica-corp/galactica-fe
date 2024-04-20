import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";

import { SNAP_ID } from "shared/config/const";
import { useSnapClient } from "shared/providers/wagmi";

import { Method, WalletInvokeSnap } from "./types";

export const useInvokeSnapMutation = <
  Params extends Record<string, unknown> | undefined = Record<string, unknown>,
  TReturn = unknown,
>(
  method: Method,
  options?: UseMutationOptions<TReturn, Error, Params>
) => {
  const client = useSnapClient();

  return useMutation({
    mutationFn: async (params?: Params) => {
      invariant(client);
      return await client.request<WalletInvokeSnap<TReturn, Params>>({
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
