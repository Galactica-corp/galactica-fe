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
  title = "KYC Proof",
  provider = "Example",
  className,
  level,
  expiration,
}: Props) => {
  return (
    <Card
      className={classNames(className, "min-h-[238px]")}
      title={title}
      desc="This SBT proves that you hold a valid KYC with these fields:"
    >
      <div className="mt-auto flex justify-between">
        <Card.Info label="Provider" tip="TODO some text">
          {provider}
        </Card.Info>

        <Card.Info label="KYC-level" tip="TODO some text">
          {`Level ${level}`}
        </Card.Info>

        <Card.Info label="Expiration date">{dateX.toDMY(expiration)}</Card.Info>
      </div>
    </Card>
  );
};
