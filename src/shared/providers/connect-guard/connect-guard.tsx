import { PropsWithChildren } from "react";

import { useAccount, useChainId, useConnect } from "wagmi";

import { useGetSnapQuery } from "shared/snap";
import { Spinner } from "shared/ui/spinner";

import { InstallMetamaskStep } from "./ui/install-metamask-step";
import { SnapStep } from "./ui/snap-step";
import { WalletStep } from "./ui/wallet-step";

export const ConnectGuard = ({ children }: PropsWithChildren) => {
  const {
    isDisconnected,
    isConnecting,
    chainId: currentChainId,
  } = useAccount();
  const chainId = useChainId();

  const snapQuery = useGetSnapQuery();

  const { connectors } = useConnect();

  if (
    !connectors.some(
      (c) => c.name === "MetaMask Flask" || c.name === "MetaMask"
    )
  ) {
    return <InstallMetamaskStep />;
  }

  if (isDisconnected || isConnecting || chainId !== currentChainId)
    return <WalletStep />;

  if (snapQuery.isLoading) return <Spinner />;

  if (snapQuery.isError || (snapQuery.isSuccess && snapQuery.data === null))
    return <SnapStep />;

  return children;
};
