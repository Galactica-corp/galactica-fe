import { Address } from "viem";

export const SNAP_ID =
  import.meta.env.VITE_SNAP_ID ?? "npm:@galactica-net/snap";

export const SNAP_VERSION = "0.7.3";

export const LS_KEYS = {
  isOnboardingCompleted: `isOnboardingCompleted-v2`,
  shouldCallConfetti: `shouldCallConfetti-v2`,
};

type Contracts = {
  BasicKYCExampleDApp: Address;
  KYCRecordRegistry: Address;
  VerificationSBT: Address;
};

export const config: Record<number | string, Contracts> = {
  "41238": {
    KYCRecordRegistry: "0x454d8a0B2abdc7bAfef7FCbfb6B4c538c6F11C3b",
    VerificationSBT: "0x8eB78221742a837AD71f329b28e9AEd5C2397824",
    BasicKYCExampleDApp: "0x69D473FE859adEb89ec7EA6047f929c64316Ba70",
  },
  "9302": {
    KYCRecordRegistry: "0xc2032b11b79B05D1bd84ca4527D2ba8793cB67b2",
    VerificationSBT: "0x8DbCB0a08CFe38Ee20326471E4260be4BfD321b6",
    BasicKYCExampleDApp: "0x6f640Fd66291DD9C8976db12721BF612Db2d54E8",
  },
};
