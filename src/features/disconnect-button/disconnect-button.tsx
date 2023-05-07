import { useAccount, useDisconnect } from "wagmi";
import { ReactComponent as LogoutIcon } from "shared/icons/logout.svg";
import { Button } from "shared/ui/button";
import { shortenAddress } from "shared/utils";

type Props = {
  onDisconnect?: () => void;
};

export const DisconnectButton = ({ onDisconnect }: Props) => {
  const { isDisconnected, address } = useAccount();
  const { disconnectAsync, isLoading } = useDisconnect();

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
      onClick={handleDisconnect}
      isLoading={isLoading}
      theme="primaryTransparent"
      className="w-[18.75rem] space-x-[0.9rem]"
    >
      <span>{shortenAddress(address)}</span>
      <LogoutIcon className="relative top-[-0.1rem]" />
    </Button>
  );
};
