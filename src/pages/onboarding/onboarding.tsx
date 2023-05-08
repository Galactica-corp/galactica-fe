import { useState } from "react";
import { Navigate } from "react-router-dom";
import { StartStep } from "./ui";
import { UploadKYCStep } from "./ui/upload-kyc-step";

type State = "start" | "uploadKyc";

export const Onboarding = () => {
  const [step, setStep] = useState<State>("start");

  if (step === "start")
    return (
      <StartStep
        onNext={() => {
          setStep("uploadKyc");
        }}
      />
    );

  if (step === "uploadKyc") return <UploadKYCStep />;

  return <Navigate to="home" />;
};
