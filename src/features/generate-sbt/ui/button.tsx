import { useState } from "react";

import { twMerge } from "tailwind-merge";

import { useGenerateSBTMutation } from "shared/snap2/rq";
import { ClassName } from "shared/types";
import { Button as UIButton } from "shared/ui/button";

type Props = { onSuccess?: () => void } & ClassName;

export const Button = ({ className, onSuccess }: Props) => {
  const [btnText, setBtnText] = useState("Generate KYC proof SBT");

  const genMutation = useGenerateSBTMutation({
    onPublish: () => {
      setBtnText("Publishing...");
    },
  });

  return (
    <UIButton
      className={twMerge(className, "w-full")}
      disabled={genMutation.isPending}
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
