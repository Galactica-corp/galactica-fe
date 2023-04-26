import { ReactNode } from "react";
import { Tooltip } from "react-tooltip";
import { ReactComponent as InfoIcon } from "shared/icons/info.svg";

type Props = {
  title: string;
  value: string | ReactNode;
  tooltip?: string | ReactNode;
};

export function Field({ title, value, tooltip }: Props) {
  const id = Math.random().toString(36).substring(2);
  return (
    <>
      <div>
        <div className="flex items-center text-[0.875rem] text-mineShaft/50">
          {title}{" "}
          {tooltip && (
            <InfoIcon
              className="ml-[0.375rem]"
              data-tooltip-id={`field-tooltip-${id}`}
              data-tooltip-content={tooltip}
            />
          )}
        </div>
        <div className="text-[1.25rem]">{value}</div>
      </div>
      {tooltip && (
        <Tooltip className="react-tooltip-custom" id={`field-tooltip-${id}`} />
      )}
    </>
  );
}
