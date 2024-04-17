import { LinkProps, Link as RouterLink } from "react-router-dom";

import { twMerge } from "tailwind-merge";

export const InternalLink = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={twMerge("link", className)} {...props}>
      {children}
    </RouterLink>
  );
};
