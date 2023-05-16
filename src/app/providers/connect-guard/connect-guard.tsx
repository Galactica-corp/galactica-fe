import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useWalletButtonStatus } from "widgets/wallet-button";
import { SnapContext, useGetSnapQuery, useIsFlaskQuery } from "shared/snap";
import { InstallFlaskStep } from "./install-flask-step";
import { SnapStep } from "./snap-step";
import { WalletStep } from "./wallet-step";

export const ConnectGuard = ({ children }: PropsWithChildren) => {
  const walletStatus = useWalletButtonStatus();
  const snapQuery = useGetSnapQuery();
  const isFlaskQuery = useIsFlaskQuery();

  return (
    <>
      {isFlaskQuery.isSuccess && isFlaskQuery.data ? (
        <>
          {(walletStatus === "connectNeeded" ||
            walletStatus === "switchNeeded") && <WalletStep />}

          {walletStatus === "canDisconnect" && snapQuery.data === null && (
            <SnapStep />
          )}

          {snapQuery.data && walletStatus === "canDisconnect" && (
            <SnapContext.Provider value={snapQuery.data}>
              {children}
            </SnapContext.Provider>
          )}
        </>
      ) : (
        <InstallFlaskStep />
      )}
    </>
  );
};
