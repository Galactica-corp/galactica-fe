import { lazy } from "react";

export const MyKYCPage = lazy(() =>
  import("./my-kyc").then((module) => ({
    default: module.MyKYC,
  }))
);
