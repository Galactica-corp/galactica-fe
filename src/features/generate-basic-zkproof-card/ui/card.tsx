import classNames from "classnames";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { useGenZkProofMutation } from "shared/snap";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";
import { cardDefaultStyle } from "shared/utils";

export const Card = ({ className }: ClassName) => {
  // const

  const mutation = useGenZkProofMutation();

  const onClick = () => {
    mutation.mutate();
  };

  return (
    <div
      className={classNames(
        className,
        cardDefaultStyle,
        "flex-col justify-between bg-cover bg-center bg-no-repeat shadow-cardRed"
      )}
      // style={{ backgroundImage: `url(${GenerateBasicZkProofCardBgUrl})` }}
    >
      <div>
        <div className="text-[1.75rem] font-light">
          Your KYC <span className="text-scarlet">is not published!</span>
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
      <Button onClick={onClick} className="w-full normal-case">
        GENERATE BASIC zkPROOF
      </Button>
    </div>
  );
};
