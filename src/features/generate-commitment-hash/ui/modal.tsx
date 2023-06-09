import { useState } from "react";
import { LearnKycLink } from "entities/kyc";
import { ReactComponent as LogoMetamask } from "shared/icons/metamask-outline.svg";
import { useGenerateCommitmentHashMutation } from "shared/snap";
import { Button, LinkButton } from "shared/ui/button";
import { Modal } from "shared/ui/modal";
import { GradientSpinner } from "shared/ui/spinner";
import { toastError, toastSuccess } from "shared/utils/toasts";

type Props = {
  onClose: () => void;
  onSuccess?: (data: string) => void;
  onError?: () => void;
};

export const GenerateModal = ({ onClose, onSuccess, onError }: Props) => {
  const [url, setUrl] = useState<string>("");
  const mutation = useGenerateCommitmentHashMutation();

  return (
    <Modal onClose={onClose}>
      <Modal.Body className="w-[650px] px-16 pb-12 pt-16" onClose={onClose}>
        {mutation.isLoading ? (
          <GradientSpinner className="h-[110px] w-[110px]" />
        ) : (
          <LogoMetamask className="h-[110px] text-grayNickel" />
        )}

        <Modal.Title className="mt-9">
          {mutation.isLoading
            ? "Generating private Commitment Hash, please wait..."
            : "To start the KYC procedure, you need to generate Commitment Hash"}
        </Modal.Title>
        <Modal.Description className="mt-3">
          The provider will not know your wallet address
        </Modal.Description>
        {url && (
          <a className="mt-5" target="_blank" href={url} rel="noreferrer">
            <Button onClick={onClose}>Pass KYC</Button>
          </a>
        )}
        {!url && (
          <Button
            className="mt-5"
            onClick={() => {
              mutation.mutate(undefined, {
                onSuccess: (data) => {
                  const url = new URL(
                    "/",
                    import.meta.env.VITE_EXAMPLE_KYC_PROVIDER_ORIGIN ??
                      "https://develop.sample-provider-devnet-41233.galactica.com"
                  );
                  url.searchParams.append("commitmentHash", data);
                  setUrl(url.toString());

                  window.open(url.toString(), "_self");

                  toastSuccess("Commitment Hash has been generated");
                },
                onError: () => {
                  toastError("Failed to Generate Commitment Hash. Try again");
                  onError?.();
                },
              });
            }}
          >
            Generate commitment hash
          </Button>
        )}

        <LearnKycLink className="link mt-10" />
      </Modal.Body>
    </Modal>
  );
};
