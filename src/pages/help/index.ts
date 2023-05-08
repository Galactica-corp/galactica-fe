import { lazy } from "react";

export const HelpPage = lazy(() =>
  import("./help").then((module) => ({
    default: module.Help,
  }))
);
