import cn from "classnames";
import { SIZES, Size, THEMES, Theme } from "./styles";
import styles from "./styles.module.css";

type Props = {
  theme?: Theme;
  size?: Size;
  className?: string;
};

export const Spinner = ({
  size = "18",
  theme = "sandyBrown",
  className,
}: Props) => {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <span
        className={cn(
          "inline-block rounded-full",
          styles.spinner,
          THEMES[theme],
          SIZES[size]
        )}
      ></span>
    </div>
  );
};
