import {
  ChainId,
  GenZkProofParams,
  ZkCertInputType,
  ZkCertProof,
  ZkCertStandard,
  sdkConfig,
} from "@galactica-net/snap-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, getContract } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";

import { basicKYCExampleDappAbi } from "shared/config/abi";
import { useSnapClient } from "shared/providers/wagmi";

import { snapsKeys } from "../keys";
import {
  getExpectedValidationTimestamp,
  processProof,
  processPublicSignals,
} from "../utils";
import { useInvokeSnapMutation } from "./use-invoke-snap-mutation";

type Options = {
  onPublish?: () => void;
};

export const useGenBasicProofMutation = ({ onPublish }: Options = {}) => {
  const chainId = useChainId();
  const contracts = sdkConfig.contracts[chainId as unknown as ChainId];
  const pc = usePublicClient({ chainId });

  const client = useSnapClient();
  const { address } = useAccount();

  const queryClient = useQueryClient();

  const generateZKProofMutation = useInvokeSnapMutation<
    GenZkProofParams<ZkCertInputType>,
    ZkCertProof
  >("genZkKycProof");

  return useMutation({
    mutationFn: async () => {
      if (!pc || !address || !client) return;

      const expectedValidationTimestamp =
        await getExpectedValidationTimestamp(pc);

      const proofInput = {
        currentTime: expectedValidationTimestamp,
        dAppAddress: contracts.exampleDapp,
        investigationInstitutionPubKey: [],
      };

      const response = await fetch(import.meta.env.VITE_PROOF_FILE);
      const zkKYCProver = await response.json();

      const zkp = await generateZKProofMutation.mutateAsync({
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

      const contract = getContract({
        address: contracts.exampleDapp as Address,
        abi: basicKYCExampleDappAbi,
        client: client,
      });

      const gas = await contract.estimateGas.registerKYC(
        [a, b, c, publicInputs.map((i) => BigInt(i))],
        { account: address }
      );

      const {
        request: { args, ...options },
      } = await contract.simulate.registerKYC(
        [a, b, c, publicInputs.map((i) => BigInt(i))],
        { account: address, gas }
      );

      const txHash = await contract.write.registerKYC(args, options);

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