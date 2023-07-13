import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import {
  useGetZkCertStorageHashesQuery,
  useListZkCertsMutation,
  useZkCertHash,
} from "shared/snap";

export const useUpdateKycList = () => {
  const [isOnboardingCompleted] = useLocalStorage(
    LS_KEYS.isOnboardingCompleted,
    false
  );
  const [zkHash] = useZkCertHash();
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
