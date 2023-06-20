import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { snapsKeys } from "./keys";

export const useIsFlaskQuery = () => {
  const ethereum = window.ethereum;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: snapsKeys.isFlask(),
    queryFn: async () => {
      invariant(ethereum, "useIsFlaskQuery. ethereum is undefined");

      const clientVersion = await ethereum.request({
        method: "web3_clientVersion",
      });

      const isFlaskDetected = (clientVersion as string[])?.includes("flask");
      return Boolean(ethereum && isFlaskDetected);
    },
    staleTime: Infinity,
    refetchOnWindowFocus: "always",
    enabled: Boolean(ethereum?.isMetaMask),
  });
};
