import { PropsWithChildren } from "react";
import cn from "classnames";
import { tw } from "shared/utils";
import { Spinner } from "../spinner";

type Props = {
  className?: string;
  type?: "primary" | "primaryTransparent";
  isLoading?: boolean;
  disabled?: boolean;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function Button({
  children,
  className,
  onClick,
  isLoading,
  type = "primary",
  disabled = false,

  ...btnProps
}: PropsWithChildren<Props>) {
  const base = tw`relative text-[1rem] font-publicoTextMono tracking-[-0.02em] px-[1.55rem] h-[2.5rem] flex items-center justify-center rounded-[0.3rem]`;

  const primary = tw`buttonPrimary text-white uppercase`;

  const primaryTransparent = tw`buttonPrimaryTransparent text-mineShaft uppercase`;

  return (
    <button
      {...btnProps}
      className={cn(
        base,
        {
          [primary]: type === "primary",
          [primaryTransparent]: type === "primaryTransparent",
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
