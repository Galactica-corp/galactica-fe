import { useMutation } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";

export const useGenerateCommitmentHashMutation = () => {
  return useMutation({
    mutationFn: async () => {
      console.log("hello world");
      const holderCommitment = await window.ethereum?.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "getHolderCommitment",
          },
        },
      });

      console.log(holderCommitment);
    },
  });
};
