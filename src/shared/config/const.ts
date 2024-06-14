import { Address } from "viem";

export const SNAP_ID =
  import.meta.env.VITE_SNAP_ID ?? "npm:@galactica-net/snap";

export const SNAP_VERSION = "0.7.3-test";

export const LS_KEYS = {
  isOnboardingCompleted: `isOnboardingCompleted-v2`,
  shouldCallConfetti: `shouldCallConfetti-v2`,
};

type Contracts = {
  KYCRecordRegistry: Address;
  VerificationSBT: Address;
  BasicKYCExampleDApp: Address;
};

export const config: Record<number | string, Contracts> = {
  "41238": {
    KYCRecordRegistry: "0x72ea42283075a462000a84e021D3CFb1E1078FcC",
    VerificationSBT: "0xEfE69EE1A05039224c331481EfA2F8319138EbB8",
    BasicKYCExampleDApp: "0x84FF2BE2516e83E7F02ac6B9D32C64783d98e0e1",
  },
};
