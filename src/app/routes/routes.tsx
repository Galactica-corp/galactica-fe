import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Ecosystem } from "pages/ecosystem";
import { Layout } from "pages/ui";
import { Fallback } from "./fallback";

const Home = lazy(() =>
  import("pages/home").then((module) => ({ default: module.Home }))
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
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/kyc-providers" element={<KYCProvidersPage />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
