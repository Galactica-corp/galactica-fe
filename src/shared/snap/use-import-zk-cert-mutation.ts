import { EncryptedZkCert, importZkCert } from "@galactica-net/snap-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { toastError } from "shared/utils/toasts";

import { useZkCerts } from "./hooks/use-zk-certs";
import { snapsKeys } from "./keys";

export const useImportZkCertMutation = () => {
  const [certs, setCertsList] = useZkCerts();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  return useMutation({
    mutationFn: async (objContent: unknown) => {
      return importZkCert({
        encryptedZkCert: objContent as EncryptedZkCert,
        listZkCerts: true,
      });
    },
    onSuccess: async (data: any) => {
      if (Array.isArray(data.gip69)) {
        setCertsList(certs ? [...certs, ...data.gip69] : data.gip69);
      }

      if (typeof data === "string") {
        toastError("This zkCertificate has already been imported.");
      }

      await queryClient.invalidateQueries({
        queryKey: snapsKeys.zkCertStorageHashes(address),
      });
    },
  });
};
