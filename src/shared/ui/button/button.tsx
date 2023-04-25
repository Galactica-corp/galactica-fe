import { PropsWithChildren } from "react";
import cn from "classnames";
import { Icon, IconName } from "../icon";
import { Spinner } from "../spinner";
import {
  BUTTON_SIZE_TO_ICON_MAP,
  OUTLINE_THEMES,
  SIZES,
  Size,
  THEMES,
  Theme,
} from "./styles";

type Props = {
  className?: string;
  theme?: Theme;
  size?: Size;

  iconName?: IconName;
  iconClassName?: string;

  isLoading?: boolean;
  reverse?: boolean;
  outline?: boolean;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export const Button = ({
  className,
  children,
  theme = "sandyBrown",
  size = "42",
  iconName,
  iconClassName,
  isLoading = false,
  reverse = false,
  outline = false,

  ...btnProps
}: PropsWithChildren<Props>) => {
  return (
    <button
      {...btnProps}
      className={cn(
        "relative inline-flex items-center justify-center",
        outline ? "bg-transparent" : "border border-transparent",
        outline ? OUTLINE_THEMES[theme] : THEMES[theme],
        SIZES[size],
        className
      )}
    >
      {isLoading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center gap-2",
          reverse && "flex-row-reverse",
          isLoading && "opacity-0"
        )}
      >
        {iconName && (
          <Icon
            className={iconClassName}
            size={BUTTON_SIZE_TO_ICON_MAP[size]}
            name={iconName}
          />
        )}
        {children}
      </span>
    </button>
  );
};
