import { useEffect, useState } from "react";
import { SNAP_ID } from "shared/config/const";
import { toastError } from "shared/utils/toasts";

type Cert = {
  expirationDate: string;
  verificationLevel: string;
  providerPubKey: {
    Ax: string;
    Ay: string;
  };
};

export function useGetAndUpdateZkCerts() {
  const [certsList, setCertsList] = useState<Cert[]>(
    JSON.parse(localStorage.getItem("certsList") as string) ?? []
  );

  const [certsIsFetching, setCertsIsFetching] = useState(false);

  useEffect(() => {
    async function fetchListZkCerts() {
      try {
        return await window.ethereum?.request({
          method: "wallet_invokeSnap",
          params: {
            snapId: SNAP_ID,
            request: {
              method: "listZkCerts",
            },
          },
        });
      } catch (e) {
        toastError("Get zkCerts error. Please try again.");
        return false;
      }
    }

    async function fetchZkCertStorageHashes() {
      return await window.ethereum?.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: SNAP_ID,
          request: {
            method: "getZkCertStorageHashes",
          },
        },
      });
    }

    async function getCerts() {
      const hashData = await fetchZkCertStorageHashes();
      // TODO: need fix after correct types for requests in global.d.ts
      const hashIsEmpty = Object.keys(hashData as object).length === 0;

      if (hashIsEmpty) return;
      const hash = hashData?.gip69 ?? "";
      const localHash = localStorage.getItem("zkHash");

      if (localHash !== hash && !certsIsFetching) {
        setCertsIsFetching(true);
        const listData = await fetchListZkCerts();
        setCertsIsFetching(false);

        if (!listData) return;

        const certsList = listData?.gip69;
        localStorage.setItem("certsList", JSON.stringify(certsList));
        localStorage.setItem("zkHash", hash.toString());
        // TODO: need to fix types for request in global.d.ts
        setCertsList(certsList);
      }
    }

    // need timeout because in React.StrictMode useEffect mount twice.
    // Because of this, when the page is loaded, if the hash has changed,
    // the metamask window is called twice and the request fetchListZkCerts falls.
    const timeout = setTimeout(getCerts, 150);
    const interval = setInterval(getCerts, 10000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [certsIsFetching]);

  return certsList;
}
