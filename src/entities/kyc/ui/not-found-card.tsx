import { twMerge } from "tailwind-merge";
import { default as CardSpinnerIcon } from "shared/icons/card-spinner.svg?react";
import notFoundBgPng from "shared/images/cards/kyc/not-found.png";
import { ClassName } from "shared/types";
import { Card } from "shared/ui/card";
import { Link as LearnKycLink } from "./link";

export const NotFoundCard = ({ className }: ClassName) => {
  return (
    <Card
      title="Can't find your zkKYC? "
      className={twMerge(
        "card min-h-[238px] bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{ backgroundImage: `url(${notFoundBgPng})` }}
    >
      <LearnKycLink className="mt-[5px]" />
      <div className="mt-auto flex items-center justify-end text-right text-sm text-naturalGray">
        <CardSpinnerIcon className="mr-2 animate-spin" /> Update after 35
        seconds
      </div>
    </Card>
  );
};
