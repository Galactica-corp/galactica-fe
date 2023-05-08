import { ReactNode } from "react";
import { ReactComponent as CloseIcon } from "shared/icons/close.svg";
import spinnerModalUrl from "shared/images/spinner-modal.png";

type Props = {
  withSpinner?: boolean;
  className?: string;
  children: ReactNode;
};

export function Modal({ className, children, withSpinner }: Props) {
  const handlerClose = () => {
    alert("TODO close modal");
  };

  return (
    <div
      className="
        fixed left-0 top-0 z-20 flex h-full w-full items-center
        justify-center bg-mineShaft/70
      "
    >
      <div
        className={`
        p-[1.95rem]t absolute h-[29.18rem] 
        w-[41.87rem] rounded-[0.5rem] border border-alto bg-white
        text-center
        ${className}
      `}
      >
        <CloseIcon
          onClick={handlerClose}
          className="absolute right-[1.95rem] top-[1.95rem] cursor-pointer opacity-50 hover:opacity-100"
        />
        {withSpinner && (
          <div
            className="m-auto mb-[1.875rem] mt-[3.18rem] h-[6.625rem] w-[6.625rem] animate-spin"
            style={{ backgroundImage: `url(${spinnerModalUrl})` }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
