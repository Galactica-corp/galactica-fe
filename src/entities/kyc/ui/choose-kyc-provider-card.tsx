import { LinkButton } from "shared/ui/button";
import { Card as UICard } from "shared/ui/card";

export const Card = () => {
  return (
    <UICard
      className="bg-systemCard bg-cover bg-center bg-no-repeat shadow-cardRed"
      title="Your Don't have a zkKYC"
      desc="To access most dApps on Galactica and access all the community
    features of the network, every Soul needs zkKYC."
    >
      <LinkButton to="/kyc-guardians" className="mt-auto w-full">
        Choose zkKYC provider
      </LinkButton>
    </UICard>
  );
};
