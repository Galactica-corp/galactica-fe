export const snapsKeys = {
  all: ["snaps"],
  isFlask: () => [...snapsKeys.all, "isFlask"],
  allSnap: () => [...snapsKeys.all, "snap"],
  snap: (snapId = "") => [...snapsKeys.allSnap(), snapId],
  zkCertStorageHashes: (snapId = "") => [
    ...snapsKeys.all,
    snapId,
    "zkCertStorageHashes",
  ],

  allSbt: () => [...snapsKeys.all, "sbts"],
  allSbtByUser: (params: {
    dappAddress: string | undefined;
    userAddress: string | undefined;
    scAddress: string | undefined;
  }) => [...snapsKeys.allSbt(), "byUser", params],
};
