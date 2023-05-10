import { PropsWithChildren } from "react";

export type Theme = "primary" | "primaryTransparent";

export type CommonButtonProps = PropsWithChildren<{
  className?: string;
  theme?: "primary" | "primaryTransparent";
  isLoading?: boolean;
  disabled?: boolean;
}>;
