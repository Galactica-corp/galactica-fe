import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useImportZkCertMutation } from "shared/snap/use-import-zk-cert-mutation";
import { FileInputButton } from "shared/ui/button";
import { parseJSONFile } from "shared/utils";

type Props = {
  onSuccessUpload?: (data: unknown) => void;
  onErrorUpload?: () => void;
};

export function UploadKycCard({ onSuccessUpload, onErrorUpload }: Props) {
  const importCertMutation = useImportZkCertMutation();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const data = await parseJSONFile(file);
    const id = toast.loading("Uploading KYC...", {
      duration: 10000,
    });
    importCertMutation.mutate(data, {
      onSuccess: (data) => {
        onSuccessUpload?.(data);
        toast.success("KYC has been uploaded!", {
          id,
        });
      },
      onError: (err) => {
        onErrorUpload?.();
        const message =
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof err.message === "string"
            ? err.message
            : "Something went wrong. Try again!";
        toast.error(message, {
          id,
        });
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
      className="card cursor-pointer items-center justify-center border-dashed shadow-none"
      {...getRootProps()}
    >
      <FileInputButton
        isLoading={importCertMutation.isLoading}
        theme="primaryTransparent"
        accept=".json"
        {...getInputProps()}
      >
        Upload KYC
      </FileInputButton>
      <div className="mt-[1.05rem] w-[15rem] text-center text-[0.875rem] text-mineShaft/50">
        If you already passed KYC but didn&apos;t upload its secret file to your
        wallet
      </div>
    </div>
  );
}
