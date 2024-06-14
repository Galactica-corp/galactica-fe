export const SNAP_ID =
  import.meta.env.VITE_SNAP_ID ?? "npm:@galactica-net/snap";

export const SNAP_VERSION = "0.7.3-test";

export const LS_KEYS = {
  isOnboardingCompleted: `isOnboardingCompleted-v2`,
  shouldCallConfetti: `shouldCallConfetti-v2`,
};

type Contracts = {
  KYCRecordRegistry: "0xeE80930F1982C4962bE19c4A3d7803D2E6Cd85e0";
  VerificationSBT: "0x69AEed769f064400f0e372C1f50d6424e0755F44";
  BasicKYCExampleDApp: "0x70B5fB320b261C2Df354CC25f3Bba33Df41093B9";
};

export const config: Record<number | string, Contracts> = {
  "41238": {
    KYCRecordRegistry: "0xeE80930F1982C4962bE19c4A3d7803D2E6Cd85e0",
    VerificationSBT: "0x69AEed769f064400f0e372C1f50d6424e0755F44",
    BasicKYCExampleDApp: "0x70B5fB320b261C2Df354CC25f3Bba33Df41093B9",
  },
};
