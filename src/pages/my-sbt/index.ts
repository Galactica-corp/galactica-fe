import { lazy } from "react";

export const MySbtPage = lazy(() =>
  import("./my-sbt").then((module) => ({
    default: module.MySbt,
  }))
);

export const MySbtDevPage = lazy(() =>
  import("./my-sbt-dev").then((module) => ({
    default: module.MySbtDev,
  }))
);
