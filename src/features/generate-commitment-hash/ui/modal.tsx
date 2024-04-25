import { useState } from "react";

import { captureException } from "@sentry/react";

import { LearnKycLink } from "entities/kyc";
import { default as LogoMetamask } from "shared/icons/metamask-outline.svg?react";
import { useInvokeSnapMutation } from "shared/snap/api/use-invoke-snap-mutation";
import { Button } from "shared/ui/button";
import { Modal } from "shared/ui/modal";
import { GradientSpinner } from "shared/ui/spinner";
import { toastError, toastSuccess } from "shared/utils/toasts";

export type Guardian = {
  avgTime: string;
  link: string;
  number: number;
  score: string;
  title: string;
  totalDocs: string;
};

type Props = {
  guardian: Guardian;
  onClose: () => void;
  onError?: () => void;
};

type HolderCommitmentData = {
  encryptionPubKey: string;
  holderCommitment: string;
};

export const GenerateModal = ({ guardian, onClose, onError }: Props) => {
  const [url, setUrl] = useState<string>("");
  const mutation = useInvokeSnapMutation<undefined, HolderCommitmentData>(
    "getHolderCommitment"
  );

  return (
    <Modal onClose={onClose}>
      <Modal.Body className="w-[650px] px-14 pb-12 pt-16" onClose={onClose}>
        {mutation.isPending ? (
          <GradientSpinner className="size-[110px]" />
        ) : (
          <LogoMetamask className="h-[110px] text-grayNickel" />
        )}

        <Modal.Title className="mt-9">
          {mutation.isPending
            ? "Generating private Commitment Hash, please wait..."
            : "To begin the zkKYC procedure you need to generate a Commitment Hash"}
        </Modal.Title>
        <Modal.Description className="mt-3">
          Only you will know that the wallet address belongs to you.
        </Modal.Description>
        {url && (
          <a
            className="mt-5 cursor-pointer"
            href={url}
            rel="noreferrer"
            target="_blank"
          >
            <Button onClick={onClose}>Pass zkKYC</Button>
          </a>
        )}
        {!url && (
          <Button
            className="mt-5"
            onClick={() => {
              mutation.mutate(undefined, {
                onSuccess: (data) => {
                  const url = new URL("/", guardian.link);
                  url.searchParams.append(
                    "holderCommitment",
                    data.holderCommitment
                  );
                  url.searchParams.append(
                    "encryptionPubKey",
                    data.encryptionPubKey
                  );
                  setUrl(url.toString());

                  window.open(url.toString(), "_self");

                  toastSuccess("Commitment Hash has been generated");
                },
                onError: (error) => {
                  captureException(error);
                  toastError("Failed to Generate Commitment Hash. Try again");
                  onError?.();
                },
              });
            }}
            theme="primaryTransparent"
          >
            Generate & Start KYC
          </Button>
        )}

        <LearnKycLink className="link mt-10" />
      </Modal.Body>
    </Modal>
  );
};
