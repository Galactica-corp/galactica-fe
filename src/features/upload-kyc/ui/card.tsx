import { ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { useImportZkCertMutation } from "shared/snap/use-import-zk-cert-mutation";
import { ClassName } from "shared/types";
import { ButtonTheme, FileInputButton } from "shared/ui/button";
import { parseJSONFile } from "shared/utils";

type Props = {
  title?: ReactNode;
  theme?: ButtonTheme;
  btnClassName?: string;
  onSuccessUpload?: (data: unknown) => void;
  onErrorUpload?: () => void;
} & ClassName;

export function UploadKycCard({
  title = "Drag&Drop your zkKYC secret file here",
  theme = "primaryTransparent",
  onSuccessUpload,
  onErrorUpload,
  className,
  btnClassName,
}: Props) {
  const importCertMutation = useImportZkCertMutation();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const data = await parseJSONFile(file);
    importCertMutation.mutate(data, {
      onSuccess: (data) => {
        onSuccessUpload?.(data);
      },
      onError: () => {
        onErrorUpload?.();
      },
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
    onDrop,
  });

  return (
    <div
      className={classNames(
        className,
        "card cursor-pointer items-center justify-center border-dashed bg-transparent shadow-none"
      )}
      {...getRootProps()}
    >
      {typeof title === "string" ? (
        <p className="w-56 text-center text-xl font-light text-mineShaft/50">
          {title}
        </p>
      ) : (
        title
      )}
      <span className="mb-4 mt-1 block text-sm font-light text-mineShaft/50">
        or
      </span>
      <FileInputButton
        className={btnClassName}
        isLoading={importCertMutation.isLoading}
        theme={theme}
        accept=".json"
        {...getInputProps()}
      >
        Browse files
      </FileInputButton>
    </div>
  );
}
