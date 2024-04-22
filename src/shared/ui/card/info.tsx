import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { default as InfoIcon } from "shared/icons/info.svg?react";
import { ClassName } from "shared/types";

import { Tooltip } from "../tooltip";

type Props = {
  className?: string;
  label: string;
  tip?: string;
} & ClassName;

export const Info = ({
  className,
  children,
  tip,
  label,
}: PropsWithChildren<Props>) => {
  return (
    <div className={twMerge("flex flex-col", className)}>
      <div className="flex items-center text-sm font-light text-mineShaft/50">
        {label}{" "}
        {tip && (
          <InfoIcon
            className="ml-1.5 inline-flex outline-none"
            data-tooltip-content={tip}
            data-tooltip-id={`card-info-${label}`}
          />
        )}
      </div>
      {children && (
        <div className="text-xl font-light text-mineShaft/80">{children}</div>
      )}

      {tip && <Tooltip id={`card-info-${label}`} />}
    </div>
  );
};
