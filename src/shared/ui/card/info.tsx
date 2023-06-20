import { PropsWithChildren } from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  label: string;
  tip?: string;
};

export const Info = ({ children, tip, label }: PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-sm font-light text-mineShaft/50">
        {label} {tip && <span className="ml-1.5 inline-flex">{tip}</span>}
      </div>
      {typeof children === "string" ? (
        <Tooltip className="react-tooltip-custom">
          <div className="text-xl text-mineShaft">{children}</div>
        </Tooltip>
      ) : (
        children
      )}
    </div>
  );
};
