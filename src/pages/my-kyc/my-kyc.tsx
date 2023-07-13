import { ChooseKycProviderCard, KycCard, KycNotFoundCard } from "entities/kyc";
import { GenerateBasicZkProofCard } from "features/generate-basic-zkproof-card";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { UploadKycCard } from "features/upload-kyc";
import { CONTRACTS_ADDRESSES, useSbtsQuery, useZkCerts } from "shared/snap";

export const MyKYC = () => {
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) => sbts,
    enabled: false,
  });

  const hasBasicProof = query.data?.some(
    (sbt) => sbt.dApp === CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST
  );

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
          <GenerateBasicZkProofCard />
        )}
      </div>
    </>
  );
};
