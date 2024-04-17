export const SNAP_ID =
  import.meta.env.VITE_SNAP_ID ?? "npm:@galactica-net/snap-beta";

export const LS_KEYS = {
  isOnboardingCompleted: `${
    import.meta.env.VITE_CHAIN_ID
  }-isOnboardingCompleted-v2`,
  shouldCallConfetti: `${import.meta.env.VITE_CHAIN_ID}-shouldCallConfetti-v2`,
};
