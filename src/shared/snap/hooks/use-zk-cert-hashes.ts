import { useLocalStorage } from "usehooks-ts";
import { useAccount } from "wagmi";

import { SNAP_LS_KEYS } from "../const";

export const useZkCertHashes = () => {
  const { address } = useAccount();
  return useLocalStorage<Record<string, string> | undefined>(
    SNAP_LS_KEYS.zkHashes(address),
    undefined
  );
};
