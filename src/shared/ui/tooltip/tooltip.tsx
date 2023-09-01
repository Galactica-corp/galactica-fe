import { ComponentProps } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

export const Tooltip = ({
  className,
  ...props
}: ComponentProps<typeof ReactTooltip>) => {
  return (
    <ReactTooltip
      className={twMerge(className, "react-tooltip-custom")}
      delayShow={150}
      {...props}
    />
  );
};
