import { useMutation, useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useAccount, useConnectorClient } from "wagmi";

import { SNAP_ID, SNAP_VERSION } from "shared/config/const";

import { WalletRequestSnaps } from "../hooks/types";
import { snapsKeys } from "../keys";

export type InstallSnapParams = {
  snapId?: string;
  version?: string;
};

export const useInstallSnapMutation = () => {
  const queryClient = useQueryClient();

  const { chainId } = useAccount();
  const { data: client } = useConnectorClient({ chainId });

  return useMutation({
    mutationFn: async ({
      snapId = SNAP_ID,
      version = SNAP_VERSION,
    }: InstallSnapParams) => {
      invariant(client, "Connect your MetaMask wallet to request the snap");

      return await client.request<WalletRequestSnaps>({
        method: "wallet_requestSnaps",
        params: {
          [snapId]: {
            version,
          },
        },
      });
    },
    onSuccess: (snaps) => {
      invariant(snaps, "The snap not found");

      queryClient.refetchQueries({ queryKey: snapsKeys.allSnap() });
    },
    onError: (error) => {
      console.error({ error });
    },
  });
};
