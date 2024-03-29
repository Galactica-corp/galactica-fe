import { getHolderCommitment } from "@galactica-net/snap-api";
import { useMutation } from "@tanstack/react-query";

export const useGenerateCommitmentHashMutation = () => {
  return useMutation({
    mutationFn: async () => {
      console.log("useGenerateCommitmentHashMutation");
      const result = await getHolderCommitment();
      console.log(result);
      return result;
    },
    onSuccess: () => {
      console.log("SUCCESS");
    },
  });
};
