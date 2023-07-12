import { toast } from "react-hot-toast";
import classNames from "classnames";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useGenZkAgeProofMutation } from "shared/snap";
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
  desc = "In order to use your KYC, you need to generate at least a minimal zkProof disclosing its existence and the following fields:",
}: Props) => {
  const genMutation = useGenZkAgeProofMutation();
  return (
    <Card
      className={classNames(className, "bg-cover bg-center bg-no-repeat")}
      style={{ backgroundImage: `url(${CardPng})` }}
      title={title}
      desc={desc}
    >
      <div className="mb-6 mt-2.5 flex items-center justify-between">
        <div className="flex items-center text-sm text-mineShaft/50">
          KYC issuer <CheckIcon className="ml-1 w-4" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          KYC-level <CheckIcon className="ml-1 w-4" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          Expiration date <CheckIcon className="ml-1 w-4" />
        </div>
      </div>

      <Button
        className="mt-auto w-full"
        onClick={() => {
          const toastId = toast.loading("Generating age sbt");
          genMutation.mutate(undefined, {
            onSuccess: () => {
              toast.success("Age sbt has been generated", {
                id: toastId,
              });
            },
            onError: () => {
              toast.error("Something went wrong", {
                id: toastId,
              });
            },
          });
        }}
      >
        Generate KYC proof SBT
      </Button>
    </Card>
  );
};
