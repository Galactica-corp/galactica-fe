import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Description = ({
  children,
  className,
}: PropsWithChildren<ClassName>) => {
  return (
    <p
      className={twMerge(
        "text-center text-xl font-light text-mineShaft text-opacity-40",
        className
      )}
    >
      {children}
    </p>
  );
};
