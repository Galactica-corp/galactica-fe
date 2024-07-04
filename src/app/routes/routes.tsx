import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { withSentryReactRouterV6Routing } from "@sentry/react";

import { Dev } from "pages/dev";
import { KYCGuardiansPage } from "pages/kyc-guardians";
import { MyKYCPage } from "pages/my-kyc";
import { MySbtPage } from "pages/my-sbt";
import { OnboardingPage } from "pages/onboarding";
import { Layout } from "pages/ui";

import { Fallback } from "./fallback";

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <SentryRoutes>
        <Route element={<OnboardingPage />} path="/onboarding" />
        <Route element={<Layout />}>
          <Route element={<MyKYCPage />} index path="/" />
          <Route element={<Dev />} path="/dev" />
          <Route element={<MySbtPage />} path="/my-sbt" />
          <Route element={<KYCGuardiansPage />} path="/kyc-guardians" />
        </Route>
      </SentryRoutes>
    </Suspense>
  );
};
