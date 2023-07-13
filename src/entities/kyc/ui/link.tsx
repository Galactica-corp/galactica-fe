import { PropsWithChildren } from "react";
import cn from "classnames";
import { ReactComponent as InfoOrangeIcon } from "shared/icons/info-orange.svg";
import { ClassName } from "shared/types";
import { Tooltip } from "shared/ui/tooltip";

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
        <InfoOrangeIcon
          data-tooltip-id={`learn-kyc-link`}
          data-tooltip-content={"TODO some text"}
          className="relative ml-[0.31rem]"
        />
      </a>
      <Tooltip id="learn-kyc-link" />
    </>
  );
};
