import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from "wagmi";
import { useChain } from "shared/config/hooks";
import { ReactComponent as LogoutIcon } from "shared/icons/logout.svg";
import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button } from "shared/ui/button";
import { shortenAddress } from "shared/utils";
import { useConnectStatus } from "./use-connect-status";

export function ConnectButton() {
  const chain = useChain();
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();

  const status = useConnectStatus();

  const metamaskConnector = connectors.find(
    (connector) => connector.id === "metaMask"
  );

  return (
    <Button
      onClick={() => {
        if (status === "connect") connect({ connector: metamaskConnector });
        if (status === "switchNetwork") switchNetwork?.(chain.id);
        if (status === "logout") disconnect();
      }}
      isLoading={status === "loading"}
      type="primaryTransparent"
      className={`space-x-[0.9rem] ${
        status === "connect" ? "w-[18.75rem]" : ""
      }`}
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
