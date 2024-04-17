import { useAccount, useConnect } from "wagmi";

import { default as MetamaskIcon } from "shared/icons/metamask.svg?react";
import { Button } from "shared/ui/button";

type Props = {
  onConnect?: () => void;
};

export function ConnectWalletButton({ onConnect }: Props) {
  const { isConnected, isConnecting } = useAccount();
  const { connectAsync, connectors } = useConnect();

  const metamaskConnector = connectors[0];

  const handleConnect = async () => {
    try {
      await connectAsync({ connector: metamaskConnector });
      onConnect?.();
    } catch (error) {
      console.error(error);
    }
  };

  if (isConnected) return null;

  return (
    <Button
      className="w-[18.75rem] space-x-[0.9rem]"
      isLoading={isConnecting}
      onClick={handleConnect}
      theme="primaryTransparent"
    >
      <MetamaskIcon className="relative top-[-0.15rem]" />
      <span>Connect MetaMask</span>
    </Button>
  );
}
