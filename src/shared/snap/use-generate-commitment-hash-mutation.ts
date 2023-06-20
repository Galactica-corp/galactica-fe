import { useMutation } from "@tanstack/react-query";
import { invokeSnap } from "./api-sdk";

export const useGenerateCommitmentHashMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return invokeSnap({ method: "getHolderCommitment" });
    },
  });
};
