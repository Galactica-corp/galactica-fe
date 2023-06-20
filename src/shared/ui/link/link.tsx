import { LinkProps, Link as RouterLink } from "react-router-dom";
import cn from "classnames";

export const InternalLink = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={cn(className, "link")} {...props}>
      {children}
    </RouterLink>
  );
};
