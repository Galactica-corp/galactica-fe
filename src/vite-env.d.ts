/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SNAP_ID: string;
  readonly VITE_EXAMPLE_KYC_PROVIDER_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
