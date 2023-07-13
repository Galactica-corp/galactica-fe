import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { invokeSnap } from "./api-sdk";
import { useZkCertHash } from "./hooks/use-zk-cert-hash";
import { snapsKeys } from "./keys";

export const useGetZkCertStorageHashesQuery = () => {
  const { address } = useAccount();
  const [hash, setHash] = useZkCertHash();
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: snapsKeys.zkCertStorageHashes(address),
    refetchInterval: 10000,
    queryFn: async () => {
      const response = await invokeSnap({ method: "getZkCertStorageHashes" });
      console.log(response);
      if (!hash) setHash(response.gip69);
      return response;
    },
  });
};
