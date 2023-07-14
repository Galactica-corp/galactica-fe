import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { ClassName } from "shared/types";
import { Card as UICard } from "shared/ui/card";
import CardPng from "../assets/bg.png";

type Props = {
  title?: ReactNode;
  desc?: string;
} & ClassName;

export const Card = ({
  children,
  className,
  title = "Generate your first SBT",
  desc = "In order to use your zkKYC, you need to generate at least a minimal zkProof disclosing its existence and the following fields:",
}: PropsWithChildren<Props>) => {
  return (
    <UICard
      className={classNames(className, "bg-cover bg-center bg-no-repeat")}
      style={{ backgroundImage: `url(${CardPng})` }}
      title={title}
      desc={desc}
    >
      <div className="mb-6 mt-2.5 flex items-center justify-between">
        <div className="flex items-center text-sm text-mineShaft/50">
          KYC issuer <CheckIcon className="ml-1 w-4" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          KYC Level <CheckIcon className="ml-1 w-4" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          Expiration Date <CheckIcon className="ml-1 w-4" />
        </div>
      </div>

      {children}
    </UICard>
  );
};
