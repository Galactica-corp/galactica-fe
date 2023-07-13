export const snapsKeys = {
  all: ["snaps"],
  isFlask: () => [...snapsKeys.all, "isFlask"],
  allSnap: () => [...snapsKeys.all, "snap"],
  snap: (snapId = "") => [...snapsKeys.allSnap(), snapId],
  zkCertStorageHashes: (address: string | undefined) => [
    ...snapsKeys.all,
    "zkCertStorageHashes",
    address,
  ],

  allSbt: () => [...snapsKeys.all, "sbts"],
  allSbtByUser: (params: { userAddress: string | undefined }) => [
    ...snapsKeys.allSbt(),
    "byUser",
    params,
  ],
};
