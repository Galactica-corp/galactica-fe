import { lazy } from "react";

export const KYCProvidersPage = lazy(() =>
  import("./ui").then((module) => ({
    default: module.KYCProvidersPage,
  }))
);
