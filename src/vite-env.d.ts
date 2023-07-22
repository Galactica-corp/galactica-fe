/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SNAP_ID: string;
  readonly VITE_EXAMPLE_KYC_PROVIDER_ORIGIN: string;

  // sentry
  readonly VITE_SENTRY: "on" | "off";
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
