import { KYCCard } from "entities/kyc-card";
import { KYCName } from "entities/kyc-card/kyc-card";
import { KYCProofCard } from "entities/kyc-proof-card";
import { QuestionKYCCard } from "entities/question-kyc-card";
import { QuestionSBTCard } from "entities/question-sbt-card";
import { useAccount } from "wagmi";
import { ChooseKycProviderCard } from "features/choose-kyc-provider-card";
import { ConnectButton } from "features/connect-button";
import { GenerateBasicZkProofCard } from "features/generate-basic-zkproof-card";
import { GenerateKYCProofSBTCard } from "features/generate-kyc-proof-sbt-card";
import { UploadKYCKeyCard } from "features/upload-kyc-key-card";
import { Layout } from "pages/ui";
import { ReactComponent as LinkIcon } from "shared/icons/link.svg";
import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button } from "shared/ui/button";
import { CARDS_MAP } from "shared/utils/cards-map";
import { toastError, toastSuccess } from "shared/utils/toasts";

export const Home = () => {
  const { isConnected } = useAccount();

  return (
    <>
      {!isConnected ? (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
            Welcome, <span className="font-semibold ">Citizen!</span>
          </div>
          <ConnectButton />
        </div>
      ) : (
        <Layout>
          <div className="mb-4 space-y-4">
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
            <QuestionSBTCard />
            <GenerateBasicZkProofCard />
            <GenerateKYCProofSBTCard />
            <ChooseKycProviderCard />
            {Object.keys(CARDS_MAP).map((kycName, i) => (
              <KYCCard
                key={kycName}
                kyc={kycName as KYCName}
                level={`Level ${i + 1}`}
                expiration="24.01.2025"
              />
            ))}
            {Object.keys(CARDS_MAP).map((kycName, i) => {
              if (kycName === "accreditation") return;
              return (
                <KYCProofCard
                  key={kycName}
                  kyc={kycName as KYCName}
                  level={`Level ${i + 1}`}
                  expiration="24.01.2025"
                />
              );
            })}
          </div>
          <div className="mt-10 space-y-4">
            <div>simple</div>
            <Button>Start the KYC procedure</Button>
            <Button type="primaryTransparent">Start the KYC procedure</Button>
            <Button isLoading>Start the KYC procedure</Button>

            <div>with icon</div>
            <Button className="w-[16rem] space-x-[0.8rem]">
              <MetamaskIcon className="relative top-[-0.15rem]" />
              <span>Metamask</span>
            </Button>
            <Button
              type="primaryTransparent"
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
              type="primaryTransparent"
              className="w-[16rem] justify-between"
            >
              Metamask
              <MetamaskIcon className="relative top-[-0.15rem]" />
            </Button>

            <div>another font</div>
            <Button
              type="primaryTransparent"
              className="space-x-[0.45rem] !font-antiqueLegacy normal-case"
            >
              <span>Check status</span> <LinkIcon />
            </Button>
          </div>
        </Layout>
      )}
    </>
  );
};
