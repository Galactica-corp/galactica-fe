import "@total-typescript/ts-reset/dist/array-includes";
import "@total-typescript/ts-reset/dist/filter-boolean";
import { Ethereum } from "@wagmi/core";
import { GetSnapsResponse } from "shared/snap";

declare module "@wagmi/core" {
  interface Ethereum {
    request(args: { method: "web3_clientVersion" }): Promise<string | string[]>;

    request(args: {
      method: "wallet_requestSnaps";
      params: Record<string, unknown>;
    }): Promise<boolean>;

    request(args: {
      method: "wallet_getSnaps";
      params?: Record<string, unknown>;
    }): Promise<GetSnapsResponse>;

    request(args: {
      method: "wallet_invokeSnap";
      params?: {
        snapId: string;
        request: {
          method: string;
          params?: Record<string, unknown>;
        };
      };
    }): Promise<GetSnapsResponse>;
  }
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
