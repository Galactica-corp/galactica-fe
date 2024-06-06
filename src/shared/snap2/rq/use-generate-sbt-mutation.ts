/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChainId,
  type SdkConfig,
  ZkCertStandard,
  sdkConfig,
} from "@galactica-net/snap-api";
import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, PublicClient, getContract } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import { fromDecToHex } from "shared/snap/utils";

import { basicKYCExampleDapp } from "../abi/basic-kyc-example-dapp";
import { ZkCertProof, ZkKYCProofInput } from "../types/types";
import { useInvokeSnapMutation } from "./use-invoke-snap-mutation";

const publicInputDescriptions = [
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
];

type Options = {
  onPublish?: () => void;
};

export const useGenerateSBTMutation = (options: Options = {}) => {
  const pc = usePublicClient();
  const mutation = useInvokeSnapMutation("genZkCertProof");
  const { onPublish } = options;

  const { chain, address } = useAccount();
  return useMutation({
    mutationFn: async () => {
      invariant(pc, "public client is undefined");
      invariant(chain, "chain is udnefined");
      invariant(address, "address is undefined. Connect your wallet");
      const contracts: SdkConfig["contracts"][ChainId] | undefined =
        sdkConfig.contracts[chain.id as unknown as ChainId];

      invariant(contracts, "contracts is undefined, wrong network");

      const expectedValidationTimestamp =
        await getExpectedValidationTimestamp(pc);

      const input: ZkKYCProofInput = {
        currentTime: expectedValidationTimestamp,
        dAppAddress: contracts.exampleDapp,
        investigationInstitutionPubKey: [],
      };

      const response = await fetch(import.meta.env.VITE_PROOF_FILE);
      const prover = await response.json();

      const requirements = {
        // TODO: user have to be able to select kyc-cert
        zkCertStandard: ZkCertStandard.ZkKYC,
        registryAddress: "0x815fee70997d8fe6d31ba9ac191e210a523cf9c7",
      };

      const { proof, publicSignals } = await mutation.mutateAsync({
        // ZkCertStandard.ZkKYC => true
        // Twitter => false
        zkInputRequiresPrivKey: true,
        userAddress: address.toString(),
        input,
        requirements,
        prover,
        publicInputDescriptions,
        description:
          "This ZKP discloses that you hold a valid zkKYC. It has no other disclosures.",
      });

      onPublish?.();
      const [a, b, c] = processProof(proof);
      const publicInputs = processPublicSignals(publicSignals);

      const contract = getContract({
        abi: basicKYCExampleDapp,
        address: contracts.exampleDapp as Address,
        client: pc,
      });

      const gas = await contract.estimateGas.registerKYC(
        [a, b, c, publicInputs],
        { account: address }
      );

      const {
        request: { args, ...options },
      } = await contract.simulate.registerKYC([a, b, c, publicInputs], {
        account: address,
        gas,
      });

      const txHash = await contract.write.registerKYC(args, options);

      const receipt = await pc.waitForTransactionReceipt({
        hash: txHash,
      });

      return receipt;
    },
  });
};

async function getExpectedValidationTimestamp(pc: PublicClient) {
  const latestBlock = await pc.getBlock({ blockTag: "latest" });
  const timestamp = latestBlock.timestamp;

  const estimatedProofCreationDuration = 20n;

  const expectedValidationTimestamp =
    timestamp + estimatedProofCreationDuration;

  return Number(expectedValidationTimestamp);
}

function processProof(proof: ZkCertProof["proof"]): any {
  const piA = proof.pi_a
    .slice(0, 2)
    .map((value: string) => fromDecToHex(value, true));
  // for some reason the order of coordinate is reverse
  const piB = [
    [proof.pi_b[0][1], proof.pi_b[0][0]].map((value) =>
      fromDecToHex(value, true)
    ),
    [proof.pi_b[1][1], proof.pi_b[1][0]].map((value) =>
      fromDecToHex(value, true)
    ),
  ];

  const piC = proof.pi_c
    .slice(0, 2)
    .map((value: string) => fromDecToHex(value, true));

  return [piA, piB, piC] as const;
}

function processPublicSignals(publicSignals: string[]): any {
  const formatedInputs = publicSignals.map((value) =>
    fromDecToHex(value, true)
  );
  return formatedInputs;
}
