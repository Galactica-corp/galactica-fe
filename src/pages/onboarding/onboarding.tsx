import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { ZkCertsListItem } from "shared/snap/types";
import { CheckKycStep } from "./ui/check-kyc-step";
import { UploadKycStep } from "./ui/upload-kyc-step";

type Step = "alreadyHaveKyc" | "uploadKyc";

export const Onboarding = () => {
  const navigate = useNavigate();
  const [zkCerts] = useLocalStorage<ZkCertsListItem[] | undefined>(
    LS_KEYS.zkCerts,
    []
  );
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    useLocalStorage<boolean>(LS_KEYS.isOnboardingCompleted, false);

  const [step, setStep] = useState<Step>("alreadyHaveKyc");

  const onChooseKycProvider = () => {
    setIsOnboardingCompleted(true);
    navigate("/kyc-providers");
  };

  if (zkCerts?.length !== 0 || isOnboardingCompleted)
    return <Navigate to="/" />;

  return (
    <>
      {step === "alreadyHaveKyc" && (
        <CheckKycStep
          onChooseKycProvider={onChooseKycProvider}
          onHaveKyc={() => {
            setStep("uploadKyc");
          }}
        />
      )}

      {step === "uploadKyc" && (
        <UploadKycStep
          onChooseKycProvider={onChooseKycProvider}
          onUpload={() => {
            setIsOnboardingCompleted(true);
          }}
        />
      )}
    </>
  );
};
