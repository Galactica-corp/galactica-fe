export type Snap = {
  blocked: boolean;
  enabled: boolean;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export type GetSnapsResponse = Record<string, Snap>;

export type ZkCertStandard = "gip69";

export type SBT = {
  dApp: string;
  verifierWrapper: string;
  expirationTime: number;
  verifierCodehash: string;
  encryptedData: string[];
  userPubKey: string[];
  humanID: string;
  providerPubKey: string;
};

export type SbtDetails = {
  sbts: SBT[];
  latestBlockChecked: number;
};
