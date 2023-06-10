import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { CheckKycStep } from "./ui/check-kyc-step";
import { SetupHoldingKeyStep } from "./ui/setup-holding-key-step";
import { UploadKycStep } from "./ui/upload-kyc-step";

type Step = "setupHoldingKey" | "alreadyHaveKyc" | "uploadKyc";

export const Onboarding = () => {
  const navigate = useNavigate();
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useLocalStorage(
    LS_KEYS.isOnboardingCompleted,
    false
  );
  const [step, setStep] = useState<Step>("setupHoldingKey");

  const onChooseKycProvider = () => {
    setIsOnboardingCompleted(true);
    navigate("/kyc-providers");
  };

  if (isOnboardingCompleted) return <Navigate to="/" />;

  return (
    <>
      {step === "setupHoldingKey" && (
        <SetupHoldingKeyStep
          onNext={() => {
            setStep("alreadyHaveKyc");
          }}
        />
      )}
      {step === "alreadyHaveKyc" && (
        <CheckKycStep
          onChooseKycProvider={onChooseKycProvider}
          onNext={() => {
            setStep("uploadKyc");
          }}
        />
      )}

      {step === "uploadKyc" && (
        <UploadKycStep
          onChooseKycProvider={onChooseKycProvider}
          onNext={() => {
            setIsOnboardingCompleted(true);
          }}
        />
      )}
    </>
  );
};
