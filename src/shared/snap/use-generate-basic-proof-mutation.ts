import {
  ChainId,
  ZkCertStandard,
  generateZKProof,
  sdkConfig,
} from "@galactica-net/snap-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useWalletClient,
} from "wagmi";

import { basicKYCExampleDappAbi } from "shared/config/abi";

import { snapsKeys } from "./keys";
import {
  getExpectedValidationTimestamp,
  processProof,
  processPublicSignals,
} from "./utils";

type Options = {
  onPublish?: () => void;
};

export const useGenBasicProofMutation = ({ onPublish }: Options = {}) => {
  const chainId = useChainId();
  const contracts = sdkConfig.contracts[chainId as unknown as ChainId];
  const pc = usePublicClient({ chainId });
  const { data: wc } = useWalletClient({ chainId });
  const { address } = useAccount();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!pc || !address || !wc) return;

      const expectedValidationTimestamp =
        await getExpectedValidationTimestamp(pc);

      const proofInput = {
        currentTime: expectedValidationTimestamp,
        dAppAddress: contracts.exampleDapp,
        investigationInstitutionPubKey: [],
      };

      const response = await fetch(import.meta.env.VITE_PROOF_FILE);
      const zkKYCProver = await response.json();

      const zkp = await generateZKProof({
        input: proofInput,
        requirements: {
          zkCertStandard: ZkCertStandard.ZkKYC,
          registryAddress: contracts.zkKycRegistry,
        },
        userAddress: address.toString(),
        description:
          "This ZKP discloses that you hold a valid zkKYC. It has no other disclosures.",
        publicInputDescriptions: [
          "user pubkey Ax",
          "user pubkey Ay",
          "proof valid",
          "verification SBT expiration",
          "merkle root",
          "current time",
          "user address",
          "human id",
          "dapp address",
          "zkKYC guardian pubkey Ax",
          "zkKYC guardian pubkey Ay",
        ],
        prover: zkKYCProver,
      });

      onPublish?.();
      const [a, b, c] = processProof(zkp.proof);
      const publicInputs = processPublicSignals(zkp.publicSignals);

      const { request } = await pc.simulateContract({
        account: address,
        address: contracts.exampleDapp as Address,
        abi: basicKYCExampleDappAbi,
        functionName: "registerKYC",
        args: [a, b, c, publicInputs.map((i) => BigInt(i))],
      });

      const txHash = await wc.writeContract(request);
      const receipt = await pc.waitForTransactionReceipt({
        hash: txHash,
      });

      return receipt;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: snapsKeys.allSbtByUser({
          userAddress: address,
        }),
      });
    },
  });
};
