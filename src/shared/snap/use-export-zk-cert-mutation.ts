import { exportZkCert } from "@galactica-net/snap-api";
import { useMutation } from "@tanstack/react-query";
import { invokeSnap } from "./api-sdk";

export const useExportZkCertMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return exportZkCert({
        zkCertStandard: "gip69",
      });
    },
  });
};
