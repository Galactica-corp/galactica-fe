const SNAP_ID = "npm:@galactica-corp/snap";

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = SNAP_ID,
  params: Record<"version" | string, unknown> = {}
) => {
  const res = await window.ethereum?.request({
    method: "wallet_requestSnaps",
    params: {
      [snapId]: {
        ...params,
      },
    },
  });

  return res;
};

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async () => {
  return await window.ethereum?.request({
    method: "wallet_getSnaps",
  });
};
