import { useUpdateKycList } from "features/update-kyc-list/hooks";
import { default as MetamaskIcon } from "shared/icons/metamask.svg?react";
import { useZkCertHashes, useZkCerts } from "shared/snap";
import { useGetSnapQuery, useInstallSnapMutation } from "shared/snap/api";
import { Button } from "shared/ui/button";

export const InstallSnapButton = () => {
  const query = useGetSnapQuery();
  const [_, listZkCertsMutation] = useUpdateKycList();
  const mutation = useInstallSnapMutation();
  const [hashes, setHashes] = useZkCertHashes();
  const [certs, setCerts] = useZkCerts();

  const handleInstall = () => {
    mutation.mutate(
      {},
      {
        onError: (error) => {
          console.error(error);
        },
        onSuccess: async () => {
          console.log("hello world");
          listZkCertsMutation.mutate({});
        },
      }
    );
  };

  if (query.isSuccess && query.data) return null;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const disabled = Boolean(query.data && !query.data.enabled);

  return (
    <Button
      className="px-14"
      disabled={!query.isSuccess}
      isLoading={mutation.isPending || query.isPending}
      onClick={handleInstall}
      theme="primary"
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
