import { useToggle } from "usehooks-ts";
import { Button } from "shared/ui/button";
import { Modal } from "shared/ui/modal";
import { useUpdateKycList } from "../../hooks";
import { ReactComponent as LogoMetamask } from "./logo-metamask.svg";

export const UpdateModal = () => {
  const [isOpen, toggleOpen] = useToggle(true);
  const [isUpdateNeeded, mutation] = useUpdateKycList();

  if (!isOpen || !isUpdateNeeded) return null;

  return (
    <Modal delay={200} onClose={toggleOpen}>
      <Modal.Body className="w-[670px] px-20" onClose={toggleOpen}>
        <LogoMetamask className="mx-auto mt-20" />
        <h3 className="mt-6 text-[32px] font-light">
          Your KYC&apos;s have changed
        </h3>
        <p className="mt-3 text-center text-xl font-light text-opacity-40">
          We&apos;ve noticed that something has changed in your KYCs. Please,
          approve an access request in Metamask to share the actual state of
          your KYC&apos;s to the application.
        </p>

        <div className="mx-auto mb-14 mt-8 flex gap-x-8">
          <Button
            className="w-48"
            isLoading={mutation.isLoading}
            onClick={mutation.mutate}
          >
            Approve
          </Button>
          <Button
            onClick={toggleOpen}
            className="w-48"
            theme="primaryTransparent"
          >
            Decline
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
