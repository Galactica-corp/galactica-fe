import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { useAccountEffect } from "wagmi";

import { LS_KEYS } from "shared/config/const";
import { useZkCertHash, useZkCerts } from "shared/snap";
import { useGetZkCertStorageHashesQuery } from "shared/snap/api";
import { snapsKeys } from "shared/snap/api/keys";
import { useInvokeSnapMutation } from "shared/snap/hooks/use-invoke-snap-mutation";

export const useUpdateKycList = () => {
  const [isOnboardingCompleted] = useLocalStorage(
    LS_KEYS.isOnboardingCompleted,
    false
  );

  const [zkCerts] = useZkCerts();
  const [zkHash] = useZkCertHash();
  const hashQuery = useGetZkCertStorageHashesQuery();

  const listZkCertsMutation = useInvokeSnapMutation("listZkCerts", {
    onError: (err) => {
      console.error(err);
    },
  });

  const queryClient = useQueryClient();

  useAccountEffect({
    onConnect: () => {
      queryClient.invalidateQueries({ queryKey: snapsKeys.allSbt() });
    },
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
