import { getZkStorageHashes } from "@galactica-net/snap-api";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { useZkCertHash } from "./hooks/use-zk-cert-hash";
import { snapsKeys } from "./keys";

export const useGetZkCertStorageHashesQuery = () => {
  const { address } = useAccount();
  const [hash, setHash] = useZkCertHash();
  return useQuery({
    queryKey: snapsKeys.zkCertStorageHashes(address),
    refetchInterval: 10000,
    staleTime: 0,
    queryFn: async () => {
      const response = await getZkStorageHashes();
      if (!hash) setHash(response.gip69 ?? "");
      return response;
    },
  });
};
