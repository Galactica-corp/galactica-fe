import { useMutation } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";

export const useListZkCertsMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await window.ethereum?.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "listZkCerts",
          },
        },
      });
      console.log({ response });

      return response;
    },
  });
};
