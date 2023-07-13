import classNames from "classnames";
import { ClassName } from "shared/types";
import { Card } from "shared/ui/card";
import { dateX } from "shared/utils";

type Props = {
  title: string;
  provider: string;
  expiration: number;
  level: number | string;
} & ClassName;

export const SbtCard = ({
  title = "zkKYC Proof",
  provider = "Example",
  className,
  level,
  expiration,
}: Props) => {
  return (
    <Card
      className={classNames(className, "min-h-[238px]")}
      title={title}
      desc="This SBT proves that you hold a valid zkKYC with these fields:"
    >
      <div className="mt-auto flex justify-between">
        <Card.Info label="Provider" tip="TODO some text">
          {provider}
        </Card.Info>

        <Card.Info
          label="zkKYC Level"
          tip="This level depends on the documentation provided to the KYC Guardian as well as on their requirements."
        >
          {`Level ${level}`}
        </Card.Info>

        <Card.Info
          label="Expiration Date"
          tip="This is the expiration date of your ID (e.g. passport)."
        >
          {dateX.toDMY(expiration)}
        </Card.Info>
      </div>
    </Card>
  );
};
