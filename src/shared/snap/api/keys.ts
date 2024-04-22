import { Address } from "viem";

export const snapsKeys = {
  all: ["snaps"],
  allSnap: () => [...snapsKeys.all, "snap"],
  snap: (snapId = "") => [...snapsKeys.allSnap(), snapId],
  zkCertStorageHashes: (address: Address | undefined) => [
    ...snapsKeys.all,
    "zkCertStorageHashes",
    address,
  ],

  allSbt: () => [...snapsKeys.all, "sbts"],
  allSbtByUser: (params: { userAddress: Address | undefined }) => [
    ...snapsKeys.allSbt(),
    "byUser",
    params,
  ],
};
