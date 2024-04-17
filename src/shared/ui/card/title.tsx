import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Title = ({
  children,
  className,
}: PropsWithChildren<ClassName>) => {
  return (
    <h3
      className={twMerge(
        "font-antiqueLegacy text-[28px] font-light text-mineShaft",
        className
      )}
    >
      {children}
    </h3>
  );
};
