import { ComponentProps } from "react";
import classNames from "classnames";
import { ClassName } from "shared/types";

type Props = ComponentProps<"a"> & ClassName;

export const External = ({ className, href, children, ...rest }: Props) => (
  <a
    href={href}
    className={classNames(
      className,
      "inline-flex items-baseline text-sm text-salmon hover:underline"
    )}
    {...rest}
  >
    {children}
  </a>
);
