import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { withSentryReactRouterV6Routing } from "@sentry/react";

import { Dev } from "pages/dev";
import { Dev2 } from "pages/dev2";
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
      <Route element={<Dev2 />} path="/dev" />
      <SentryRoutes>
        <Route element={<OnboardingPage />} path="/onboarding" />
        <Route element={<Layout />}>
          <Route element={<Dev />} path="/dev" />
          <Route element={<MyKYCPage />} index path="/" />
          <Route element={<MySbtPage />} path="/my-sbt" />
          <Route element={<MySbtDevPage />} path="/my-sbt-dev" />
          <Route element={<KYCGuardiansPage />} path="/kyc-guardians" />
          <Route element={<HelpPage />} path="/help" />
          <Route element={<EcosystemPage />} path="/ecosystem" />
        </Route>
      </SentryRoutes>
    </Suspense>
  );
};
