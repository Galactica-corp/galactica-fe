export const SNAP_LS_KEYS = {
  zkCerts: `zk-certs-list-v2`,
  zkHashGip69: (address: string | undefined) => `zk-hash-gip69-${address}-v2`,
  sbtDetails: (address: string | undefined) =>
    `${import.meta.env.VITE_CHAIN_ID}-sbt-details-${address}-v2`,
  latestBlockChecked: `${import.meta.env.VITE_CHAIN_ID}-latest-block-checked`,
};
