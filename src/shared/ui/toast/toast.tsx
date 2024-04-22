import defaultToast, { Toast as ToastType } from "react-hot-toast";

import { default as CloseIcon } from "shared/icons/close.svg?react";
import { default as FailedIcon } from "shared/icons/failed.svg?react";
import { default as SuccessIcon } from "shared/icons/success.svg?react";

export type Status = "failed" | "success";

type Props = {
  label?: string;
  status: Status;
  t: ToastType;
  text?: string;
};

export function Toast({ t, status, text }: Props) {
  let icon = null;
  let label = null;
  switch (status) {
    case "success":
      icon = <SuccessIcon className="size-4" />;
      label = "Success";
      break;
    case "failed":
      icon = <FailedIcon className="size-4" />;
      label = "Failed";
      break;
    default:
      break;
  }

  return (
    <div
      className={
        "pointer-events-auto flex w-[18.75rem] rounded-[0.3rem] border border-salmon bg-white"
      }
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="shrink-0 pt-0.5">{icon}</div>
          <div className="ml-3 flex-1">
            <p className="mb-[0.3rem] text-[1rem] text-mineShaft">{label}</p>
            <p className="text-[0.8rem] text-mineShaft">{text}</p>
          </div>
        </div>
      </div>

      <CloseIcon
        className="m-4 size-4 cursor-pointer"
        onClick={() => {
          defaultToast.dismiss(t.id);
        }}
      />
    </div>
  );
}
