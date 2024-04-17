import { useToggle } from "usehooks-ts";

import { default as LogoMetamask } from "shared/icons/metamask-outline.svg?react";
import { Button } from "shared/ui/button";
import { Modal } from "shared/ui/modal";
import { GradientSpinner } from "shared/ui/spinner";

import { useUpdateKycList } from "../../hooks";

export const UpdateModal = () => {
  const [isOpen, toggleOpen] = useToggle(true);
  const [isUpdateNeeded, mutation] = useUpdateKycList();

  if (!isOpen || !isUpdateNeeded) return null;

  return (
    <Modal delay={200} onClose={toggleOpen}>
      <Modal.Body className="w-[670px] px-20 pb-14 pt-20" onClose={toggleOpen}>
        {mutation.isPending ? (
          <GradientSpinner className="size-[110px]" />
        ) : (
          <LogoMetamask className="h-[110px] text-grayNickel" />
        )}
        <Modal.Title className="mt-6">
          Your zkKYC&apos;s have changed
        </Modal.Title>
        <Modal.Description className="mt-3">
          We&apos;ve noticed that something has changed in your KYCs. Please,
          approve an access request in MetaMask to share the actual state of
          your zkKYC&apos;s to the application.
        </Modal.Description>
        <p className="mt-3 text-center text-xl font-light text-opacity-40"></p>

        <div className="mx-auto mt-8 flex gap-x-8">
          <Button
            className="w-48"
            isLoading={mutation.isPending}
            onClick={mutation.mutate}
          >
            Approve
          </Button>
          <Button
            className="w-48"
            onClick={toggleOpen}
            theme="primaryTransparent"
          >
            Decline
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
