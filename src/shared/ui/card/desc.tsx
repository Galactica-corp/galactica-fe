import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Desc = ({ children, className }: PropsWithChildren<ClassName>) => {
  return (
    <p className={twMerge("text-sm text-mineShaft/50", className)}>
      {children}
    </p>
  );
};
