import { useState } from "react";
import { toast } from "react-hot-toast";
import classNames from "classnames";
import { useGenZkRepeatableProofMutation } from "shared/snap/use-gen-zk-repeatable-proof-mutation";
import { usePublishZkRepeatableProofMutation } from "shared/snap/use-publish-zk-repeatable-proof-mutation";
import { ClassName } from "shared/types";
import { Button as UIButton } from "shared/ui/button";

type Props = ClassName;

export const Button = ({ className }: Props) => {
  const genMutation = useGenZkRepeatableProofMutation();
  const publishMutation = usePublishZkRepeatableProofMutation();

  const [zkp, setZkp] = useState<any>();
  const [btnText, setBtnText] = useState("Generate KYC proof SBT");

  return zkp ? (
    <UIButton
      className={classNames("w-full", className)}
      disabled={genMutation.isLoading}
      onClick={() => {
        setBtnText("Publishing...");
        publishMutation.mutate(zkp, {
          onSuccess: () => {
            toast.success("SBT has been published!");
          },
          onError: (err) => {
            const message =
              err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
                ? err.message
                : "Something went wrong";
            toast.error(message);
          },
          onSettled: () => {
            setBtnText("Generate KYC proof SBT");
          },
        });
      }}
    >
      {btnText}
    </UIButton>
  ) : (
    <UIButton
      className={classNames("w-full", className)}
      disabled={genMutation.isLoading}
      onClick={() => {
        setBtnText("Generating...");
        genMutation.mutate(undefined, {
          onSuccess: (data) => {
            setZkp(data);
            console.log(data);
            toast.success("SBT has been generated!");

            setBtnText("Publish KYC proof SBT");
          },
          onError: (err) => {
            const message =
              err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
                ? err.message
                : "Something went wrong";
            toast.error(message);

            setBtnText("Generate KYC proof SBT");
          },
        });
      }}
    >
      {btnText}
    </UIButton>
  );
};
