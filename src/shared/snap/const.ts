export const SNAP_LS_KEYS = {
  zkCerts: `zk-certs-list-v0.7.3`,
  zkHashes: (address: string | undefined) => `zk-hashes-${address}-v0.7.3`,
  sbtDetails: (address: string | undefined) =>
    `${import.meta.env.VITE_CHAIN_ID}-sbt-details-${address}-v0.7.3`,
  latestBlockChecked: (address: string | undefined) =>
    `${address}-${import.meta.env.VITE_CHAIN_ID}-latest-block-checked-v0.7.3`,
};
