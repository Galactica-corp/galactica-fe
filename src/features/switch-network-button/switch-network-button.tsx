import { Chain } from "viem";
import { useSwitchChain } from "wagmi";

import { DEFAULT_CHAIN } from "shared/config/networks";
import { Button, ButtonTheme } from "shared/ui/button";

import { default as StarSvg } from "./star.svg?react";

type Props = {
  onSwitch?: (chain: Chain) => void;
  theme?: ButtonTheme;
};

export const SwitchNetworkButton = ({
  onSwitch,
  theme = "primaryTransparent",
}: Props) => {
  const isSupportedChain = true;
  const { isPending, switchChainAsync } = useSwitchChain();

  const handleSwitch = async () => {
    try {
      const chain = await switchChainAsync?.({ chainId: DEFAULT_CHAIN.id });
      chain && onSwitch?.(chain);
    } catch (error) {
      console.error(error);
    }
  };

  if (isSupportedChain) return null;

  return (
    <Button
      className="w-[18.75rem] space-x-[0.9rem]"
      isLoading={isPending}
      onClick={handleSwitch}
      theme={theme}
    >
      <StarSvg className="size-6" />
      <span>Switch network</span>
    </Button>
  );
};
