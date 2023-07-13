import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { InvokeListZkCertsResponse, invokeSnap } from "./api-sdk";
import { useZkCertHash } from "./hooks/use-zk-cert-hash";
import { useZkCerts } from "./hooks/use-zk-certs";
import { useGetZkCertStorageHashesQuery } from "./use-get-zk-cert-storage-hashes-query";

export const useListZkCertsMutation = (
  options?: UseMutationOptions<InvokeListZkCertsResponse, Error, unknown>
) => {
  const [_, setCertsList] = useZkCerts();
  const [_h, setZkHash] = useZkCertHash();
  const hashQuery = useGetZkCertStorageHashesQuery();

  return useMutation({
    mutationFn: async () => {
      return invokeSnap({ method: "listZkCerts" });
    },
    onSuccess: (data) => {
      if (!hashQuery.data) return;
      setCertsList(data.gip69 ?? []);
      setZkHash(hashQuery.data.gip69 ?? "");
    },
    ...options,
  });
};
