import { useNetwork } from "wagmi";
import { supportedChains } from "shared/config/networks";

export const useIsSupportedChain = () => {
  const { chain } = useNetwork();
  return supportedChains.some((ch) => ch.id === chain?.id);
};
