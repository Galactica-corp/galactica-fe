/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SNAP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
