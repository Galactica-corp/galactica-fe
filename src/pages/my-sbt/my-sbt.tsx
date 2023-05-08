import { KYCProofCard } from "entities/kyc-proof-card";
import { KYCName } from "entities/kyc-proof-card/kyc-proof-card";
import { QuestionSBTCard } from "entities/question-sbt-card";
import { ChooseKycProviderCard } from "features/choose-kyc-provider-card";
import { GenerateKYCProofSBTCard } from "features/generate-kyc-proof-sbt-card";
import { CARDS_MAP } from "shared/utils/cards-map";

export const MySBT = () => {
  return (
    <div className="grid grid-cols-3 gap-[1rem]">
      <ChooseKycProviderCard />
      <QuestionSBTCard />
      <GenerateKYCProofSBTCard />
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
  );
};
