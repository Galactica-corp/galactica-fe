import { PropsWithChildren } from "react";
import classNames from "classnames";
import { ClassName } from "shared/types";

export const Title = ({
  children,
  className,
}: PropsWithChildren<ClassName>) => {
  return (
    <h3 className={classNames(className, "text-center text-[32px] font-light")}>
      {children}
    </h3>
  );
};
