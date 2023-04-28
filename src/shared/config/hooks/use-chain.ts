import { useNetwork } from "wagmi";
import { DEFAULT_CHAIN } from "../networks";
import { useIsSupportedChain } from "./use-is-supported-chain";

export const useChain = () => {
  const { chain, chains } = useNetwork();
  const isSupported = useIsSupportedChain();

  if (!isSupported) return DEFAULT_CHAIN;
  return chain ?? chains[0] ?? DEFAULT_CHAIN;
};
