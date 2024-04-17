import { Chain } from "viem";

import { galacticaReticulumTestnet } from "./galactica-reticulum";
import { galacticaAndromedaTestnet } from "./galactica-testnet";

const galacticaTestnet =
  import.meta.env.VITE_CHAIN_ID === "9302"
    ? galacticaReticulumTestnet
    : galacticaAndromedaTestnet;

const supportedChains: [Chain, ...Chain[]] = [galacticaTestnet];
const DEFAULT_CHAIN = galacticaTestnet;

export { DEFAULT_CHAIN, galacticaTestnet, supportedChains };
