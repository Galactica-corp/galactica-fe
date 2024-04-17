import { useNavigate, useSearchParams } from "react-router-dom";
import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import { ChooseKycProviderCard, KycCard, KycNotFoundCard } from "entities/kyc";
import { GenerationSbtCard } from "entities/sbt";
import { useLocalStorage } from "usehooks-ts";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { UploadKycCard } from "features/upload-kyc";
import { LS_KEYS } from "shared/config/const";
import { useChain } from "shared/config/hooks";
import { default as CheckIcon } from "shared/icons/check.svg?react";
import { useSbtsQuery, useZkCerts } from "shared/snap";

export const MyKYC = () => {
  const chain = useChain();
  const contracts = sdkConfig.contracts[chain.id as unknown as ChainId];
  const [_, setShouldCallConfetti] = useLocalStorage(
    LS_KEYS.shouldCallConfetti,
    false
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showWideUploading = searchParams.get("showWideUploading");
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) =>
      sbts.filter((sbt) =>
        import.meta.env.VITE_ACTIVE_KYC === "repeatable"
          ? sbt.dApp === contracts.repeatableZkpTest
          : sbt.dApp === contracts.exampleDapp
      ),
  });

  const hasBasicProof = query.data?.some((sbt) => Boolean(sbt));

  if (showWideUploading) {
    return (
      <UploadKycCard
        className="mb-16 grow border-2"
        btnClassName="w-[256px]"
        theme="primary"
        title={
          <p className="w-80 text-center text-3xl font-light">
            Drag&Drop your zkKYC secret file here
          </p>
        }
        onSuccessUpload={() => {
          searchParams.set("showWideUploading", "");
        }}
      />
    );
  }

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className="grid grid-cols-3 gap-8">
        <UploadKycCard />
        {zkCerts?.length === 0 && <ChooseKycProviderCard />}

        {zkCerts?.length > 0 ? (
          zkCerts?.map((cert, i) => {
            return (
              <KycCard
                key={`${cert.expirationDate}-${i}`}
                type="example"
                expiration={cert.expirationDate}
                level={cert.verificationLevel}
              />
            );
          })
        ) : (
          <KycNotFoundCard />
        )}

        {query.isSuccess && zkCerts.length !== 0 && !hasBasicProof && (
          <GenerationSbtCard
            title={
              <div className="whitespace-nowrap text-[26px] font-light">
                KYC{" "}
                <span className="whitespace-nowrap text-scarlet">
                  Not Published
                </span>
              </div>
            }
            desc="To use your KYC it is necessary to generate a zkProof (stored as an SBT) demonstrating its existence and disclosing the following data:"
          >
            <div className="mb-6 mt-2.5 flex items-center justify-between">
              <div className="flex items-center text-sm text-mineShaft/50">
                KYC Guardian <CheckIcon className="ml-1 w-4" />
              </div>
              <div className="flex items-center text-sm text-mineShaft/50">
                KYC Level <CheckIcon className="ml-1 w-4" />
              </div>
              <div className="flex items-center text-sm text-mineShaft/50">
                Expiration Date <CheckIcon className="ml-1 w-4" />
              </div>
            </div>
            <GenerateSbtButton
              className="mt-auto"
              onSuccess={async () => {
                setShouldCallConfetti(true);
                navigate("/my-sbt");
              }}
            />
          </GenerationSbtCard>
        )}
      </div>
    </>
  );
};
