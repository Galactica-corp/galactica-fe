import { PropsWithChildren } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
} & NavLinkProps;

export const HeaderLink = ({
  children,
  className,
  ...navProps
}: PropsWithChildren<Props>) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return twMerge(
          "inline-flex items-center rounded px-5 py-2.5 font-publicoTextMono text-mineShaft/50  transition-colors hover:bg-sandyBrown/5",
          isActive && "rounded-md bg-sandyBrown/5 text-sandyBrown/100",
          className
        );
      }}
      {...navProps}
    >
      {children}
    </NavLink>
  );
};
