import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import {
  useGetZkCertStorageHashesQuery,
  useListZkCertsMutation,
} from "shared/snap";
import { ZkCertsListItem } from "shared/snap/types";

export const useUpdateKycList = () => {
  const [_certsList] = useLocalStorage<ZkCertsListItem[]>(LS_KEYS.zkCerts, []);
  const [isOnboardingCompleted] = useLocalStorage(
    LS_KEYS.isOnboardingCompleted,
    false
  );
  const [zkHash] = useLocalStorage(LS_KEYS.zkHashGip69, "");
  const hashQuery = useGetZkCertStorageHashesQuery();

  const listZkCertsMutation = useListZkCertsMutation({
    onError: (err) => {
      console.error(err);
    },
  });

  const isUpdateNeeded = Boolean(
    hashQuery.isSuccess &&
      hashQuery.data &&
      isOnboardingCompleted &&
      zkHash &&
      zkHash !== hashQuery.data.gip69
  );

  return [isUpdateNeeded, listZkCertsMutation] as const;
};
