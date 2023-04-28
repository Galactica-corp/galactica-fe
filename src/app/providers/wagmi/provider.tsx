import { PropsWithChildren } from "react";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { supportedChains } from "shared/config/networks";

const { chains, provider } = configureChains(supportedChains, [
  publicProvider(),
]);

// const needsInjectedWalletFallback =
//   typeof window !== "undefined" &&
//   window.ethereum &&
//   !window.ethereum.isMetaMask;

const client = createClient({
  logger: {
    warn: (message) => console.warn(message),
  },
  connectors: [
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  ],
  provider: provider,
});

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
