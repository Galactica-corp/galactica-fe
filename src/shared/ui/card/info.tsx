import { PropsWithChildren } from "react";
import classNames from "classnames";
import { ReactComponent as InfoIcon } from "shared/icons/info.svg";
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
    <div className={classNames(className, "flex flex-col")}>
      <div className="flex items-center text-sm font-light text-mineShaft/50">
        {label}{" "}
        {tip && (
          <InfoIcon
            className="ml-1.5 inline-flex"
            data-tooltip-id={`card-info-${label}`}
            data-tooltip-content="TODO some text"
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
