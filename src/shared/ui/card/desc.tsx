import { PropsWithChildren } from "react";
import cn from "classnames";
import { ClassName } from "shared/types";

export const Desc = ({ children, className }: PropsWithChildren<ClassName>) => {
  return (
    <p className={cn(className, "text-sm text-mineShaft/50")}>{children}</p>
  );
};
