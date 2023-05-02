import "@total-typescript/ts-reset/dist/array-includes";
import "@total-typescript/ts-reset/dist/filter-boolean";
import { Ethereum } from "@wagmi/core";

declare module "@wagmi/core" {
  interface Ethereum {
    request(args: {
      method: "wallet_requestSnaps";
      params: Record<string, unknown>;
    }): Promise<boolean>;
  }
}

declare;

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
