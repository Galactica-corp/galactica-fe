import { LogoutButton } from "features/logout-button";
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
    <div className="py-[2.5rem]">
      <div className="mx-auto w-[300px] ml:w-[590px] t:w-[680px] dxs:w-[980px] ds:w-[1190px]">
        <div className="flex flex-row items-center justify-between">
          <div>
            <Logo className="w-[16.8rem]" />
          </div>
          <div className="flex gap-2.5">
            {HEADERS_LINKS.map((link) => (
              <HeaderLink key={link.name} to={link.to}>
                {link.name}
              </HeaderLink>
            ))}
          </div>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
