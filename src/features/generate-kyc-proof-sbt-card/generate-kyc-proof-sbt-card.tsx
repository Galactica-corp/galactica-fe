import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { Button } from "shared/ui/button";
import { cardDefaultStyle } from "shared/utils";
import GenerateKYCProofSBTCardBgUrl from "./images/generate-kyc-proof-sbt-bg.svg";

export function GenerateKYCProofSBTCard() {
  const handler = () => {
    alert("TODO: GENERATE KYC PROOF SBT");
  };

  return (
    <div
      className={`
        ${cardDefaultStyle}
        flex-col justify-between bg-cover bg-center bg-no-repeat shadow-cardRed
      `}
      style={{ backgroundImage: `url(${GenerateKYCProofSBTCardBgUrl})` }}
    >
      <div>
        <div className="text-[1.25rem] font-light">
          Generate a verification SBT to disclose the following fields of your
          KYC to the network:
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
      <Button onClick={handler} className="w-full">
        Generate KYC proof SBT
      </Button>
    </div>
  );
}
