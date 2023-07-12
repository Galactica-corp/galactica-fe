import { toast } from "react-hot-toast";
import classNames from "classnames";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useGenZkRepeatableProofMutation } from "shared/snap/use-gen-zk-repeatable-proof-mutation";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";

export const Card = ({ className }: ClassName) => {
  const mutation = useGenZkRepeatableProofMutation();

  return (
    <div
      className={classNames(
        className,
        "card min-h-[238px] flex-col justify-between bg-cover bg-center bg-no-repeat shadow-cardRed"
      )}
    >
      <div>
        <div className="whitespace-nowrap text-[1.75rem] font-light">
          Your KYC{" "}
          <span className="whitespace-nowrap text-scarlet">
            is not published!
          </span>
        </div>
        <div className="mt-[0.8rem] text-[0.875rem] text-mineShaft/50">
          In order to use your KYC, you need to generate at least a minimal
          zkProof disclosing its existence and the following fields:
        </div>
        <div className="mt-[0.5rem] flex items-center justify-between">
          <div className="flex items-center text-[0.875rem] text-mineShaft/50">
            KYC issuer <CheckIcon className="ml-[0.5rem] w-[1rem]" />
          </div>
          <div className="flex items-center text-[0.875rem] text-mineShaft/50">
            KYC-level <CheckIcon className="ml-[0.5rem] w-[1rem]" />
          </div>
          <div className="flex items-center text-[0.875rem] text-mineShaft/50">
            Expiration date <CheckIcon className="ml-[0.5rem] w-[1rem]" />
          </div>
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
        className="w-full normal-case"
      >
        GENERATE BASIC zkPROOF
      </Button>
    </div>
  );
};
