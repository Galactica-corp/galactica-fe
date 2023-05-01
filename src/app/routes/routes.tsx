import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Ecosystem } from "pages/ecosystem";
import { Fallback } from "./fallback";

const Home = lazy(() =>
  import("pages/home").then((module) => ({ default: module.Home }))
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
      </Routes>
    </Suspense>
  );
};
