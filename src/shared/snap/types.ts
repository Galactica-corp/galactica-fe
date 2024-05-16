import { Address } from "viem";

export type Snap = {
  blocked: boolean;
  enabled: boolean;
  id: string;
  initialPermissions: Record<string, unknown>;
  version: string;
};

export type GetSnapsResponse = Record<string, Snap>;

export type SBT = {
  dApp: Address;
  encryptedData: readonly Address[];
  expirationTime: number;
  humanID: Address;
  providerPubKey: string;
  userPubKey: string[];
  verifierCodehash: Address;
  verifierWrapper: Address;
};

export type SbtDetails = {
  sbts: SBT[];
};
