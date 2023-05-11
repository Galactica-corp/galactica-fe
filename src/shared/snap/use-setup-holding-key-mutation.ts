import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { SNAP_ID } from "shared/config/const";

export const useSetupHoldingKeyMutation = () => {
  const { address } = useAccount();
  return useMutation({
    mutationFn: async () => {
      const response = await window.ethereum?.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "setupHoldingKey",
            params: {
              holderAddr: address,
            },
          },
        },
      });

      console.log({ response });
    },
  });
};
