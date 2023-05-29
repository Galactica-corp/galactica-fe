import { useQuery } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";
import { snapsKeys } from "./keys";

export const useGetZkCertStorageHashesQuery = () => {
  return useQuery({
    queryKey: snapsKeys.zkCertStorageHashes(SNAP_ID),
    refetchInterval: 10000,
    queryFn: async () => {
      const response = await window.ethereum?.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "getZkCertStorageHashes",
          },
        },
      });
      return response;
    },
  });
};
