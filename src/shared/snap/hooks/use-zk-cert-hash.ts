import { useLocalStorage } from "usehooks-ts";
import { useAccount } from "wagmi";

import { SNAP_LS_KEYS } from "../const";

export const useZkCertHash = () => {
  const { address } = useAccount();
  return useLocalStorage(SNAP_LS_KEYS.zkHashGip69(address), "");
};
