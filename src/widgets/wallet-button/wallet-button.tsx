import { ConnectWalletButton } from "features/connect-wallet-button";
import { DisconnectButton } from "features/disconnect-button";
import { SwitchNetworkButton } from "features/switch-network-button";

import { useWalletButtonStatus } from "./use-wallet-button-status";

export const WalletButton = () => {
  const status = useWalletButtonStatus();

  return (
    <>
      {status === "connectNeeded" && <ConnectWalletButton />}
      {status === "switchNeeded" && <SwitchNetworkButton />}
      {status === "canDisconnect" && <DisconnectButton />}
    </>
  );
};
