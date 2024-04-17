import { useAccount, useDisconnect } from "wagmi";

import { default as LogoutIcon } from "shared/icons/logout.svg?react";
import { Button } from "shared/ui/button";
import { shortAddress } from "shared/web3/utils";

type Props = {
  onDisconnect?: () => void;
};

export const DisconnectButton = ({ onDisconnect }: Props) => {
  const { isDisconnected, address } = useAccount();
  const { disconnectAsync, isPending } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
      onDisconnect?.();
    } catch (error) {
      console.error(error);
    }
  };

  if (isDisconnected) return null;

  return (
    <Button
      className="w-[18.75rem] space-x-[0.9rem]"
      isLoading={isPending}
      onClick={handleDisconnect}
      theme="primaryTransparent"
    >
      <span>{shortAddress(address)}</span>
      <LogoutIcon className="relative top-[-0.1rem]" />
    </Button>
  );
};
