import { Chain } from "wagmi";

export const milkomedaC1TestnetChain: Chain = {
  id: 200101,
  name: "Milkomeda C1 Testnet",
  network: "milkomeda",
  nativeCurrency: {
    decimals: 18,
    name: "milk ADA",
    symbol: "milkADA",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-devnet-cardano-evm.c1.milkomeda.com/"],
      webSocket: ["wss://rpc-devnet-cardano-evm.c1.milkomeda.com/"],
    },
    public: {
      http: ["https://rpc-devnet-cardano-evm.c1.milkomeda.com/"],
      webSocket: ["wss://rpc-devnet-cardano-evm.c1.milkomeda.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer-devnet-cardano-evm.c1.milkomeda.com/",
    },
  },
  testnet: true,
};
