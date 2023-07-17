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
      theme="primary"
      className="px-14"
    >
      {disabled ? (
        "Enable galactica snap"
      ) : (
        <>
          <MetamaskIcon className="relative mr-3" />
          <span>Get snap</span>
        </>
      )}
    </Button>
  );
};
