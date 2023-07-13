import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { invokeSnap } from "./api-sdk";
import { useZkCertHash } from "./hooks/use-zk-cert-hash";
import { useZkCerts } from "./hooks/use-zk-certs";
import { snapsKeys } from "./keys";

export const useClearStorageMutation = () => {
  const { address } = useAccount();
  const [_, setZkCerts] = useZkCerts();
  const [_h, setZkHash] = useZkCertHash();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return invokeSnap({ method: "clearStorage" });
    },
    onSuccess: () => {
      setZkCerts([]);
      setZkHash("");

      queryClient.invalidateQueries(snapsKeys.zkCertStorageHashes(address));
    },
  });
};
