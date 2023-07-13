import { useLocalStorage } from "usehooks-ts";
import { SNAP_LS_KEYS } from "../const";
import { ZkCertsListItem } from "../types";

export const useZkCerts = () => {
  return useLocalStorage<ZkCertsListItem[]>(SNAP_LS_KEYS.zkCerts, []);
};
