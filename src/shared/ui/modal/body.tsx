import { PropsWithChildren } from "react";
import cn from "classnames";
import { ReactComponent as CloseIcon } from "shared/icons/close.svg";
import spinnerModalUrl from "shared/images/spinner-modal.png";
import { ClassName } from "shared/types";

type Props = {
  onClose?: () => void;
  withSpinner?: boolean;
} & ClassName;

export const Body = ({
  children,
  className,
  withSpinner = false,
  onClose,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "relative m-auto flex min-h-[460px] min-w-[650px] flex-col items-center rounded-lg border border-alto bg-white",
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

      {withSpinner && (
        <div
          className="mx-auto animate-spin"
          style={{ backgroundImage: `url(${spinnerModalUrl})` }}
        />
      )}
      {children}
    </div>
  );
};
