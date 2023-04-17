import { PropsWithChildren } from "react";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { supportedChains } from "shared/config/networks";

const { chains, provider } = configureChains(supportedChains, [
  publicProvider(),
]);

const needsInjectedWalletFallback =
  typeof window !== "undefined" &&
  window.ethereum &&
  !window.ethereum.isMetaMask;

const client = createClient({
  autoConnect: true,
  logger: {
    warn: (message) => console.warn(message),
  },
  connectors: needsInjectedWalletFallback
    ? [
        new MetaMaskConnector({ chains }),
        new WalletConnectConnector({
          chains,
          options: {
            projectId: "5b533bf43166b37afbf7618ba6b3afc0",
            showQrModal: true,
          },
        }),
        new InjectedConnector({
          chains,
          options: {
            name: "Injected",
            shimDisconnect: true,
          },
        }),
      ]
    : [
        new MetaMaskConnector({ chains }),
        new WalletConnectConnector({
          chains,
          options: {
            projectId: "5b533bf43166b37afbf7618ba6b3afc0",
            showQrModal: true,
          },
        }),
      ],
  provider: provider,
});

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
