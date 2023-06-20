import { LinkProps, Link as RouterLink } from "react-router-dom";
import cn from "classnames";

export const InternalLink = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={cn(
        className,
        "inline-flex items-baseline text-sm text-salmon hover:underline"
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
