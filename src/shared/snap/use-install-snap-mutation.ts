import { useMutation, useQueryClient } from "@tanstack/react-query";
import { snapsKeys } from "./keys";

export type InstallSnapParams = {
  snapId?: string;
  version?: string;
};

export const useInstallSnapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      snapId = import.meta.env.VITE_SNAP_ID,
      version,
    }: InstallSnapParams) => {
      await window.ethereum?.request({
        method: "wallet_requestSnaps",
        params: {
          [snapId]: {
            version,
          },
        },
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries(snapsKeys.allSnap());
    },
  });
};
