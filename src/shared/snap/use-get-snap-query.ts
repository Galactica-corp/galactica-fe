import { useQuery } from "@tanstack/react-query";
import { snapsKeys } from "./keys";
import { useIsFlaskQuery } from "./use-is-flask-query";

export const useGetSnapQuery = (snapId = import.meta.env.VITE_SNAP_ID) => {
  const isFlaskQuery = useIsFlaskQuery();

  return useQuery({
    queryKey: snapsKeys.snap(snapId),
    queryFn: async () => {
      const snaps = await window.ethereum?.request({
        method: "wallet_getSnaps",
      });

      if (!snaps) return null;

      return Object.values(snaps).find((snap) => snap.id === snapId) || null;
    },
    enabled: Boolean(
      window.ethereum && isFlaskQuery.isSuccess && isFlaskQuery.data
    ),
  });
};
