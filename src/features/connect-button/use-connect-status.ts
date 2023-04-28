import { useAccount, useConnect, useSwitchNetwork } from "wagmi";
import { useIsSupportedChain } from "shared/config/hooks";

type Status = "loading" | "connect" | "switchNetwork" | "logout";

export const useConnectStatus = (): Status => {
  const { connector: isConnected } = useAccount();
  const { isLoading } = useConnect();

  const isSupportedChain = useIsSupportedChain();
  console.log({ isSupportedChain });

  const { isLoading: isSwitchNetworkLoading } = useSwitchNetwork();

  if (isLoading || isSwitchNetworkLoading) return "loading";
  if (!isConnected) return "connect";
  if (isConnected && !isSupportedChain) return "switchNetwork";
  return "logout";
};
