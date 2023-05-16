import { useMutation } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";

export const useExportZkCertMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await window.ethereum?.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "exportZkCert",
            params: {
              zkCertStandard: "gip69",
            },
          },
        },
      });

      console.log(response);
    },
  });
};
