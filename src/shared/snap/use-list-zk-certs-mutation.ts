import { useMutation } from "@tanstack/react-query";
import { invokeSnap } from "./api-sdk";

export const useListZkCertsMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return invokeSnap({ method: "listZkCerts" });
    },
  });
};
