import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "pages/ui";
import { Fallback } from "./fallback";

const Home = lazy(() =>
  import("pages/home").then((module) => ({ default: module.Home }))
);

const WelcomePage = lazy(() =>
  import("pages/welcome").then((module) => ({ default: module.WelcomePage }))
);

const KYCProvidersPage = lazy(() =>
  import("pages/kyc-providers").then((module) => ({
    default: module.KYCProvidersPage,
  }))
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/kyc-providers" element={<KYCProvidersPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
