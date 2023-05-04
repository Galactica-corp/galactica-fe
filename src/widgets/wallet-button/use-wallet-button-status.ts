import { useAccount } from "wagmi";
import { useIsSupportedChain } from "shared/config/hooks";

type Status = "connectNeeded" | "switchNeeded" | "canDisconnect";

export const useWalletButtonStatus = (): Status => {
  const { isConnected } = useAccount();
  const isSupportedChain = useIsSupportedChain();

  if (!isConnected) return "connectNeeded";
  if (!isSupportedChain && isConnected) return "switchNeeded";
  if (isSupportedChain && isConnected) return "canDisconnect";

  return "connectNeeded";
};
