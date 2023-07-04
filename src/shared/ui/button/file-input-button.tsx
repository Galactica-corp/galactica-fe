import { ComponentProps, forwardRef } from "react";
import cn from "classnames";
import { Spinner } from "../spinner";
import { THEME, baseCls } from "./styles";
import { CommonButtonProps } from "./types";

type Props = CommonButtonProps & Omit<ComponentProps<"input">, "type" | "ref">;

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
      <label className={cn(baseCls, THEME[theme], className)}>
        <input
          {...props}
          ref={ref}
          className="invisible absolute"
          disabled={disabled}
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
