import { Link, LinkProps } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { Spinner } from "../spinner";
import { baseCls, primaryCls, primaryTransparentCls } from "./styles";
import { CommonButtonProps } from "./types";

type Props = CommonButtonProps & LinkProps;

export const LinkButton = ({
  children,
  className,
  isLoading,
  theme = "primary",
  disabled = false,
  ...props
}: Props) => {
  return (
    <Link
      {...props}
      className={twMerge(
        baseCls,
        theme === "primary" && primaryCls,
        theme === "primaryTransparent" && primaryTransparentCls,
        className
      )}
      onClick={(e) => {
        disabled && e.preventDefault();
      }}
    >
      {isLoading ? (
        // Avoid reflow button width
        <>
          <span className="opacity-0">{children}</span>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Spinner
              theme={
                theme === "primary" ? "sandyBrown" : "sandyBrownTransparent"
              }
            />
          </div>
        </>
      ) : (
        children
      )}
    </Link>
  );
};
