import { toast } from "react-hot-toast";
import classNames from "classnames";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useGenZkRepeatableProofMutation } from "shared/snap/use-gen-zk-repeatable-proof-mutation";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";

export const AlertCard = ({ className }: ClassName) => {
  const mutation = useGenZkRepeatableProofMutation();

  return (
    <Card
      title={
        <div className="whitespace-nowrap text-[26px] font-light">
          Your zkKYC{" "}
          <span className="whitespace-nowrap text-scarlet">
            is not published!
          </span>
        </div>
      }
      desc="In order to use your zkKYC, you need to generate at least a minimal
      zkProof disclosing its existence and the following fields:"
      className={classNames(
        className,
        "card min-h-[238px] flex-col justify-between bg-cover bg-center bg-no-repeat shadow-cardRed"
      )}
    >
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex items-center text-sm text-mineShaft/50">
          zkKYC issuer <CheckIcon className="ml-1 w-3" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          zkKYC Level <CheckIcon className="ml-1 w-3" />
        </div>
        <div className="flex items-center text-sm text-mineShaft/50">
          Expiration Date <CheckIcon className="ml-1 w-3" />
        </div>
      </div>
      <Button
        isLoading={mutation.isLoading}
        onClick={() => {
          const id = toast.loading("Basic proof generating...");

          mutation.mutate(undefined, {
            onSuccess: () => {
              toast.success("Basic proof has been generated", { id });
            },
            onError: () => {
              toast.error("Something went wrong", { id });
            },
          });
        }}
        className="mt-auto w-full normal-case"
      >
        Generate KYC proof SBT
      </Button>
    </Card>
  );
};
