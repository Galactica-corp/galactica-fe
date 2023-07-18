import { WalletButton } from "widgets/wallet-button";
import { Logo } from "shared/ui/logo";
import { HeaderLink } from "./header-link";

export const HEADERS_LINKS = [
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
    to: "https://galactica-network.notion.site/f800adec57eb46d284481f387a30b2fd?v=8d7782e07671436aaf156394bd8351a3",
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
              <HeaderLink
                key={link.name}
                to={link.to}
                target={link.name === "HELP" ? "_blank" : undefined}
              >
                {link.name}
              </HeaderLink>
            ))}
          </div>

          <WalletButton />
        </div>
      </div>
    </div>
  );
};
