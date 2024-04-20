import {
  ImportZkCertParams,
  ZkCertMetadataList,
} from "@galactica-net/snap-api";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { useInvokeSnapMutation } from "../hooks/use-invoke-snap-mutation";

export const useInvokeImportZkCertMutation = () => {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  return useInvokeSnapMutation<ImportZkCertParams, ZkCertMetadataList>(
    "importZkCert",
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
};
