import { HTMLAttributes } from "react";
import cn from "classnames";
import { SIZES } from "./styles";
import * as ICON_ELEMENTS from "./svg";

export type Name = keyof typeof ICON_ELEMENTS;
export type Size = keyof typeof SIZES;

type Props = {
  size?: keyof typeof SIZES;
  name: Name;
  onClick?: () => void;
} & HTMLAttributes<HTMLSpanElement>;

export const Icon = ({ className, name, size, onClick, ...props }: Props) => {
  const IconElement = ICON_ELEMENTS[name];

  return (
    <span
      className={cn(className, "flex items-center", size && SIZES[size])}
      onClick={onClick}
      {...props}
    >
      {<IconElement className={cn(size && SIZES[size])} />}
    </span>
  );
};
