import { LinkButton } from "shared/ui/button";
import { Card as UICard } from "shared/ui/card";

export const Card = () => {
  return (
    <UICard
      className="bg-systemCard bg-cover bg-center bg-no-repeat shadow-cardRed"
      desc="Passing the KYC is required in order to generate zkKYC that will be required by dApps."
      title="Get your zkKYC"
    >
      <LinkButton className="mt-auto w-full" to="/kyc-guardians">
        Select KYC Guardian
      </LinkButton>
    </UICard>
  );
};
