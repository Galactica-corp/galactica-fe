import { ReactComponent as LogoMetamask } from "shared/icons/metamask-outline.svg";
import { useSetupHoldingKeyMutation } from "shared/snap";
import { Button } from "shared/ui/button";
import { Link } from "shared/ui/link";
import { Modal } from "shared/ui/modal";
import { GradientSpinner } from "shared/ui/spinner";

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
        <Button
          className="mt-5"
          onClick={() => {
            mutation.mutate(undefined, {
              onSuccess: (data) => {
                console.log(data);
                onSuccess?.();
              },
              onError: (error) => {
                console.error(error);
                onError?.();
              },
            });
          }}
        >
          Setup holding key
        </Button>
        <Link className="mt-10" href="#">
          Learn More about KYC
        </Link>
      </Modal.Body>
    </Modal>
  );
};
