import { exportZkCert } from "@galactica-net/snap-api";
import { useMutation } from "@tanstack/react-query";

export const useExportZkCertMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return exportZkCert({
        zkCertStandard: "gip69",
      });
    },
  });
};
