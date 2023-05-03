import { toast } from "react-hot-toast";
import { Toast } from "shared/ui/toast";

export function toastSuccess(text: string) {
  toast.custom((t) => <Toast t={t} status="success" text={text} />, {
    duration: 5000,
  });
}

export function toastError(text: string) {
  toast.custom((t) => <Toast t={t} status="failed" text={text} />, {
    duration: 5000,
  });
}
