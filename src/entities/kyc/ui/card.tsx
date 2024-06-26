import { default as CheckIcon } from "shared/icons/check.svg?react";
import { Card as UICard } from "shared/ui/card";
import { dateX } from "shared/utils";

import { KYC_MAP, type KycType } from "../const";

type Props = {
  expiration: number;
  isActive?: boolean;
  level: string;
  type: KycType;
};

export const Card = ({ type, level, expiration }: Props) => {
  const kyc = KYC_MAP[type];

  const isActive =
    dateX.createDT(Date.now() + expiration) > dateX.createDT(Date.now());

  return (
    <UICard
      className="card min-h-[238px] bg-[length:210px_210px] bg-right-top bg-no-repeat"
      style={{ backgroundImage: `url(${kyc.background})` }}
      title={kyc.title}
    >
      <div className="mt-auto flex justify-between">
        <UICard.Info
          label="Status"
          tip="Your zkKYC status may be Active, Expired, or Canceled. Active - when this zkKYC is available for use. Expired - the expiration date of your zkKYC is past the current date. Unavailable - when this zkKYC cannot be used due to various reasons."
        >
          {isActive ? (
            <div className="flex items-center text-sandyBrown">
              Active <CheckIcon className="ml-2" />
            </div>
          ) : (
            "Expired"
          )}
        </UICard.Info>

        <UICard.Info
          label="KYC Level"
          tip="This level depends on the documentation provided to the KYC Guardian as well as on their requirements."
        >
          {`Level ${level}`}
        </UICard.Info>

        <UICard.Info
          label="Expiration Date"
          tip="This is the expiration date of your zkKYC (set by the KYC Guardian)."
        >
          {dateX.toDMY(Date.now() + expiration)}
        </UICard.Info>
      </div>
    </UICard>
  );
};
