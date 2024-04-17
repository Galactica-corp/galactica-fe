import { PropsWithChildren } from "react";

export type Theme = "primary" | "primaryTransparent";

export type CommonButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  theme?: "primary" | "primaryTransparent";
}>;
