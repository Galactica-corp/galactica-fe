import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useAccount } from "wagmi";

import { SNAP_ID, SNAP_VERSION } from "shared/config/const";
import { useSnapClient } from "shared/providers/wagmi";

import { snapsKeys } from "../keys";

export const useGetSnapQuery = (snapId = SNAP_ID) => {
  const { isConnected } = useAccount();

  const client = useSnapClient();

  return useQuery({
    queryKey: snapsKeys.snap(snapId),
    queryFn: async () => {
      invariant(client, "Connect your MetaMask wallet to get snap");

      const snaps = await client.request({
        method: "wallet_getSnaps",
      });

      if (!snaps) return null;

      const foundSnap = Object.values(snaps).find(
        (snap) => snap.id === snapId && snap.version === SNAP_VERSION
      );
      return foundSnap ?? null;
    },
    enabled: Boolean(isConnected && client),
  });
};
