import { KycCard, KycNotFoundCard } from "entities/kyc";
import { useLocalStorage } from "usehooks-ts";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { UploadKycCard } from "features/upload-kyc";
import { LS_KEYS } from "shared/config/const";
import { ZkCertsListItem } from "shared/snap/types";

export const MyKYC = () => {
  const [zkCerts] = useLocalStorage<ZkCertsListItem[]>(LS_KEYS.zkCerts, []);

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className="grid grid-cols-3 gap-8">
        <UploadKycCard />

        {zkCerts?.length > 0 ? (
          zkCerts?.map((cert, i) => {
            return (
              <KycCard
                key={`${cert.expirationDate}-${i}`}
                type="binance"
                expiration={cert.expirationDate}
                level={cert.verificationLevel}
              />
            );
          })
        ) : (
          <KycNotFoundCard />
        )}

        {/* <GenerateBasicZkProofCard /> */}
      </div>
    </>
  );
};
