import { KYCCard } from "entities/kyc-card";
import { QuestionKYCCard } from "entities/question-kyc-card";
import { UploadKYCKeyCard } from "features/upload-kyc";

export const MyKYC = () => {
  return (
    <div className="grid grid-cols-3 gap-x-8">
      <UploadKYCKeyCard />
      <KYCCard kyc="binance" level="1" expiration={"today"} />
      <QuestionKYCCard />
    </div>
  );
};
