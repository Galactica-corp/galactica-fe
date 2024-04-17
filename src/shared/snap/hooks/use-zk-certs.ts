import { ZkCertListItem } from "@galactica-net/snap-api";
import { useLocalStorage } from "usehooks-ts";

import { SNAP_LS_KEYS } from "../const";

export const useZkCerts = () => {
  return useLocalStorage<ZkCertListItem[]>(SNAP_LS_KEYS.zkCerts, []);
};
