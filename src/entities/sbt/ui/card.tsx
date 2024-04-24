import { PropsWithChildren, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Card as UICard } from "shared/ui/card";

import CardPng from "../assets/bg.png";

type Props = {
  desc?: string;
  title?: ReactNode;
} & ClassName;

export const Card = ({
  children,
  className,
  title = "Get your first SBT",
  desc = "To use your KYC it is necessary to generate a zkProof (stored as an SBT) demonstrating its existence and disclosing the following data:",
}: PropsWithChildren<Props>) => {
  return (
    <UICard
      className={twMerge("bg-cover bg-center bg-no-repeat", className)}
      desc={desc}
      style={{ backgroundImage: `url(${CardPng})` }}
      title={title}
    >
      {children}
    </UICard>
  );
};
