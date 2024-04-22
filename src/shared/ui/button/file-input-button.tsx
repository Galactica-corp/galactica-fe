import { ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

import { Spinner } from "../spinner";
import { THEME, baseCls } from "./styles";
import { CommonButtonProps } from "./types";

type Props = CommonButtonProps & Omit<ComponentProps<"input">, "ref" | "type">;

export const FileInputButton = forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      className,
      isLoading,
      theme = "primary",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <label className={twMerge(baseCls, THEME[theme], className)}>
        <input
          {...props}
          className="invisible absolute"
          disabled={disabled}
          ref={ref}
          type="file"
        />
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
      </label>
    );
  }
);

FileInputButton.displayName = "FileInputButton";
