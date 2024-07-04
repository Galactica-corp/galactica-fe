import { ZkCertListItem } from "@galactica-net/snap-api";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { useAccountEffect } from "wagmi";

import { LS_KEYS } from "shared/config/const";
import { useZkCertHashes, useZkCerts } from "shared/snap";
import { useGetZkCertStorageHashesQuery } from "shared/snap/api";
import { snapsKeys } from "shared/snap/api/keys";
import { useInvokeSnapMutation } from "shared/snap2/rq";

export const useUpdateKycList = () => {
  const [isOnboardingCompleted] = useLocalStorage(
    LS_KEYS.isOnboardingCompleted,
    false
  );

  const [zkCerts, setCertsList] = useZkCerts();
  const [hashes, setHashes] = useZkCertHashes();
  const hashQuery = useGetZkCertStorageHashesQuery();

  const listZkCertsMutation = useInvokeSnapMutation("listZkCerts", {
    onError: (err) => {
      console.error(err);
    },
    onSuccess(data) {
      const newCerts: ZkCertListItem[] = [...Object.values(data).flat()];
      setCertsList(newCerts);
      setHashes(hashQuery.data);
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
        hashes &&
        Object.entries(hashQuery.data).some(
          ([key, value]) => hashes[key] !== value
        )
    ) ||
    (hashes && !zkCerts);

  return [isUpdateNeeded, listZkCertsMutation] as const;
};
