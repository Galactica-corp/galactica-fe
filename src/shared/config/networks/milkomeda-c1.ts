import { Chain } from "wagmi";

export const milkomedaC1Chain: Chain = {
  id: 2001,
  name: "Milkomeda Cardano (C1)",
  network: "milkomeda",
  nativeCurrency: {
    decimals: 18,
    name: "Milk ADA",
    symbol: "milkADA",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet-cardano-evm.c1.milkomeda.com/"],
      webSocket: ["wss://rpc-mainnet-cardano-evm.c1.milkomeda.com/"],
    },
    public: {
      http: ["https://rpc-mainnet-cardano-evm.c1.milkomeda.com/"],
      webSocket: ["wss://rpc-mainnet-cardano-evm.c1.milkomeda.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer-mainnet-cardano-evm.c1.milkomeda.com/",
    },
  },
  testnet: false,
};
