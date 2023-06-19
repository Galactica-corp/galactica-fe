import { useWalletButtonStatus } from "widgets/wallet-button";
import { useGetSnapQuery, useIsFlaskQuery } from "shared/snap";

type Step =
  | "initialLoading"
  | "walletStep"
  | "flaskStep"
  | "snapStep"
  | "finish";

export const useStep = (): Step => {
  const walletStatus = useWalletButtonStatus();
  const snapQuery = useGetSnapQuery();
  const isFlaskQuery = useIsFlaskQuery();

  if (
    (isFlaskQuery.isLoading && isFlaskQuery.isInitialLoading) ||
    (snapQuery.isLoading && snapQuery.isInitialLoading)
  ) {
    return "initialLoading";
  }

  if (!isFlaskQuery.data) {
    return "flaskStep";
  }

  if (walletStatus === "connectNeeded" || walletStatus === "switchNeeded") {
    return "walletStep";
  }

  if (snapQuery.data === null) {
    return "snapStep";
  }

  return "finish";
};
