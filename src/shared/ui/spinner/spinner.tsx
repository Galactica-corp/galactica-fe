import { twMerge } from "tailwind-merge";

import { SIZES, Size, THEMES, Theme } from "./styles";

import styles from "./styles.module.css";

type Props = {
  className?: string;
  size?: Size;
  theme?: Theme;
};

export const Spinner = ({
  size = "18",
  theme = "sandyBrown",
  className,
}: Props) => {
  return (
    <div className={twMerge("inline-flex items-center", className)}>
      <span
        className={twMerge(
          "inline-block rounded-full",
          styles.spinner,
          THEMES[theme],
          SIZES[size]
        )}
      ></span>
    </div>
  );
};
