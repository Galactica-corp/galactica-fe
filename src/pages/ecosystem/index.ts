import { lazy } from "react";

export const EcosystemPage = lazy(() =>
  import("./ecosystem").then((module) => ({
    default: module.Ecosystem,
  }))
);
