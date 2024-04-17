import { PropsWithChildren } from "react";

import { OnboardingProgress } from "entities/onboarding-progress";
import { Spinner } from "shared/ui/spinner";

import { SnapStep } from "./ui/snap-step";
import { WalletStep } from "./ui/wallet-step";
import { useStep } from "./use-step";

export const ConnectGuard = ({ children }: PropsWithChildren) => {
  const step = useStep();

  return (
    <>
      {step === "initialLoading" && <Spinner />}
      {step === "walletStep" && <WalletStep />}
      {step === "snapStep" && <SnapStep />}
      {step === "finish" && children}
      <OnboardingProgress />
    </>
  );
};
