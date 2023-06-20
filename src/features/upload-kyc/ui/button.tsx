import { PropsWithChildren } from "react";
import { useQueryClient } from "wagmi";
import { SNAP_ID } from "shared/config/const";
import { snapsKeys } from "shared/snap/keys";
import { useImportZkCertMutation } from "shared/snap/use-import-zk-cert-mutation";
import { ClassName } from "shared/types";
import { FileInputButton } from "shared/ui/button";
import { parseJSONFile } from "shared/utils";

type Props = {
  onSuccessUpload?: (data: unknown) => void;
  onErrorUpload?: () => void;
} & ClassName;

export const UploadKycButton = ({
  children,
  className,
  onSuccessUpload,
  onErrorUpload,
}: PropsWithChildren<Props>) => {
  const importCertMutation = useImportZkCertMutation();
  const queryClient = useQueryClient();

  const onUpload = async (parsedFile: unknown) => {
    importCertMutation.mutate(parsedFile, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(snapsKeys.zkCertStorageHashes(SNAP_ID));
        onSuccessUpload?.(data);
      },
      onError: (err) => {
        console.error(err);
        onErrorUpload?.();
      },
    });
  };

  return (
    <FileInputButton
      className={className}
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
      {children ?? "Upload zk cert"}
    </FileInputButton>
  );
};
