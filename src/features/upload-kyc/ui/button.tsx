import { ComponentProps, PropsWithChildren } from "react";
import { useImportZkCertMutation } from "shared/snap/use-import-zk-cert-mutation";
import { ClassName } from "shared/types";
import { FileInputButton } from "shared/ui/button";
import { parseJSONFile } from "shared/utils";

type Props = {
  onSuccessUpload?: (data: unknown) => void;
  onErrorUpload?: () => void;
} & ClassName &
  Omit<ComponentProps<"input">, "type" | "ref">;

export const UploadKycButton = ({
  children,
  className,
  onSuccessUpload,
  onErrorUpload,
  ...props
}: PropsWithChildren<Props>) => {
  const importCertMutation = useImportZkCertMutation();

  const onUpload = async (parsedFile: unknown) => {
    importCertMutation.mutate(parsedFile, {
      onSuccess: (data) => {
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
      {...props}
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
