import { useLocalStorage } from "usehooks-ts";
import { useAccount } from "wagmi";
import { SNAP_LS_KEYS } from "../const";
import { SbtDetails } from "../types";

export const useSbtDetails = () => {
  const { address } = useAccount();
  const result = useLocalStorage<SbtDetails>(SNAP_LS_KEYS.sbtDetails(address), {
    sbts: [],
    latestBlockChecked: 0,
  });

  return result;
};
