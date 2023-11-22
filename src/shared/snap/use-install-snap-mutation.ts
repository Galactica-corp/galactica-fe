import { connectSnap } from "@galactica-net/snap-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";
import { snapsKeys } from "./keys";
import { useListZkCertsMutation } from "./use-list-zk-certs-mutation";

export type InstallSnapParams = {
  snapId?: string;
  version?: string;
};

export const useInstallSnapMutation = () => {
  const queryClient = useQueryClient();
  const listZkCertsMutation = useListZkCertsMutation();
  return useMutation({
    mutationFn: async ({ snapId = SNAP_ID, version }: InstallSnapParams) => {
      await connectSnap(snapId, { version: version });
    },
    onSuccess: () => {
      console.log("SUCCCESS");
      queryClient.refetchQueries(snapsKeys.allSnap());
      listZkCertsMutation.mutate({});
    },
    onError: (error) => {
      console.log({ error });
    },
  });
};
