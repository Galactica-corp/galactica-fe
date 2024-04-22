import { ConnectWalletButton } from "features/connect-wallet";
import { Logo } from "shared/ui/logo";

import { HeaderLink } from "./header-link";

const HEADERS_LINKS = [
  {
    name: "MY zkKYC",
    to: "/",
  },
  {
    name: "MY SBTs",
    to: "/my-sbt",
  },
  {
    name: "KYC GUARDIANS",
    to: "/kyc-guardians",
  },
  {
    name: "HELP",
    to: "https://discord.gg/galactica",
  },
];

export const Header = () => {
  return (
    <div className="py-10">
      <div className="mx-auto w-[300px] ml:w-[590px] t:w-[680px] dxs:w-[980px] ds:w-[1190px]">
        <div className="flex flex-row items-center justify-between">
          <div>
            <Logo className="w-[16.8rem]" />
          </div>
          <div className="flex gap-2.5">
            {HEADERS_LINKS.map((link) => (
              <HeaderLink
                key={link.name}
                target={link.name === "HELP" ? "_blank" : undefined}
                to={link.to}
              >
                {link.name}
              </HeaderLink>
            ))}
          </div>

          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
};
