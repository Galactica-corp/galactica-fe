import { useMutation } from "wagmi";
import { SNAP_ID } from "shared/config/const";

export const useImportZkCertMutation = () => {
  return useMutation(async (fileContent: any) => {
    const response = await window.ethereum?.request({
      method: "wallet_invokeSnap",
      params: {
        snapId: SNAP_ID,
        request: {
          method: "importZkCert",
          params: {
            zkCert: JSON.parse(fileContent),
          },
        },
      },
    });
  });
};
