import { KYCCard } from "entities/kyc-card";
import { QuestionKYCCard } from "entities/question-kyc-card";
import { UploadKYCKeyCard } from "features/upload-kyc";
import { useGetAndUpdateZkCerts } from "shared/snap";
import { formatDateFromUnixTime, unixTimeMoreThenNow } from "shared/utils";

export const MyKYC = () => {
  const certsList = useGetAndUpdateZkCerts();

  return (
    <div className="grid grid-cols-3 gap-x-8">
      <UploadKYCKeyCard />
      {certsList?.length > 0 ? (
        certsList?.map((cert, i) => {
          return (
            <KYCCard
              key={`${cert.expirationDate}-${i}`}
              kyc="binance"
              expiration={formatDateFromUnixTime(cert.expirationDate)}
              level={cert.verificationLevel}
              isActive={unixTimeMoreThenNow(cert.expirationDate)}
            />
          );
        })
      ) : (
        <QuestionKYCCard />
      )}
    </div>
  );
};
