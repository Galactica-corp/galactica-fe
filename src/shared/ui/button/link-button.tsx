import { Link, LinkProps } from "react-router-dom";
import classNames from "classnames";
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
      className={classNames(
        baseCls,
        {
          [primaryCls]: theme === "primary",
          [primaryTransparentCls]: theme === "primaryTransparent",
        },
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </Link>
  );
};
