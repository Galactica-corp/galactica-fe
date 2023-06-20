import { ReactComponent as LogoMetamask } from "shared/icons/metamask-outline.svg";
import { useSetupHoldingKeyMutation } from "shared/snap";
import { ExternalLink } from "shared/ui/link";
import { Modal } from "shared/ui/modal";
import { GradientSpinner } from "shared/ui/spinner";
import { SetupButton } from "./button";

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

export const SetupModal = ({ onClose, onSuccess, onError }: Props) => {
  const mutation = useSetupHoldingKeyMutation();

  return (
    <Modal onClose={onClose}>
      <Modal.Body className="w-[650px] px-20 pb-12 pt-16" onClose={onClose}>
        {mutation.isLoading ? (
          <GradientSpinner className="h-[110px] w-[110px]" />
        ) : (
          <LogoMetamask className="h-[110px] text-grayNickel" />
        )}

        <Modal.Title className="mt-9">
          To start the KYC procedure, you need to setup Holding Key
        </Modal.Title>
        <Modal.Description className="mt-3">
          The provider will not know your wallet address
        </Modal.Description>
        <SetupButton className="mt-5" onSuccess={onSuccess} onError={onError}>
          Setup holding key
        </SetupButton>
        <ExternalLink className="mt-10" href="#">
          Learn More about KYC
        </ExternalLink>
      </Modal.Body>
    </Modal>
  );
};
