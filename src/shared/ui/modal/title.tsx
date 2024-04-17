import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Title = ({
  children,
  className,
}: PropsWithChildren<ClassName>) => {
  return (
    <h3 className={twMerge("text-center text-[32px] font-light", className)}>
      {children}
    </h3>
  );
};
