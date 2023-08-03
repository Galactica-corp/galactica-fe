import { PropsWithChildren } from "react";
import cn from "classnames";
import { ClassName } from "shared/types";

export const Link = ({ children, className }: PropsWithChildren<ClassName>) => {
  return (
    <>
      <a
        className={cn(className, "link")}
        href="https://docs.galactica.com/galactica-developer-documentation/galactica-concepts/zero-knowledge-kyc"
        target="_blank"
        rel="noreferrer"
      >
        {children ?? `Learn More about zkKYC `}
      </a>
    </>
  );
};
