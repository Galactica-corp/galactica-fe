import { useGetSnapQuery } from "shared/snap";
import { useWalletButtonStatus } from "widgets/wallet-button";

type Step = "finish" | "initialLoading" | "snapStep" | "walletStep";

export const useStep = (): Step => {
  const walletStatus = useWalletButtonStatus();
  const snapQuery = useGetSnapQuery();

  if (snapQuery.isLoading && snapQuery.isInitialLoading) {
    return "initialLoading";
  }

  if (walletStatus === "connectNeeded" || walletStatus === "switchNeeded") {
    return "walletStep";
  }

  if (snapQuery.data === null) {
    return "snapStep";
  }

  return "finish";
};
