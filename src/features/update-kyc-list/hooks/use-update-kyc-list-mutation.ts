import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { useAccountChange } from "shared/hooks";
import {
  useGetZkCertStorageHashesQuery,
  useListZkCertsMutation,
  useZkCertHash,
  useZkCerts,
} from "shared/snap";

export const useUpdateKycList = () => {
  const toastIdRef = useRef("");
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
    toastIdRef.current = toast.loading("Updating");
  });

  useEffect(() => {
    if (!toastIdRef.current) return;

    if (hashQuery.isSuccess) {
      toast.success("Updated", { id: toastIdRef.current });
      toastIdRef.current = "";
      return;
    }
    if (hashQuery.isError) {
      toast.error("Updating failed", { id: toastIdRef.current });
      toastIdRef.current = "";
      return;
    }

    if (hashQuery.data) {
      toast.success("Updated from cache", { id: toastIdRef.current });
      toastIdRef.current = "";
    }
  }, [
    hashQuery.isLoading,
    hashQuery.isSuccess,
    hashQuery.isError,
    hashQuery.data,
  ]);

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
