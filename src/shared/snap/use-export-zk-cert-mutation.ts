import { useMutation } from "@tanstack/react-query";
import { invokeSnap } from "./api-sdk";

export const useExportZkCertMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return invokeSnap({
        method: "exportZkCert",
        params: {
          zkCertStandard: "gip69",
        },
      });
    },
  });
};
