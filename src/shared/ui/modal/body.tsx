import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { default as CloseIcon } from "shared/icons/close.svg?react";
import { ClassName } from "shared/types";
import modalBgPng from "./modal-bg.png";

type Props = {
  onClose?: () => void;
  bg?: string | undefined;
  withSpinner?: boolean;
} & ClassName;

export const Body = ({
  children,
  className,
  bg = modalBgPng,
  onClose,
}: PropsWithChildren<Props>) => {
  return (
    <div
      style={{ backgroundImage: bg ? `url(${bg})` : "none" }}
      className={twMerge(
        "relative m-auto flex min-h-[460px] min-w-[650px] flex-col items-center rounded-lg border border-alto bg-white bg-cover bg-center",
        className
      )}
    >
      {onClose && (
        <button
          className="absolute right-7 top-7 border-none bg-transparent p-2 text-naturalGray opacity-50 transition-opacity hover:opacity-100"
          onClick={onClose}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>
  );
};
