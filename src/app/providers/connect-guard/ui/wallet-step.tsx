import { WalletButton } from "widgets/wallet-button";

export const WalletStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-30 bg-onboarding bg-cover bg-center">
      <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
        Welcome to Galactica.com
      </div>
      <WalletButton />
    </div>
  );
};
