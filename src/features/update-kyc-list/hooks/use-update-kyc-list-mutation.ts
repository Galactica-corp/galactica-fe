import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import {
  useGetZkCertStorageHashesQuery,
  useListZkCertsMutation,
} from "shared/snap";
import { ZkCertsListItem } from "shared/snap/types";

export const useUpdateKycList = () => {
  const [_certsList, setCertsList] = useLocalStorage<ZkCertsListItem[]>(
    LS_KEYS.zkCerts,
    []
  );
  const [zkHash, setZkHash] = useLocalStorage(LS_KEYS.zkHashGip69, "");
  const hashQuery = useGetZkCertStorageHashesQuery();
  const listZkCertsMutation = useListZkCertsMutation({
    onSuccess: (data) => {
      if (!hashQuery.data) return;
      setCertsList(data.gip69 ?? []);
      setZkHash(hashQuery.data.gip69);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const isUpdateNeeded = Boolean(
    hashQuery.isSuccess && hashQuery.data && zkHash !== hashQuery.data.gip69
  );

  return [isUpdateNeeded, listZkCertsMutation] as const;
};
