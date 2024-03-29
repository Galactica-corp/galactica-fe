import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { withSentryReactRouterV6Routing } from "@sentry/react";
import { Dev } from "pages/dev";
import { EcosystemPage } from "pages/ecosystem";
import { HelpPage } from "pages/help";
import { KYCGuardiansPage } from "pages/kyc-guardians";
import { MyKYCPage } from "pages/my-kyc";
import { MySbtDevPage, MySbtPage } from "pages/my-sbt";
import { OnboardingPage } from "pages/onboarding";
import { Layout } from "pages/ui";
import { Fallback } from "./fallback";

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <SentryRoutes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route element={<Layout />}>
          <Route path="/dev" element={<Dev />} />
          <Route index path="/" element={<MyKYCPage />} />
          <Route path="/my-sbt" element={<MySbtPage />} />
          <Route path="/my-sbt-dev" element={<MySbtDevPage />} />
          <Route path="/kyc-guardians" element={<KYCGuardiansPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
        </Route>
      </SentryRoutes>
    </Suspense>
  );
};
