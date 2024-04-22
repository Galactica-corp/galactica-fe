import { createClient, http, rpcSchema } from "viem";
import { createConfig } from "wagmi";

import { supportedChains } from "shared/config/networks";

import { SnapRpcSchema } from "../../snap/hooks/types";

export const config = createConfig({
  chains: supportedChains,
  multiInjectedProviderDiscovery: true,
  client: ({ chain }) => {
    const client = createClient({
      chain,
      rpcSchema: rpcSchema<SnapRpcSchema>(),
      transport: http(chain.rpcUrls.default.http[0]),
    });

    return client;
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
