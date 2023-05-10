import cn from "classnames";
import { Spinner } from "../spinner";
import { getCls } from "./styles";
import { CommonButtonProps } from "./types";

export type Props = CommonButtonProps &
  Pick<React.ComponentProps<"button">, "onClick" | "type">;

export function Button({
  children,
  className,
  onClick,
  isLoading,
  theme = "primary",
  disabled = false,

  ...btnProps
}: Props) {
  return (
    <button
      {...btnProps}
      className={cn(getCls(theme), className)}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
