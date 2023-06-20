import { PropsWithChildren } from "react";
import cn from "classnames";
import { ClassName } from "shared/types";

export const Title = ({
  children,
  className,
}: PropsWithChildren<ClassName>) => {
  return (
    <h3
      className={cn(
        className,
        "font-antiqueLegacy text-[28px] font-light text-mineShaft"
      )}
    >
      {children}
    </h3>
  );
};
