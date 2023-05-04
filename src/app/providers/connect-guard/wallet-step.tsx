import { WalletButton } from "widgets/wallet-button";

export const WalletStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
        Welcome, <span className="font-semibold ">Citizen!</span>
      </div>
      <WalletButton />
    </div>
  );
};
