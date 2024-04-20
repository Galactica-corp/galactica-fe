import { Address } from "viem";

export type Snap = {
  blocked: boolean;
  enabled: boolean;
  id: string;
  initialPermissions: Record<string, unknown>;
  version: string;
};

export type GetSnapsResponse = Record<string, Snap>;

export type ZkCertStandard = "gip69";

export type SBT = {
  dApp: Address | string;
  encryptedData: (Address | string)[];
  expirationTime: number;
  humanID: string;
  providerPubKey: string;
  userPubKey: string[];
  verifierCodehash: string;
  verifierWrapper: string;
};

export type SbtDetails = {
  latestBlockChecked: number;
  sbts: SBT[];
};
