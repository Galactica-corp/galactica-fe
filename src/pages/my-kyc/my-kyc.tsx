import { ChooseKycProviderCard, KycCard, KycNotFoundCard } from "entities/kyc";
import { useLocalStorage } from "usehooks-ts";
import { GenerateBasicZkProofCard } from "features/generate-basic-zkproof-card";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { UploadKycCard } from "features/upload-kyc";
import { CONTRACTS_ADDRESSES, LS_KEYS } from "shared/config/const";
import { useAllSbtsByUserQuery } from "shared/snap";
import { ZkCertsListItem } from "shared/snap/types";

export const MyKYC = () => {
  const [zkCerts] = useLocalStorage<ZkCertsListItem[]>(LS_KEYS.zkCerts, []);

  const query = useAllSbtsByUserQuery(
    {
      sbtSCAddress: CONTRACTS_ADDRESSES.VERIFICATION_SBT,
    },
    {
      select: ({ sbts }) => sbts,
      enabled: false,
    }
  );

  const hasAgeProof = query.data?.some(
    (sbt) => sbt.dApp === CONTRACTS_ADDRESSES.EXAMPLE_DAPP
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

        {zkCerts.length !== 0 && !hasAgeProof && <GenerateBasicZkProofCard />}
      </div>
    </>
  );
};
