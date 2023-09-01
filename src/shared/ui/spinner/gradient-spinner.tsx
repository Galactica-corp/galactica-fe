import { twMerge } from "tailwind-merge";
import spinnerModalUrl from "shared/images/spinner-modal.png";
import { ClassName } from "shared/types";

export const GradientSpinner = ({ className }: ClassName) => {
  return (
    <div
      className={twMerge(
        "flex animate-spin overflow-hidden bg-cover",
        className
      )}
      style={{ backgroundImage: `url(${spinnerModalUrl})` }}
    />
  );
};
