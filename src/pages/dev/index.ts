import { lazy } from "react";

export const Dev = lazy(() =>
  import("./dev").then((module) => ({
    default: module.Dev,
  }))
);
