import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";
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
  title = "Get your first SBT",
  desc = "To use your KYC it is necessary to generate a zkProof (stored as an SBT) demonstrating its existence and disclosing the following data:",
}: PropsWithChildren<Props>) => {
  return (
    <UICard
      className={classNames(className, "bg-cover bg-center bg-no-repeat")}
      style={{ backgroundImage: `url(${CardPng})` }}
      title={title}
      desc={desc}
    >
      {children}
    </UICard>
  );
};
