import { useLocalStorage } from "usehooks-ts";
import { useAccount } from "wagmi";
import { SNAP_LS_KEYS } from "../const";
import { ZkCertsListItem } from "../types";

export const useZkCerts = () => {
  const { address } = useAccount();
  return useLocalStorage<ZkCertsListItem[]>(SNAP_LS_KEYS.zkCerts(address), []);
};
