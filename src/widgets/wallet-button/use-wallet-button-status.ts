import { useAccount } from "wagmi";

type Status = "canDisconnect" | "connectNeeded" | "switchNeeded";

export const useWalletButtonStatus = (): Status => {
  const { isConnected } = useAccount();
  const isSupportedChain = true;

  if (!isConnected) return "connectNeeded";
  if (!isSupportedChain && isConnected) return "switchNeeded";
  if (isSupportedChain && isConnected) return "canDisconnect";

  return "connectNeeded";
};
