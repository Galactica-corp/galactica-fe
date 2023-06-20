import { KYCCard } from "entities/kyc-card";
import { QuestionKYCCard } from "entities/question-kyc-card";
import { useLocalStorage } from "usehooks-ts";
import { GenerateBasicZkProofCard } from "features/generate-basic-zkproof-card";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { UploadKycCard } from "features/upload-kyc";
import { LS_KEYS } from "shared/config/const";
import { ZkCertsListItem } from "shared/snap/types";
import { formatDateFromUnixTime, unixTimeMoreThenNow } from "shared/utils";

export const MyKYC = () => {
  const [certsList] = useLocalStorage<ZkCertsListItem[]>(LS_KEYS.zkCerts, []);

  return (
    <>
      <UpdateKycListAlert />
      <div className="grid grid-cols-3 gap-8">
        <UploadKycCard />
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

        <GenerateBasicZkProofCard />
      </div>
    </>
  );
};
