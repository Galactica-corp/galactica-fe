import { PropsWithChildren } from "react";
import { useWalletButtonStatus } from "widgets/wallet-button";
import { useGetSnapQuery } from "shared/snap";
import { SnapStep } from "./snap-step";
import { WalletStep } from "./wallet-step";

export const ConnectGuard = ({ children }: PropsWithChildren) => {
  const walletStatus = useWalletButtonStatus();

  const snapQuery = useGetSnapQuery();

  console.log(snapQuery.data);
  return (
    <>
      {(walletStatus === "connectNeeded" ||
        walletStatus === "switchNeeded") && <WalletStep />}
      {walletStatus === "canDisconnect" && <SnapStep />}

      {snapQuery.data && walletStatus === "canDisconnect" && children}
    </>
  );
};
