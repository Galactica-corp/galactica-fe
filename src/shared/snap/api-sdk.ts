import { Address } from "wagmi";
import { SNAP_ID } from "shared/config/const";
import { ZkCertStandard, ZkCertsListItem } from "./types";

type InvokeGetHolderCommitment = {
  method: "getHolderCommitment";
};

type InvokeGenZkKycProof = {
  method: "genZkKycProof";
  params: {
    input: Record<string, unknown>;
    requirements: {
      zkCertStandard: "gip69";
    };
    userAddress: Address;
    wasm: string;
    zkeyHeader: Record<string, unknown>;
    zkeySections: string[];
  };
};

type InvokeClearStorageRequest = {
  method: "clearStorage";
};

type InvokeImportZkCert = {
  method: "importZkCert";
  params: {
    zkCert: unknown;
  };
};

type InvokeExportZkCertRequest = {
  method: "exportZkCert";
  params: {
    zkCertStandard: ZkCertStandard;
  };
};

type InvokeListZkCertsRequest = {
  method: "listZkCerts";
};

type InvokeGetZkCertStorageHashes = {
  method: "getZkCertStorageHashes";
};

type InvokeRequest =
  | InvokeGetHolderCommitment
  | InvokeGenZkKycProof
  | InvokeClearStorageRequest
  | InvokeImportZkCert
  | InvokeExportZkCertRequest
  | InvokeListZkCertsRequest
  | InvokeGetZkCertStorageHashes;

export type InvokeListZkCertsResponse = Record<
  ZkCertStandard,
  ZkCertsListItem[]
>;

type InvokeResponse<T> = T extends InvokeGetHolderCommitment
  ? string
  : T extends InvokeGenZkKycProof
  ? unknown // TODO
  : T extends InvokeClearStorageRequest
  ? string
  : T extends InvokeImportZkCert
  ? unknown // TODO: fix this type
  : T extends InvokeExportZkCertRequest
  ? unknown // TODO: fix this type
  : T extends InvokeListZkCertsRequest
  ? InvokeListZkCertsResponse
  : T extends InvokeGetZkCertStorageHashes
  ? Record<ZkCertStandard, string>
  : never;

export const invokeSnap = <T extends InvokeRequest>(request: T) => {
  return window.ethereum?.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: SNAP_ID,
      request: request,
    },
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any) as Promise<InvokeResponse<T>>;
};
