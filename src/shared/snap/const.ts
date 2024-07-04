export const SNAP_LS_KEYS = {
  zkCerts: `zk-certs-list-v2`,
  zkHashes: (address: string | undefined) => `zk-hashes-${address}-v2`,
  sbtDetails: (address: string | undefined) =>
    `${import.meta.env.VITE_CHAIN_ID}-sbt-details-${address}-v2`,
  latestBlockChecked: (address: string | undefined) =>
    `${address}-${import.meta.env.VITE_CHAIN_ID}-latest-block-checked`,
};
