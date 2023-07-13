import { useRef } from "react";
import { toast } from "react-hot-toast";
import classNames from "classnames";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useGenZkRepeatableProofMutation } from "shared/snap/use-gen-zk-repeatable-proof-mutation";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";
import CardPng from "./bg.png";

type Props = {
  title?: string;
  desc?: string;
} & ClassName;

export const GenerateCard = ({
  className,
  title = "Generate your first SBT",
  desc = "In order to use your zkKYC, you need to generate at least a minimal zkProof disclosing its existence and the following fields:",
}: Props) => {
  const toastIdRef = useRef("");
  const genMutation = useGenZkRepeatableProofMutation({
    onDownloadProver: () =>
      toast.loading("Prover file is being downloaded...", {
        id: toastIdRef.current,
        duration: 20000,
      }),

    onGenerateSbt: () =>
      toast.loading("SBT is being generated...", {
        id: toastIdRef.current,
        duration: 20000,
      }),

    onSubmitSbt: () =>
      toast.loading("SBT is being submitted...", {
        id: toastIdRef.current,
        duration: 20000,
      }),
  });
  return (
    <Card
      className={classNames(className, "bg-cover bg-center bg-no-repeat")}
      style={{ backgroundImage: `url(${CardPng})` }}
      title={title}
      desc={desc}
    >
      <div className="mb-6 mt-2.5 flex items-center justify-between">
        <div className="flex items-center text-sm text-mineShaft/50">
          zkKYC issuer <CheckIcon className="ml-1 w-4" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          zkKYC-level <CheckIcon className="ml-1 w-4" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          Expiration date <CheckIcon className="ml-1 w-4" />
        </div>
      </div>

      <Button
        className="mt-auto w-full"
        onClick={() => {
          toastIdRef.current = toast.loading("Basic proof generating", {
            duration: 30000,
          });
          genMutation.mutate(undefined, {
            onSuccess: () => {
              toast.success("SBT has been generated!", {
                id: toastIdRef.current,
              });
            },
            onError: (err) => {
              const message =
                err &&
                typeof err === "object" &&
                "message" in err &&
                typeof err.message === "string"
                  ? err.message
                  : "Something went wrong";
              toast.error(message, {
                id: toastIdRef.current,
              });
            },
          });
        }}
      >
        Generate zkKYC proof SBT
      </Button>
    </Card>
  );
};
