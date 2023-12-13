import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  useGenBasicProofMutation,
  useGenZkRepeatableProofMutation,
} from "shared/snap";
import { ClassName } from "shared/types";
import { Button as UIButton } from "shared/ui/button";

type Props = { onSuccess?: () => void } & ClassName;

export const Button = ({ className, onSuccess }: Props) => {
  const [btnText, setBtnText] = useState("Generate KYC proof SBT");

  const genMutation = useGenBasicProofMutation({
    onPublish: () => {
      setBtnText("Publishing...");
    },
  });

  return (
    <UIButton
      className={twMerge(className, "w-full")}
      disabled={genMutation.isLoading}
      onClick={() => {
        setBtnText("Generating...");
        genMutation.mutate(undefined, {
          onSuccess: () => {
            onSuccess?.();
          },
          onSettled: () => {
            setBtnText("Generate KYC proof SBT");
          },
        });
      }}
    >
      {btnText}
    </UIButton>
  );
};
