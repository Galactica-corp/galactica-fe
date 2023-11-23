import { Ethereum } from "@wagmi/core";
import { GetSnapsResponse, ZkCertStandard, ZkCertsListItem } from "./types";

declare module "@wagmi/core" {
  interface Ethereum {
    request(args: {
      method: "wallet_requestSnaps";
      params: Record<string, unknown>;
    }): Promise<boolean>;

    request(args: { method: "wallet_getSnaps" }): Promise<GetSnapsResponse>;

    request(args: { method: "web3_clientVersion" }): Promise<clientVersion[]>;
  }
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
