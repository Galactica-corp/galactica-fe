import { ComponentProps } from "react";
import cn from "classnames";
import { Spinner } from "../spinner";
import { THEME, baseCls } from "./styles";
import { CommonButtonProps } from "./types";

export type Props = CommonButtonProps &
  Pick<ComponentProps<"button">, "onClick" | "type">;

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
      className={cn(baseCls, THEME[theme], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            THEME[theme]
          )}
        >
          <Spinner />
        </div>
      )}
      {children}
    </button>
  );
}
