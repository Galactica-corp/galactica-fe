import { ConnectResult, Provider } from "@wagmi/core";
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from "wagmi";
import { useChain } from "shared/config/hooks";
import { ReactComponent as LogoutIcon } from "shared/icons/logout.svg";
import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button } from "shared/ui/button";
import { shortenAddress } from "shared/utils";
import { useConnectStatus } from "./use-connect-status";

type Props = {
  onConnect?: (result: ConnectResult<Provider>) => void;
};

export function ConnectButton({ onConnect }: Props) {
  const chain = useChain();
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();

  const status = useConnectStatus();

  const metamaskConnector = connectors.find(
    (connector) => connector.id === "metaMask"
  );

  const handleConnect = async () => {
    try {
      // const response = await connectSnap();
      const result = await connectAsync({ connector: metamaskConnector });
      onConnect?.(result);
    } catch (error) {
      console.error(error);
      // TODO: error toast
    }
  };

  return (
    <Button
      onClick={async () => {
        if (status === "connect") handleConnect();
        if (status === "switchNetwork") switchNetwork?.(chain.id);
        if (status === "logout") disconnect();
      }}
      isLoading={status === "loading"}
      type="primaryTransparent"
      className="w-[18.75rem] space-x-[0.9rem]"
    >
      {status === "connect" && (
        <>
          <MetamaskIcon className="relative top-[-0.15rem]" />
          <span>Connect Metamask</span>
        </>
      )}

      {status === "switchNetwork" && (
        <>
          <span>Switch network</span>
          {/* <LogoutIcon className="relative top-[-0.1rem]" /> */}
        </>
      )}

      {status === "logout" && (
        <>
          <span>{shortenAddress(address)}</span>
          <LogoutIcon className="relative top-[-0.1rem]" />
        </>
      )}
    </Button>
  );
}
