export const SNAP_ID =
  import.meta.env.VITE_SNAP_ID ?? "npm:@galactica-net/snap-beta";
console.log(SNAP_ID);

export const LS_KEYS = {
  isOnboardingCompleted: "isOnboardingCompleted",
  shouldCallConfetti: "shouldCallConfetti",
};

export const CONTRACTS_ADDRESSES = {
  KYC_GUARDIAN_WHITELIST: "0x5A040bA7C0eA4ae51b07Fd247a16BA767D716A75",
  ZK_KYC_REGISTRY: "0xfF5d3db206D4972Ba6057797B9862F3207678c4d",
  VERIFICATION_SBT: "0x3AFF448DdF6F75d3D92DC46A47e230181d174614",
  EXAMPLE_ZK_KYC_AGE_PROOF: "0x200aE9f8D04c152128D78856E3e95d200915F69E",
  EXAMPLE_ZKP_VERIFIER: "0xe21F38E2D07Bc1EFE4413FeB5b11FBfcdeE59455",
  EXAMPLE_DAPP: "0x2033c7805e0FE95053c8372ad77e0B9461c5eEB1",

  EXAMPLE_INSTITUTIONS: [
    "0x571619d791D68Bd8f45A7b9498bfbe8D6Fb01401",
    "0xE34Cd061f57e629d7e83eA578982B62369F19445",
    "0x249c63682a93e4044467eD4C4EABF2D010425735",
  ],

  EXAMPLE_ZK_KYC: "0xb8B1720908717E585d98A502c0A9743c06DC96E5",
  REPEATABLE_ZK_KYC_TEST: "0xf8ebfF115Ac2B28298b9e552d9b6aC699cd93b77",
};
