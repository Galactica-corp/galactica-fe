import { Account, Chain, Client, HttpTransport } from "viem";
import { useAccount, useChainId, useConnectorClient } from "wagmi";

import { config } from "../../providers/wagmi/config";
import { SnapRpcSchema } from "../types/rpc-schema";

export const useSnapClient = () => {
  const chainId = useChainId();
  const { connector } = useAccount();

  const { data: client } = useConnectorClient({
    chainId,
    config,
    connector: connector,
  });

  return {
    client: client as unknown as
      | Client<HttpTransport, Chain, Account, SnapRpcSchema>
      | undefined,
  };
};
