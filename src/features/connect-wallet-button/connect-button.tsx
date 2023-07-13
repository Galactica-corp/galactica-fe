import { ConnectResult, Provider } from "@wagmi/core";
import { useAccount, useConnect } from "wagmi";
import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button } from "shared/ui/button";

export type ConnectHandler = (result: ConnectResult<Provider>) => void;

type Props = {
  onConnect?: ConnectHandler;
};

export function ConnectWalletButton({ onConnect }: Props) {
  const { isConnected, isConnecting } = useAccount();
  const { connectAsync, connectors } = useConnect();

  const metamaskConnector = connectors[0];

  const handleConnect = async () => {
    try {
      const response = await connectAsync({ connector: metamaskConnector });
      onConnect?.(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (isConnected) return null;

  return (
    <Button
      onClick={handleConnect}
      isLoading={isConnecting}
      theme="primaryTransparent"
      className="w-[18.75rem] space-x-[0.9rem]"
    >
      <MetamaskIcon className="relative top-[-0.15rem]" />
      <span>Connect MetaMask</span>
    </Button>
  );
}
