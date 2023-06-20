import { ComponentProps } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import cn from "classnames";

export const Tooltip = ({
  className,
  ...props
}: ComponentProps<typeof ReactTooltip>) => {
  return (
    <ReactTooltip
      className={cn(className, "react-tooltip-custom")}
      delayShow={150}
      {...props}
    />
  );
};
