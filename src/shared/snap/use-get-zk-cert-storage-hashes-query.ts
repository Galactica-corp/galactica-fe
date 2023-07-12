import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS, SNAP_ID } from "shared/config/const";
import { invokeSnap } from "./api-sdk";
import { snapsKeys } from "./keys";

export const useGetZkCertStorageHashesQuery = () => {
  const [hash, setHash] = useLocalStorage(LS_KEYS.zkHashGip69, "");
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: snapsKeys.zkCertStorageHashes(SNAP_ID),
    refetchInterval: 10000,
    queryFn: async () => {
      const response = await invokeSnap({ method: "getZkCertStorageHashes" });
      if (!hash) setHash(response.gip69);
      return response;
    },
  });
};
