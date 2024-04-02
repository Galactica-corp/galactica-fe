import { Chain } from "wagmi";

export const galacticaAndromedaTestnet: Chain = {
  id: 41238,
  name: "Galactica-Andromeda",
  network: "Galactica-Andromeda",
  nativeCurrency: {
    decimals: 18,
    name: "Galactica",
    symbol: "GNET",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-http-andromeda.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-andromeda.galactica.com/"],
    },
    public: {
      http: ["https://evm-rpc-http-andromeda.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-andromeda.galactica.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer-andromeda.galactica.com/",
    },
  },
  testnet: true,
};
