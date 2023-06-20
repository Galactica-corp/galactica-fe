import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { InvokeListZkCertsResponse, invokeSnap } from "./api-sdk";

export const useListZkCertsMutation = (
  options?: UseMutationOptions<InvokeListZkCertsResponse, Error, unknown>
) => {
  return useMutation({
    mutationFn: async () => {
      return invokeSnap({ method: "listZkCerts" });
    },
    ...options,
  });
};
