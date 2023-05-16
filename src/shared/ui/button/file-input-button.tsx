import { ComponentProps } from "react";
import cn from "classnames";
import { Spinner } from "../spinner";
import { getCls } from "./styles";
import { CommonButtonProps } from "./types";

type Props = CommonButtonProps & Omit<ComponentProps<"input">, "type">;

export const FileInputButton = ({
  children,
  className,
  isLoading,
  theme = "primary",
  disabled = false,
  ...props
}: Props) => {
  return (
    <label className={cn(getCls(theme), className)}>
      <input {...props} className="hidden" disabled={disabled} type="file" />
      {isLoading ? <Spinner /> : children}
    </label>
  );
};