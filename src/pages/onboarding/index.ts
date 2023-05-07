import { lazy } from "react";

export const OnboardingPage = lazy(() =>
  import("./onboarding").then((module) => ({
    default: module.Onboarding,
  }))
);
