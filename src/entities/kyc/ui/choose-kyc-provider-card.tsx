import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { LinkButton } from "shared/ui/button";
import { Card as UICard } from "shared/ui/card";

export const Card = () => {
  return (
    <UICard
      className="bg-systemCard bg-cover bg-center bg-no-repeat shadow-cardRed"
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

      <LinkButton to="/kyc-providers" className="mt-6 w-full">
        Choose KYC provider
      </LinkButton>
    </UICard>
  );
};
