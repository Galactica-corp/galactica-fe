import { Chain } from "wagmi";

export const galacticaTestnet: Chain = {
  id: 41238,
  name: "Galactica-Andromeda",
  network: "Galactica-Andromeda",
  nativeCurrency: {
    decimals: 18,
    name: "Galactica",
    symbol: "UGNET",
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
