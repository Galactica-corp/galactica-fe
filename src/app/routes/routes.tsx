import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Dev } from "pages/dev";
import { EcosystemPage } from "pages/ecosystem";
import { HelpPage } from "pages/help";
import { KYCProvidersPage } from "pages/kyc-providers";
import { MyKYCPage } from "pages/my-kyc";
import { MySBTPage } from "pages/my-sbt";
import { OnboardingPage } from "pages/onboarding";
import { Layout } from "pages/ui";
import { Fallback } from "./fallback";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route element={<Layout />}>
          <Route path="/dev" element={<Dev />} />
          <Route index path="/" element={<MyKYCPage />} />
          <Route path="/my-sbt" element={<MySBTPage />} />
          <Route path="/kyc-providers" element={<KYCProvidersPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
