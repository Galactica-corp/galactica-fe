import { PropsWithChildren } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cn from "classnames";

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
        return cn(
          className,
          isActive && "rounded-md bg-sandyBrown bg-opacity-5 text-sandyBrown",
          "inline-flex items-center rounded px-5 py-2.5 uppercase text-mineShaft transition-colors hover:bg-sandyBrown hover:bg-opacity-5"
        );
      }}
      {...navProps}
    >
      {children}
    </NavLink>
  );
};
