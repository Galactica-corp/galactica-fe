import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { Card as UICard } from "shared/ui/card";
import { dateX } from "shared/utils";
import { KYC_MAP, type KycType } from "../const";

type Props = {
  type: KycType;
  level: string;
  expiration: number;
  isActive?: boolean;
};

export const Card = ({ type, level, expiration }: Props) => {
  const kyc = KYC_MAP[type];

  const isActive = dateX.createDT(expiration) > dateX.createDT(Date.now());

  return (
    <UICard
      title={kyc.title}
      className="card min-h-[238px] bg-[length:210px_210px] bg-right-top bg-no-repeat"
      style={{ backgroundImage: `url(${kyc.background})` }}
    >
      <div className="mt-auto flex justify-between">
        <UICard.Info label="KYC-status" tip="TODO some text">
          {isActive ? (
            <div className="flex items-center text-sandyBrown">
              Active <CheckIcon className="ml-[0.5rem]" />
            </div>
          ) : (
            "Expired"
          )}
        </UICard.Info>

        <UICard.Info label="KYC-level" tip="TODO some text">
          {`Level ${level}`}
        </UICard.Info>

        <UICard.Info label="Expiration date">
          {dateX.toDMY(expiration)}
        </UICard.Info>
      </div>
    </UICard>
  );
};
