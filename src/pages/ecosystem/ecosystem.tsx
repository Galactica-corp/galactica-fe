import { EcosystemBanner } from "entities/ecosystem-banner";
import { EcosystemKycList } from "widgets/ecosystem-kyc-list";
import { Layout } from "pages/ui";

export const Ecosystem = () => {
  return (
    <Layout>
      <EcosystemBanner />
      <EcosystemKycList />
    </Layout>
  );
};
