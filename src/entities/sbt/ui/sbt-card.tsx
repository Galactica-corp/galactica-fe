import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Card as UICard } from "shared/ui/card";
import { dateX } from "shared/utils";

type Props = {
  expiration: number;
  level: number | string;
  provider: string;
  title: string;
} & ClassName;

export const Card = ({
  title = "zkKYC Proof",
  provider = "Example",
  className,
  level,
  expiration,
}: Props) => {
  return (
    <UICard
      className={twMerge("min-h-[238px]", className)}
      desc="This SBT contains a zkProof demonstrating that you hold a valid KYC."
      title={title}
    >
      <div className="mt-auto flex justify-between">
        <UICard.Info label="KYC Guardian">{provider}</UICard.Info>

        <UICard.Info
          label="KYC Level"
          tip="This level depends on the documentation provided to the KYC Guardian as well as on their requirements."
        >
          {`Level ${level}`}
        </UICard.Info>

        <UICard.Info
          label="Expiration Date"
          tip="This is the expiration date of your ID (e.g. passport)."
        >
          {dateX.toDMY(expiration)}
        </UICard.Info>
      </div>
    </UICard>
  );
};
