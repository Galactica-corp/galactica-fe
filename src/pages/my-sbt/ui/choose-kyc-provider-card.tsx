import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { LinkButton } from "shared/ui/button";
import { Card } from "shared/ui/card";

export const ChooseKycProviderCard = () => {
  return (
    <Card
      className="shadow-cardRed"
      title="Your Don't have a KYC"
      desc="To access most dApps on Galactica and access all the community
    features of the network, every Soul needs KYC."
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

      <LinkButton to="kyc-provider" className="mt-6 w-full">
        Generate KYC proof SBT
      </LinkButton>
    </Card>
  );
};
