import { useMutation } from "@tanstack/react-query";
import { invokeSnap } from "./api-sdk";

export const useClearStorageMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return invokeSnap({ method: "clearStorage" });
    },
  });
};
