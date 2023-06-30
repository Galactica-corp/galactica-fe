import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useGenZkProofMutation } from "shared/snap";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";

type Props = {
  title?: string;
  desc?: string;
} & ClassName;

export const GenerateCard = ({
  className,
  title = "Generate your first SBT",
  desc = "In order to use your KYC, you need to generate at least a minimal zkProof disclosing its existence and the following fields:",
}: Props) => {
  const genMutation = useGenZkProofMutation();
  return (
    <Card className={className} title={title} desc={desc}>
      <div className="mt-2.5 flex items-center justify-between">
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
        className="mt-6 w-full"
        onClick={() => {
          genMutation.mutate(undefined, {
            onSuccess: (data) => {
              console.log(data);
            },
          });
        }}
      >
        Gen
      </Button>
    </Card>
  );
};
