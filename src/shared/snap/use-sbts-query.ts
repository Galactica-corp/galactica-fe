import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useAccount, useChainId, usePublicClient } from "wagmi";

import { UseQueryOptions } from "shared/types";

import { snapsKeys } from "./keys";
import { SBT, SbtDetails } from "./types";

// const dappAddress = null;
// const humanID = null;

export const useSbtsQuery = <TData = SbtDetails>(
  options?: { extraEnabled?: boolean } & UseQueryOptions<
    SbtDetails,
    Error,
    TData,
    ReturnType<typeof snapsKeys.allSbtByUser>
  >
) => {
  const chainId = useChainId();
  // const contracts = sdkConfig.contracts[chainId as unknown as ChainId];
  const { address } = useAccount();
  const pc = usePublicClient({ chainId });

  return useQuery({
    queryKey: snapsKeys.allSbtByUser({
      userAddress: address,
    }),
    queryFn: async () => {
      invariant(address);
      invariant(pc);

      return { sbts: [], latestBlockChecked: 0 } as SbtDetails;
    },
    enabled:
      Boolean(address) && options?.extraEnabled === undefined
        ? true
        : Boolean(options?.extraEnabled),
    staleTime: 1000 * 60 * 10, // 10 min
    ...options,
  });
};
