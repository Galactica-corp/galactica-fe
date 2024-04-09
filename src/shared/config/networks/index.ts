import { galacticaReticulumTestnet } from "./galactica-reticulum";
import { galacticaAndromedaTestnet } from "./galactica-testnet";

const galacticaTestnet =
  import.meta.env.VITE_CHAIN_ID === "9302"
    ? galacticaReticulumTestnet
    : galacticaAndromedaTestnet;

const supportedChains = [galacticaTestnet];
const DEFAULT_CHAIN = galacticaTestnet;

export { galacticaTestnet, supportedChains, DEFAULT_CHAIN };
