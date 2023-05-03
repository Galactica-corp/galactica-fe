import defaultToast, { Toast as ToastType } from "react-hot-toast";
import { ReactComponent as CloseIcon } from "shared/icons/close.svg";
import { ReactComponent as FailedIcon } from "shared/icons/failed.svg";
import { ReactComponent as SuccessIcon } from "shared/icons/success.svg";

export type Status = "failed" | "success";

type Props = {
  t: ToastType;
  status: Status;
  label?: string;
  text?: string;
};

export function Toast({ t, status, text }: Props) {
  let icon = null;
  let label = null;
  switch (status) {
    case "success":
      icon = <SuccessIcon className="h-[1rem] w-[1rem]" />;
      label = "Success";
      break;
    case "failed":
      icon = <FailedIcon className="h-[1rem] w-[1rem]" />;
      label = "Failed";
      break;
    default:
      break;
  }

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-[18.75rem] rounded-[0.3rem] border border-salmon bg-white`}
    >
      <div className="w-0 flex-1 p-[1rem]">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">{icon}</div>
          <div className="ml-[0.75rem] flex-1">
            <p className="mb-[0.3rem] text-[1rem] text-mineShaft">{label}</p>
            <p className="text-[0.8rem] text-mineShaft">{text}</p>
          </div>
        </div>
      </div>

      <CloseIcon
        className="m-4 h-[1rem] w-[1rem] cursor-pointer"
        onClick={() => {
          defaultToast.dismiss(t.id);
        }}
      />
    </div>
  );
}
