import "@total-typescript/ts-reset/dist/array-includes";
import "@total-typescript/ts-reset/dist/filter-boolean";
import { Ethereum } from "@wagmi/core";

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
