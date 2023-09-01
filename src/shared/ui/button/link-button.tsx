import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Spinner } from "../spinner";
import { baseCls, primaryCls, primaryTransparentCls } from "./styles";
import { CommonButtonProps } from "./types";

type Props = LinkProps & CommonButtonProps;

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
      onClick={(e) => {
        disabled && e.preventDefault();
      }}
      className={twMerge(
        baseCls,
        theme === "primary" && primaryCls,
        theme === "primaryTransparent" && primaryTransparentCls,
        className
      )}
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
