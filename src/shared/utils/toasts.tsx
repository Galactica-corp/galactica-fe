import { toast } from "react-hot-toast";

import { Toast } from "shared/ui/toast";

export function toastSuccess(text: string) {
  toast.custom((t) => <Toast status="success" t={t} text={text} />, {
    duration: 5000,
  });
}

export function toastError(text: string) {
  toast.custom((t) => <Toast status="failed" t={t} text={text} />, {
    duration: 5000,
  });
}
