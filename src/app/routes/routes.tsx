import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { EcosystemPage } from "pages/ecosystem";
import { HelpPage } from "pages/help";
import { HomePage } from "pages/home";
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
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/my-kyc" element={<MyKYCPage />} />
          <Route path="/my-sbt" element={<MySBTPage />} />
          <Route path="/kyc-providers" element={<KYCProvidersPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
