import { useSearchParams } from "react-router-dom";
import { ChooseKycProviderCard, KycCard, KycNotFoundCard } from "entities/kyc";
import { GenerationSbtCard } from "entities/sbt";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { UploadKycCard } from "features/upload-kyc";
import { CONTRACTS_ADDRESSES, useSbtsQuery, useZkCerts } from "shared/snap";

export const MyKYC = () => {
  const [searchParams] = useSearchParams();
  const showWideUploading = searchParams.get("showWideUploading");
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) => sbts,
    enabled: false,
  });

  const hasBasicProof = query.data?.some(
    (sbt) => sbt.dApp === CONTRACTS_ADDRESSES.BASIC_KYC_EXAMPLE_DAPP
  );

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
            desc="In order to use your KYC you need to generate a zkProof demonstrating the its existence."
          >
            <GenerateSbtButton className="mt-auto" />
          </GenerationSbtCard>
        )}
      </div>
    </>
  );
};
