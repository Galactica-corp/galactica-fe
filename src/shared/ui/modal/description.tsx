import { PropsWithChildren } from "react";
import classNames from "classnames";
import { ClassName } from "shared/types";

export const Description = ({
  children,
  className,
}: PropsWithChildren<ClassName>) => {
  return (
    <p
      className={classNames(
        className,
        "text-center text-xl font-light text-mineShaft text-opacity-40"
      )}
    >
      {children}
    </p>
  );
};
