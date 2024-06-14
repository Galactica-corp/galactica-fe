import { queryOptions, useQuery } from "@tanstack/react-query";
import { verificationSBTAbi } from "shared/config/abi";
import { config } from "shared/config/const";
import { QueryOptions } from "shared/types";
import invariant from "tiny-invariant";
import { Address, getContract } from "viem";
import { useAccount, usePublicClient } from "wagmi";

type SBT = {
  Account: Address;
  Contract: Address;
  TokenID: string;
  BlockNumber: number;
  TxHash: string;
};

type SBTInfo = { tokenId: bigint; description: string; expirationTime: bigint };

type Pagination = {
  total_records: number;
  records_per_page: number;
  current_page: number;
  total_pages: number;
  next_page: null | number;
  prev_page: null | number;
};

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

      console.log(sbtInfo);

      if (sbtInfo.dApp !== contractAddresses.BasicKYCExampleDApp) return null;

      const metaLink = await contract.read.tokenURI([sbtInfo.tokenId]);

      console.log(metaLink);

      const metaResponse = await fetch(metaLink);
      const meta: { description: string } = await metaResponse.json();

      console.log("meta", meta);

      // const response = await fetch(
      //   `${import.meta.env.VITE_SBT_INDEXER_URL}/api/sbts?account=${accountAddress}`,
      //   {
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //   }
      // );
      // const data: Response = await response.json();

      // const sbtInfo = await contract.read.getVerificationSBTInfo(
      //   [accountAddress, contractAddresses.BasicKYCExampleDApp],
      //   {
      //     account: accountAddress,
      //   }
      // );

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
  const pc = usePublicClient();
  const { address, chainId } = useAccount();
  return useQuery(getQueryOptions(pc, chainId, address, options));
};
