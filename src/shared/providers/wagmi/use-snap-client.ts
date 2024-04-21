import { Account, Chain, Client, HttpTransport } from "viem";
import { useAccount, useChainId, useConnectorClient } from "wagmi";

import { SnapRpcSchema } from "shared/snap/hooks/types";

import { config } from "./config";

export const useSnapClient = () => {
  const chainId = useChainId();
  const { connector } = useAccount();

  const { data: client } = useConnectorClient({
    chainId,
    config,
    connector: connector,
  });

  return client as unknown as
    | Client<HttpTransport, Chain, Account, SnapRpcSchema>
    | undefined;
};
