import { useQuery } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";
import { invokeSnap } from "./api-sdk";
import { snapsKeys } from "./keys";

export const useGetZkCertStorageHashesQuery = () => {
  return useQuery({
    queryKey: snapsKeys.zkCertStorageHashes(SNAP_ID),
    refetchInterval: 10000,
    queryFn: async () => {
      return invokeSnap({ method: "getZkCertStorageHashes" });
    },
  });
};
