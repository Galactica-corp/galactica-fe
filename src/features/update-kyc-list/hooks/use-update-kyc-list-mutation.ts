import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { useAccountChange } from "shared/hooks";
import {
  useGetZkCertStorageHashesQuery,
  useListZkCertsMutation,
  useZkCertHash,
  useZkCerts,
} from "shared/snap";
import { snapsKeys } from "shared/snap/keys";

export const useUpdateKycList = () => {
  const queryClient = useQueryClient();
  const [isOnboardingCompleted] = useLocalStorage(
    LS_KEYS.isOnboardingCompleted,
    false
  );

  const [zkCerts] = useZkCerts();
  const [zkHash] = useZkCertHash();
  const hashQuery = useGetZkCertStorageHashesQuery();

  const listZkCertsMutation = useListZkCertsMutation({
    onError: (err) => {
      console.error(err);
    },
  });

  useAccountChange(({ account }) => {
    if (!account) return;
    queryClient.invalidateQueries(snapsKeys.allSbt());
  });

  const isUpdateNeeded =
    Boolean(
      hashQuery.isSuccess &&
        hashQuery.data &&
        isOnboardingCompleted &&
        zkHash &&
        zkHash !== hashQuery.data.gip69
    ) ||
    (zkHash && zkCerts.length === 0);

  return [isUpdateNeeded, listZkCertsMutation] as const;
};
