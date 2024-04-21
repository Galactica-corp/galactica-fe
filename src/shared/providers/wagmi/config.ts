import { createClient, http, rpcSchema } from "viem";
import { createConfig } from "wagmi";

import { supportedChains } from "shared/config/networks";

import { SnapRpcSchema } from "../../snap/hooks/types";

export const config = createConfig({
  chains: supportedChains,
  multiInjectedProviderDiscovery: true,
  transports: {
    [supportedChains[0].id]: http(supportedChains[0].rpcUrls.default.http[0]),
  },
  // client: ({ chain }) => {
  //   const client = createClient({
  //     chain,
  //     rpcSchema: rpcSchema<SnapRpcSchema>(),
  //     transport: http(chain.rpcUrls.default.http[0]),
  //   });

  //   return client;
  // },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
