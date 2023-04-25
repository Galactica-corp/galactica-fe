import { Logo } from "shared/ui/logo";
import { HeaderLink } from "./header-link";

export const HEADERS_LINKS = [
  {
    name: "My KYC",
    to: "/",
  },
  {
    name: "My SBT",
    to: "/sbt",
  },
  {
    name: "KYC Providers",
    to: "/kyc-providers",
  },
  {
    name: "Help",
    to: "/help",
  },
  {
    name: "ecosystem",
    to: "/ecosystem",
  },
];

export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <Logo />
      </div>
      <div className="flex gap-2.5">
        {HEADERS_LINKS.map((link) => (
          <HeaderLink key={link.name} to={link.to}>
            {link.name}
          </HeaderLink>
        ))}
      </div>
      <div>Button</div>
    </div>
  );
};
