import { useQueryClient } from "wagmi";
import { SNAP_ID } from "shared/config/const";
import { snapsKeys } from "shared/snap/keys";
import { useImportZkCertMutation } from "shared/snap/use-import-zk-cert-mutation";
import { FileInputButton } from "shared/ui/button";
import { parseJSONFile } from "shared/utils";

export const UploadCertButton = () => {
  const importCertMutation = useImportZkCertMutation();
  const queryClient = useQueryClient();

  const onUpload = async (parsedFile: unknown) => {
    importCertMutation.mutate(parsedFile, {
      onSuccess: (data) => {
        console.log("UploadCertButton", data);
        queryClient.invalidateQueries(snapsKeys.zkCertStorageHashes(SNAP_ID));
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <FileInputButton
      theme="primaryTransparent"
      accept=".json"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (file)
          parseJSONFile(file).then((data) => {
            onUpload(data);
          });
      }}
    >
      Upload zk cert
    </FileInputButton>
  );
};
