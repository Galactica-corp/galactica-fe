import { useState } from "react";
import classNames from "classnames";
import { useGenBasicProofMutation } from "shared/snap";
import { ClassName } from "shared/types";
import { Button as UIButton } from "shared/ui/button";

type Props = ClassName;

export const Button = ({ className }: Props) => {
  const [btnText, setBtnText] = useState("Generate KYC proof SBT");
  const genMutation = useGenBasicProofMutation({
    onPublish: () => {
      setBtnText("Publishing...");
    },
  });

  return (
    <UIButton
      className={classNames("w-full", className)}
      disabled={genMutation.isLoading}
      onClick={() => {
        setBtnText("Generating...");
        genMutation.mutate(undefined, {
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
