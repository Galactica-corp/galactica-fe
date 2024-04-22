import { ComponentProps } from "react";

import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { default as LogoutIcon } from "shared/icons/logout.svg?react";
import { default as MetamaskIcon } from "shared/icons/metamask.svg?react";
import { Button } from "shared/ui/button";
import { Spinner } from "shared/ui/spinner";
import { shortAddress } from "shared/web3/utils";

import { default as StarSvg } from "./star.svg?react";

export function ConnectWalletButton() {
  const {
    address,
    isDisconnected,
    isConnecting,
    chainId: currentChainId,
    connector,
  } = useAccount();
  const chainId = useChainId();

  const { switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const handleConnect = () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );
    const flaskConnector = connectors.find((connector) => {
      return connector.name === "MetaMask Flask";
    });

    const connector = metamaskConnector ?? flaskConnector;

    connector && connect({ connector });
  };

  const btnProps: ComponentProps<typeof Button> = {
    className: "w-[18.75rem] space-x-[0.9rem]",
    isLoading: isConnecting,
    theme: "primaryTransparent",
  };

  if (isDisconnected || isConnecting) {
    return (
      <Button {...btnProps} onClick={handleConnect}>
        {isConnecting ? (
          <Spinner />
        ) : (
          <>
            <MetamaskIcon className="relative top-[-0.15rem]" />
            <span>Connect MetaMask</span>
          </>
        )}
      </Button>
    );
  }

  if (currentChainId !== chainId) {
    return (
      <Button
        {...btnProps}
        onClick={() => switchChain({ connector: connector, chainId })}
      >
        <StarSvg className="size-6" />
        <span>Switch network</span>
      </Button>
    );
  }

  return (
    <Button {...btnProps} onClick={() => disconnect()}>
      <span className="mr-1.5">{shortAddress(address, 4, 4)}</span>
      <LogoutIcon className="relative top-[-0.1rem]" />
    </Button>
  );
}
