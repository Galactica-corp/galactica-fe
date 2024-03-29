import { getSnaps } from "@galactica-net/snap-api";
import { useQuery } from "@tanstack/react-query";
import { SNAP_ID } from "shared/config/const";
import { snapsKeys } from "./keys";

export const useGetSnapQuery = (snapId = SNAP_ID) => {
  return useQuery({
    queryKey: snapsKeys.snap(snapId),
    queryFn: async () => {
      const snaps = await getSnaps();

      if (!snaps) return null;
      const foundSnap = Object.values(snaps).find((snap) => snap.id === snapId);
      return foundSnap ?? null;
    },
    enabled: Boolean(window.ethereum),
  });
};
