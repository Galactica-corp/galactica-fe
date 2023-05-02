import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  href: string;
}

export const Link = ({ className = "", href, children, ...rest }: Props) => (
  <a
    href={href}
    className={`
      ${className}
      flex items-baseline text-[0.875rem] text-salmon
      hover:underline
    `}
    {...rest}
  >
    {children}
  </a>
);
