import { Account, Chain, Client, HttpTransport } from "viem";
import { useChainId, useConnectorClient } from "wagmi";

import { SnapRpcSchema } from "shared/snap/hooks/types";

export const useSnapClient = () => {
  const chainId = useChainId();
  const { data: client } = useConnectorClient({ chainId });

  return client as unknown as
    | Client<HttpTransport, Chain, Account, SnapRpcSchema>
    | undefined;
};
