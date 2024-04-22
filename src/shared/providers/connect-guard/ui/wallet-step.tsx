import { ConnectWalletButton } from "features/connect-wallet";

export const WalletStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-30 bg-onboarding bg-cover bg-center">
      <div className="mb-[2.125rem] text-[5.25rem] font-thin leading-[120%] tracking-[-4.2px]">
        Welcome to <span className="font-medium">Galactica.com</span>
      </div>
      <ConnectWalletButton />
    </div>
  );
};
