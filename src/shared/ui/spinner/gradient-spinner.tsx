import classNames from "classnames";
import spinnerModalUrl from "shared/images/spinner-modal.png";
import { ClassName } from "shared/types";

export const GradientSpinner = ({ className }: ClassName) => {
  return (
    <div
      className={classNames(
        className,
        "flex animate-spin overflow-hidden bg-cover"
      )}
      style={{ backgroundImage: `url(${spinnerModalUrl})` }}
    />
  );
};
