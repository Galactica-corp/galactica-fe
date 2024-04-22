import { ReactNode } from "react";
import { useDropzone } from "react-dropzone";

import {
  EncryptedZkCert,
  ImportZkCertParams,
  ZkCertMetadataList,
} from "@galactica-net/snap-api";
import { useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

import { snapsKeys, useZkCerts } from "shared/snap";
import { useInvokeSnapMutation } from "shared/snap/api/use-invoke-snap-mutation";
import { ClassName } from "shared/types";
import { ButtonTheme, FileInputButton } from "shared/ui/button";
import { parseJSONFile } from "shared/utils";
import { toastError } from "shared/utils/toasts";

type Props = {
  btnClassName?: string;
  onErrorUpload?: () => void;
  onSuccessUpload?: (data: unknown) => void;
  theme?: ButtonTheme;
  title?: ReactNode;
} & ClassName;

export function UploadKycCard({
  title = "Drag&Drop your zkKYC secret file here",
  theme = "primaryTransparent",
  onSuccessUpload,
  onErrorUpload,
  className,
  btnClassName,
}: Props) {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const [certs, setCertsList] = useZkCerts();

  const importCertMutation = useInvokeSnapMutation<
    ImportZkCertParams,
    ZkCertMetadataList
  >("importZkCert");

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const data = await parseJSONFile(file);
    importCertMutation.mutate(
      {
        encryptedZkCert: data as EncryptedZkCert,
        listZkCerts: true,
      },
      {
        onSuccess: async (data) => {
          if (Array.isArray(data.gip69)) {
            setCertsList(certs ? [...certs, ...data.gip69] : data.gip69);
          }

          if (typeof data === "string") {
            toastError("This zkCertificate has already been imported.");
          }

          await queryClient.invalidateQueries({
            queryKey: snapsKeys.zkCertStorageHashes(address),
          });

          onSuccessUpload?.(data);
        },
        onError: () => {
          onErrorUpload?.();
        },
      }
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
    onDrop,
  });

  return (
    <div
      className={twMerge(
        "card cursor-pointer items-center justify-center border-dashed bg-transparent shadow-none transition-colors",
        isDragActive && "border-sandyBrown",
        className
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
        accept=".json"
        className={btnClassName}
        isLoading={importCertMutation.isPending}
        theme={theme}
        {...getInputProps()}
      >
        Browse files
      </FileInputButton>
    </div>
  );
}
