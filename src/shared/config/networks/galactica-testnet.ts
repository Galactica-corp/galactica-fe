import { Chain } from "wagmi";

export const galacticaTestnet: Chain = {
  id: 41233,
  name: "Galactica-devnet-41233",
  network: "Galactica",
  nativeCurrency: {
    decimals: 18,
    name: "Galactica",
    symbol: "GALA",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-http-devnet-41233.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-devnet-41233.galactica.com/"],
    },
    public: {
      http: ["https://evm-rpc-http-devnet-41233.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-devnet-41233.galactica.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer-devnet-41233.galactica.com/",
    },
  },
  testnet: true,
};
