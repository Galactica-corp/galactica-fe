import { PropsWithChildren, useEffect } from "react";
import { OnboardingProgress } from "entities/onboarding-progress";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { Spinner } from "shared/ui/spinner";
import { InstallFlaskStep } from "./ui/install-flask-step";
import { SnapStep } from "./ui/snap-step";
import { WalletStep } from "./ui/wallet-step";
import { useStep } from "./use-step";

export const ConnectGuard = ({ children }: PropsWithChildren) => {
  const [_, setIsOnboardingCompleted] = useLocalStorage(
    LS_KEYS.isOnboardingCompleted,
    false
  );

  const [_currentStep, setCurrentStep] = useLocalStorage(
    LS_KEYS.onboardingCurrentStep,
    "1"
  );

  const step = useStep();

  useEffect(() => {
    if (step === "flaskStep") {
      setCurrentStep("1");
    }
    if (step === "snapStep") {
      setCurrentStep("2");
    }
  }, [step, setCurrentStep]);

  return (
    <>
      {step === "initialLoading" && <Spinner />}
      {step === "walletStep" && <WalletStep />}
      {step === "flaskStep" && <InstallFlaskStep />}
      {step === "snapStep" && (
        <SnapStep
          onInstall={() => {
            setCurrentStep("3");
            setIsOnboardingCompleted(false);
          }}
        />
      )}
      {step === "finish" && children}
      <OnboardingProgress />
    </>
  );
};
