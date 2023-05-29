import { KYCCard } from "entities/kyc-card";
import { KYCName } from "entities/kyc-card/kyc-card";
import { QuestionKYCCard } from "entities/question-kyc-card";
import { GenerateBasicZkProofCard } from "features/generate-basic-zkproof-card";
import { UploadKYCKeyCard } from "features/upload-kyc";
import { ReactComponent as LinkIcon } from "shared/icons/link.svg";
import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import {
  useClearStorageMutation,
  useGenerateCommitmentHashMutation,
  useListZkCertsMutation,
  useSetupHoldingKeyMutation,
} from "shared/snap";
import { useExportZkCertMutation } from "shared/snap/use-export-zk-cert-mutation";
import { Button } from "shared/ui/button";
import { CARDS_MAP } from "shared/utils/cards-map";
import { toastError, toastSuccess } from "shared/utils/toasts";

export const Home = () => {
  const generateCommitmentMutation = useGenerateCommitmentHashMutation();
  const setupHoldingKeyMutation = useSetupHoldingKeyMutation();
  const clearStorageMutation = useClearStorageMutation();
  const exportMutation = useExportZkCertMutation();
  const listZkCertsMutation = useListZkCertsMutation();

  const onClearStorageMutation = () => {
    clearStorageMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log("clear storage", data);
      },
    });
  };

  const onSetupHoldingKey = () => {
    setupHoldingKeyMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log({ name: "setup", data });
      },
    });
  };

  const onGenerateCommitmentHash = () => {
    console.log("hello");
    generateCommitmentMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log({ name: "generateCommitment", data });
      },
    });
  };

  const onExportCert = () => {
    console.log("onExportCert");
    exportMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log({ name: "onExportCert", data });
      },
    });
  };

  const onListZkCerts = () => {
    console.log("onListZkCerts");
    listZkCertsMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log({ name: "onListZkCerts", data });
      },
    });
  };

  return (
    <>
      <div className="mb-4 space-y-4">
        <Button onClick={onListZkCerts}>list zk certs</Button>
        <Button onClick={onExportCert}>Export cert</Button>
        <Button onClick={onClearStorageMutation}>Clear storage</Button>
        <Button onClick={onSetupHoldingKey}>setup holding key</Button>
        <Button onClick={onGenerateCommitmentHash}>
          generate commitment Hash
        </Button>
        <div>Toasts</div>
        <Button onClick={() => toastSuccess("Success toast text")}>
          toast success
        </Button>
        <Button onClick={() => toastError("Error toast text")}>
          toast error
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        <UploadKYCKeyCard />
        <QuestionKYCCard />
        <GenerateBasicZkProofCard />
        {Object.keys(CARDS_MAP).map((kycName, i) => (
          <KYCCard
            isActive={true}
            key={kycName}
            kyc={kycName as KYCName}
            level={`Level ${i + 1}`}
            expiration="24.01.2025"
          />
        ))}
      </div>
      <div className="mt-10 space-y-4">
        <div>simple</div>
        <Button>Start the KYC procedure</Button>
        <Button theme="primaryTransparent">Start the KYC procedure</Button>
        <Button isLoading>Start the KYC procedure</Button>

        <div>with icon</div>
        <Button className="w-[16rem] space-x-[0.8rem]">
          <MetamaskIcon className="relative top-[-0.15rem]" />
          <span>Metamask</span>
        </Button>
        <Button
          theme="primaryTransparent"
          className="w-[16rem] space-x-[0.8rem]"
        >
          <MetamaskIcon className="relative top-[-0.15rem]" />
          <span>Metamask</span>
        </Button>

        <div>justify</div>
        <Button className="w-[16rem] justify-between">
          Metamask
          <MetamaskIcon className="relative top-[-0.15rem]" />
        </Button>
        <Button
          theme="primaryTransparent"
          className="w-[16rem] justify-between"
        >
          Metamask
          <MetamaskIcon className="relative top-[-0.15rem]" />
        </Button>

        <div>another font</div>
        <Button
          theme="primaryTransparent"
          className="space-x-[0.45rem] !font-antiqueLegacy normal-case"
        >
          <span>Check status</span> <LinkIcon />
        </Button>
      </div>
    </>
  );
};
