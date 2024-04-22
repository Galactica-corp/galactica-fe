import { ZkCertStorageHashes } from "@galactica-net/snap-api";
import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useAccount, useChainId, useConnectorClient } from "wagmi";

import { SNAP_ID } from "shared/config/const";

import { WalletInvokeSnap } from "../hooks/types";
import { useZkCertHash } from "../hooks/use-zk-cert-hash";
import { snapsKeys } from "./keys";

export const useGetZkCertStorageHashesQuery = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: client } = useConnectorClient({ chainId });

  const [hash, setHash] = useZkCertHash();

  return useQuery({
    queryKey: snapsKeys.zkCertStorageHashes(address),
    refetchInterval: 10000,
    staleTime: 0,
    queryFn: async () => {
      invariant(client);
      const response = await client.request<
        WalletInvokeSnap<ZkCertStorageHashes>
      >({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "getZkCertStorageHashes",
          },
        },
      });

      if (!hash) setHash(response?.gip69 ?? "");

      return response ?? null;
    },
    enabled: Boolean(client),
  });
};
