import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

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
      className={twMerge(baseCls, THEME[theme], className)}
      disabled={disabled}
      onClick={onClick}
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
    </button>
  );
}
