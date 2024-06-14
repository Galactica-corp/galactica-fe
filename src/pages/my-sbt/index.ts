import { lazy } from "react";

export const MySbtPage = lazy(() =>
  import("./my-sbt").then((module) => ({
    default: module.MySbt,
  }))
);
