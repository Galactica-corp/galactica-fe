import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { sdkConfig } from "@galactica-net/snap-api";
import { BrowserTracing, Replay, init } from "@sentry/react";
import { App } from "app/app";

sdkConfig.defaultSnapOrigin = import.meta.env.VITE_SNAP_ID;

if (import.meta.env.VITE_SENTRY === "on" && import.meta.env.PROD) {
  init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    ignoreErrors: ["Non-Error promise rejection captured"],
    integrations: [
      new BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        // tracePropagationTargets: ["https:yourserver.io/api/"],
      }),
      new Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
    <div id="portal-root" className="relative z-10" />
  </StrictMode>
);
