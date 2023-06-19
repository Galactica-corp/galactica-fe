export const SNAP_ID =
  import.meta.env.VITE_SNAP_ID ?? "npm:@galactica-corp/snap";

export const LS_KEYS = {
  isOnboardingCompleted: "isOnboardingCompleted",
  zkCerts: "zk-certs-list",
  zkHashGip69: "zk-hash-gip69",
  onboardingCurrentStep: "1",
};

export const CONTRACTS_ADDRESSES = {
  KYC_GUARDIAN_WHITELIST: "0x2547a64b4CDe45ad691BC393aBe20D405cD5139D",
  ZK_KYC_REGISTRY: "0x8b7f9322F2CF92908eDB02a76DD8A2cAd6E566B5",
  VERIFICATION_SBT: "0xA4ad47FBb926fa605942d025DD5e232A533b5c30",
  EXAMPLE_ZK_KYC_AGE_PROOF: "0x6E5eeD7b04532C33E3689aEFd5596E98Cb694bF5",
  EXAMPLE_ZKP_VERIFIER: "0x538209Ca8ccA04e1548995B0F89B1f829718c2e0",
  EXAMPLE_DAPP: "0xc05e8FA7FB5Ff3c8F9fAe95a62c751498EFFF3E7",
};
