import { Chain, useSwitchNetwork } from "wagmi";
import { useIsSupportedChain } from "shared/config/hooks";
import { DEFAULT_CHAIN } from "shared/config/networks";
import { Button } from "shared/ui/button";

type Props = {
  onSwitch?: (chain: Chain) => void;
};

export const SwitchNetworkButton = ({ onSwitch }: Props) => {
  const isSupportedChain = useIsSupportedChain();
  const { switchNetworkAsync, isLoading } = useSwitchNetwork();

  const handleSwitch = async () => {
    try {
      const chain = await switchNetworkAsync?.(DEFAULT_CHAIN.id);
      chain && onSwitch?.(chain);
    } catch (error) {
      console.error(error);
    }
  };

  if (isSupportedChain) return null;

  return (
    <Button
      onClick={handleSwitch}
      isLoading={isLoading}
      theme="primaryTransparent"
      className="w-[18.75rem] space-x-[0.9rem]"
    >
      <span>Switch network</span>
    </Button>
  );
};
