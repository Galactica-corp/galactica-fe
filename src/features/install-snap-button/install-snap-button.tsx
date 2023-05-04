import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { useGetSnapQuery } from "shared/snap";
import { useInstallSnapMutation } from "shared/snap/use-install-snap-mutation";
import { Button } from "shared/ui/button";

type Props = {
  onInstall?: () => void;
};

export const InstallSnapButton = ({ onInstall }: Props) => {
  const query = useGetSnapQuery();
  const mutation = useInstallSnapMutation();

  const handleInstall = () => {
    mutation.mutate(
      {},
      {
        onError: (error) => {
          console.error(error);
        },
        onSuccess: onInstall,
      }
    );
  };

  if (query.isSuccess && query.data) return null;

  const disabled = Boolean(query.data && !query.data.enabled);

  return (
    <Button
      onClick={handleInstall}
      isLoading={mutation.isLoading || query.isLoading}
      disabled={!query.isSuccess}
      type="primary"
      className="w-[18.75rem] space-x-[0.9rem]"
    >
      {disabled ? (
        "Enable galactica snap"
      ) : (
        <>
          <MetamaskIcon className="relative top-[-0.15rem]" />
          <span>Install snap</span>
        </>
      )}
    </Button>
  );
};
