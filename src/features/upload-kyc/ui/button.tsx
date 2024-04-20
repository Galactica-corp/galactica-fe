import { ComponentProps, PropsWithChildren } from "react";

import { ImportZkCertParams } from "@galactica-net/snap-api";

import { useInvokeImportZkCertMutation } from "shared/snap/api";
import { ClassName } from "shared/types";
import { ButtonTheme, FileInputButton } from "shared/ui/button";
import { parseJSONFile } from "shared/utils";

type Props = {
  onErrorUpload?: () => void;
  onSuccessUpload?: (data: unknown) => void;
  theme?: ButtonTheme;
} & ClassName &
  Omit<ComponentProps<"input">, "ref" | "type">;

export const UploadKycButton = ({
  children,
  theme = "primaryTransparent",
  className,
  onSuccessUpload,
  onErrorUpload,
  ...props
}: PropsWithChildren<Props>) => {
  const importCertMutation = useInvokeImportZkCertMutation();

  const onUpload = async (parsedFile: unknown) => {
    importCertMutation.mutate(parsedFile as ImportZkCertParams, {
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
      accept=".json"
      className={className}
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (file)
          parseJSONFile(file).then((data) => {
            onUpload(data);
          });
      }}
      theme={theme}
    >
      {children ?? "Upload zkKYC"}
    </FileInputButton>
  );
};
