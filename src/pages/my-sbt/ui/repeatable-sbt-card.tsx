import { toast } from "react-hot-toast";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useGenZkRepeatableProofMutation } from "shared/snap/use-gen-zk-repeatable-proof-mutation";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";

export const RepeatableSbtCard = ({ className }: ClassName) => {
  const repeatableProofMutation = useGenZkRepeatableProofMutation();
  return (
    <Card
      className={className}
      title="Repeatable SBT"
      desc="This SBT can be generated a lot of times"
    >
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
        className="mt-auto w-full"
        onClick={() => {
          const toastId = toast.loading("Generating repeatable sbt");
          repeatableProofMutation.mutate(undefined, {
            onSuccess: () => {
              toast.success("Repeatable sbt has been generated", {
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
        Generate
      </Button>
    </Card>
  );
};
