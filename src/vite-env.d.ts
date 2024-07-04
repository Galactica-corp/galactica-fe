/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SNAP_ID: string;
  readonly VITE_EXAMPLE_KYC_PROVIDER_ORIGIN: string;

  // sentry
  readonly VITE_SENTRY: "on" | "off";
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_AUTH_TOKEN: string;
  readonly VITE_ACTIVE_KYC: "repeatable" | "zkKyc";
  readonly VITE_CHAIN_ID: "9302" | "41238";
  readonly VITE_PROOF_FILE: string;
  readonly VITE_SBT_INDEXER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
