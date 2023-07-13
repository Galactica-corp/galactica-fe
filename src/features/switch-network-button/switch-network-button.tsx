import { Chain, useSwitchNetwork } from "wagmi";
import { useIsSupportedChain } from "shared/config/hooks";
import { DEFAULT_CHAIN } from "shared/config/networks";
import { Button, Theme } from "shared/ui/button";
import { ReactComponent as StarSvg } from "./star.svg";

type Props = {
  theme?: Theme;
  onSwitch?: (chain: Chain) => void;
};

export const SwitchNetworkButton = ({
  onSwitch,
  theme = "primaryTransparent",
}: Props) => {
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
      theme={theme}
      className="w-[18.75rem] space-x-[0.9rem]"
    >
      <StarSvg className="h-6 w-6" />
      <span>Switch network</span>
    </Button>
  );
};
