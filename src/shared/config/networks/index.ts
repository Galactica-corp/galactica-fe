import { milkomedaC1Chain } from "./milkomeda-c1";
import { milkomedaC1TestnetChain } from "./milkomeda-testnet-c1";

const supportedChains = [milkomedaC1Chain, milkomedaC1TestnetChain];
const DEFAULT_CHAIN = milkomedaC1Chain;

export {
  milkomedaC1Chain,
  milkomedaC1TestnetChain,
  supportedChains,
  DEFAULT_CHAIN,
};
