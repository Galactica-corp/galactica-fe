export const SNAP_ID =
  import.meta.env.VITE_SNAP_ID ?? "npm:@galactica-net/snap-beta";
console.log(SNAP_ID);

export const LS_KEYS = {
  isOnboardingCompleted: "isOnboardingCompleted-v2",
  shouldCallConfetti: "shouldCallConfetti-v2",
};
