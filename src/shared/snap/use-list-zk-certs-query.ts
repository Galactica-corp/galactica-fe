import { useQuery } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";
import { snapsKeys } from "./keys";

export const useListZkCertsQuery = () => {
  return useQuery({
    queryKey: snapsKeys.listZKCerts(SNAP_ID),
    queryFn: async () => {
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
