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
    KYCRecordRegistry: "0x454d8a0B2abdc7bAfef7FCbfb6B4c538c6F11C3b",
    VerificationSBT: "0x8eB78221742a837AD71f329b28e9AEd5C2397824",
    BasicKYCExampleDApp: "0x69D473FE859adEb89ec7EA6047f929c64316Ba70",
  },
};
