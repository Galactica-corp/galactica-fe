import { queryOptions, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, getContract } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";

import { verificationSBTAbi } from "shared/config/abi";
import { config } from "shared/config/const";
import { QueryOptions } from "shared/types";

type SBTInfo = { description: string; expirationTime: bigint; tokenId: bigint };

type Response = SBTInfo | null;

const getQueryOptions = <TData = Response>(
  pc: ReturnType<typeof usePublicClient>,
  chainId: number | string | undefined,
  accountAddress: Address | undefined,
  options?: QueryOptions<Response, unknown, TData>
) =>
  queryOptions({
    queryKey: ["sbts", chainId, accountAddress] as const,
    staleTime: Infinity,
    queryFn: async () => {
      console.log("hello world!!");
      invariant(pc, "pc is undefined");
      invariant(chainId, "chainId is undefined");
      invariant(accountAddress, "accountAddress is undefined");

      const contractAddresses = config[chainId];

      const contract = getContract({
        abi: verificationSBTAbi,
        address: contractAddresses.VerificationSBT as Address,
        client: pc,
      });

      const sbtInfo = await contract.read.getVerificationSBTInfo(
        [accountAddress, contractAddresses.BasicKYCExampleDApp],
        {
          account: accountAddress,
        }
      );

      if (sbtInfo.dApp !== contractAddresses.BasicKYCExampleDApp) return null;

      const metaLink = await contract.read.tokenURI([sbtInfo.tokenId]);

      console.log(metaLink);

      const metaResponse = await fetch(metaLink);
      const meta: { description: string } = await metaResponse.json();

      console.log("meta", meta);

      return {
        ...meta,
        expirationTime: sbtInfo.expirationTime,
        tokenId: sbtInfo.tokenId,
      } as SBTInfo;
    },
    enabled: Boolean(pc && accountAddress && chainId),
    ...options,
  });

export const useSBTsQuery = <TData = Response>(
  options?: QueryOptions<Response, unknown, TData>
) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });

  return useQuery(getQueryOptions(pc, chainId, address, options));
};
