import { PropsWithChildren } from "react";
import { useWalletButtonStatus } from "widgets/wallet-button";
import { SnapContext, useGetSnapQuery, useIsFlaskQuery } from "shared/snap";
import { SnapStep } from "./snap-step";
import { WalletStep } from "./wallet-step";

export const ConnectGuard = ({ children }: PropsWithChildren) => {
  const walletStatus = useWalletButtonStatus();
  const snapQuery = useGetSnapQuery();
  const isFlaskQuery = useIsFlaskQuery();

  console.log(isFlaskQuery.data);

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
        <div>install metamask Flask</div>
      )}
    </>
  );
};
