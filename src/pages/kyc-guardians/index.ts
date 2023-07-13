import { lazy } from "react";

export const KYCGuardiansPage = lazy(() =>
  import("./ui/kyc-guardians").then((module) => ({
    default: module.KYCGuardiansPage,
  }))
);
