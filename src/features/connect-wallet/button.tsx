import { useAccount, useConnect, useDisconnect } from "wagmi";

import { default as LogoutIcon } from "shared/icons/logout.svg?react";
import { default as MetamaskIcon } from "shared/icons/metamask.svg?react";
import { Button } from "shared/ui/button";
import { Spinner } from "shared/ui/spinner";
import { shortAddress } from "shared/web3/utils";

export function ConnectWalletButton() {
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const onClick = () => {
    if (isConnected) {
      disconnect();
    }
    if (isDisconnected) {
      const metamaskConnector = connectors.find(
        (connector) => connector.name === "MetaMask"
      );
      const flaskConnector = connectors.find((connector) => {
        return connector.name === "MetaMask Flask";
      });

      const connector = metamaskConnector ?? flaskConnector;

      connector && connect({ connector });
    }
  };

  return (
    <Button
      className="w-[18.75rem] space-x-[0.9rem]"
      isLoading={isConnecting}
      onClick={onClick}
      theme="primaryTransparent"
    >
      {isDisconnected && (
        <>
          <MetamaskIcon className="relative top-[-0.15rem]" />
          <span>Connect MetaMask</span>
        </>
      )}
      {isConnecting && <Spinner />}
      {isConnected && (
        <>
          <span className="mr-1.5">{shortAddress(address, 4, 4)}</span>
          <LogoutIcon className="relative top-[-0.1rem]" />
        </>
      )}
    </Button>
  );
}
