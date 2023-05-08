import { lazy } from "react";

export const MySBTPage = lazy(() =>
  import("./my-sbt").then((module) => ({
    default: module.MySBT,
  }))
);
