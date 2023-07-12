import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { InvokeListZkCertsResponse, invokeSnap } from "./api-sdk";
import { ZkCertsListItem } from "./types";
import { useGetZkCertStorageHashesQuery } from "./use-get-zk-cert-storage-hashes-query";

export const useListZkCertsMutation = (
  options?: UseMutationOptions<InvokeListZkCertsResponse, Error, unknown>
) => {
  const [_certsList, setCertsList] = useLocalStorage<ZkCertsListItem[]>(
    LS_KEYS.zkCerts,
    []
  );
  const [_zkHash, setZkHash] = useLocalStorage(LS_KEYS.zkHashGip69, "");
  const hashQuery = useGetZkCertStorageHashesQuery();

  return useMutation({
    mutationFn: async () => {
      return invokeSnap({ method: "listZkCerts" });
    },
    onSuccess: (data) => {
      if (!hashQuery.data) return;
      setCertsList(data.gip69 ?? []);
      setZkHash(hashQuery.data.gip69);
    },
    ...options,
  });
};
