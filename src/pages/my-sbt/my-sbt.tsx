// import { KYCProofCard } from "entities/kyc-proof-card";
// import { KYCName } from "entities/kyc-proof-card/kyc-proof-card";
import { useLocalStorage } from "usehooks-ts";
import { GenerateSbtCard } from "features/generate-sbt";
import { LS_KEYS } from "shared/config/const";
import { ZkCertsListItem } from "shared/snap/types";
import { ChooseKycProviderCard } from "./ui/choose-kyc-provider-card";
import { LearnSbtCard } from "./ui/learn-sbt-card";

export const MySBT = () => {
  const [zkCerts] = useLocalStorage<ZkCertsListItem[] | undefined>(
    LS_KEYS.zkCerts,
    []
  );

  return (
    <div className="grid grid-cols-3 gap-[1rem]">
      {zkCerts?.length === 0 && <ChooseKycProviderCard />}
      <GenerateSbtCard />
      <LearnSbtCard />
      {/* {Object.keys(CARDS_MAP).map((kycName, i) => {
        if (kycName === "accreditation") return;
        return (
          <KYCProofCard
            key={kycName}
            kyc={kycName as KYCName}
            level={`Level ${i + 1}`}
            expiration="24.01.2025"
          />
        );
      })} */}
    </div>
  );
};
