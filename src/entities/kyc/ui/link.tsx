import { PropsWithChildren } from "react";

import { twJoin } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Link = ({ children, className }: PropsWithChildren<ClassName>) => {
  return (
    <>
      <a
        className={twJoin("link", className)}
        href="https://docs.galactica.com/galactica-developer-documentation/galactica-concepts/zero-knowledge-kyc"
        rel="noreferrer"
        target="_blank"
      >
        {children ?? `Learn More about zkKYC `}
      </a>
    </>
  );
};
