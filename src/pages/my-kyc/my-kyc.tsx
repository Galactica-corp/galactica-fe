import { KYCCard } from "entities/kyc-card";
import { QuestionKYCCard } from "entities/question-kyc-card";
import { useLocalStorage } from "usehooks-ts";
import { UploadKYCKeyCard } from "features/upload-kyc";
import {
  useGetZkCertStorageHashesQuery,
  useListZkCertsMutation,
} from "shared/snap";
import { Button } from "shared/ui/button";
import { formatDateFromUnixTime, unixTimeMoreThenNow } from "shared/utils";
import { toastError } from "shared/utils/toasts";

type Cert = {
  expirationDate: string;
  verificationLevel: string;
  providerPubKey: {
    Ax: string;
    Ay: string;
  };
};

export const MyKYC = () => {
  const [certsList, setCertsList] = useLocalStorage<Cert[]>("certsList", []);
  const [zkHash, setZkHash] = useLocalStorage("zkHash", "");
  const { data: hashData } = useGetZkCertStorageHashesQuery();
  const listZkCertsMutation = useListZkCertsMutation();
  const newHash = hashData?.gip69 ?? "";

  const updateHandler = () => {
    listZkCertsMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (!data || Object.keys(data as object).length === 0) return;

        // TODO: need to fix types for request in global.d.ts
        setCertsList(data.gip69);
        setZkHash(newHash as string);
      },
      onError: (error) => {
        if (typeof error === "object") {
          toastError((error as { message: string }).message);
        } else {
          console.log(error);
        }
      },
    });
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <UploadKYCKeyCard />
      {newHash !== zkHash && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-salmon">
          <div className="mb-2 text-center">
            ZK Certs is updated.
            <br /> You need to update your list.
          </div>
          <Button onClick={updateHandler}>Update ZK Certs</Button>
        </div>
      )}
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
