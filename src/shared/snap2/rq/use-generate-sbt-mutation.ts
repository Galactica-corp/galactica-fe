import {
  ChainId,
  type SdkConfig,
  ZkCertStandard,
  sdkConfig,
} from "@galactica-net/snap-api";
import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import {
  Address,
  PublicClient,
  TransactionExecutionError,
  getContract,
} from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import { basicKYCExampleDapp } from "../abi/basic-kyc-example-dapp";
import { ZkCertProof, ZkKYCProofInput } from "../types/types";
import { useInvokeSnapMutation } from "./use-invoke-snap-mutation";
import prover from "./zkKYC.0xdedc286dAaaECccAA8a7E9c07A5A5893F9D8abf6.prover.json";

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
  const wc = useWalletClient();
  const mutation = useInvokeSnapMutation("genZkCertProof");
  const { onPublish } = options;

  const { chain, address } = useAccount();
  return useMutation({
    mutationFn: async () => {
      invariant(pc, "public client is undefined");
      invariant(wc.data, "wc is undefined");
      invariant(chain, "chain is udnefined");
      invariant(address, "address is undefined. Connect your wallet");
      const contracts: SdkConfig["contracts"][ChainId] | undefined =
        sdkConfig.contracts[chain.id as unknown as ChainId];

      invariant(contracts, "contracts is undefined, wrong network");

      const expectedValidationTimestamp =
        await getExpectedValidationTimestamp(pc);

      const input: ZkKYCProofInput = {
        currentTime: expectedValidationTimestamp,
        dAppAddress: "0x70B5fB320b261C2Df354CC25f3Bba33Df41093B9",
        investigationInstitutionPubKey: [],
      };

      // const response = await fetch(import.meta.env.VITE_PROOF_FILE);
      // const prover = await response.json();

      const requirements = {
        // TODO: user have to be able to select kyc-cert
        zkCertStandard: ZkCertStandard.ZkKYC,
        registryAddress:
          "0xeE80930F1982C4962bE19c4A3d7803D2E6Cd85e0".toLowerCase(),
      };

      const { proof, publicSignals } = await mutation.mutateAsync({
        // ZkCertStandard.ZkKYC => true
        // Twitter => false
        zkInputRequiresPrivKey: true,
        userAddress: address.toString(),
        input,
        requirements,
        prover: prover as any,
        publicInputDescriptions,
        description:
          "This ZKP discloses that you hold a valid zkKYC. It has no other disclosures.",
      });

      onPublish?.();

      const [a, b, c] = processProof(proof);
      const publicInputs = processPublicSignals(publicSignals);

      const contract = getContract({
        abi: basicKYCExampleDapp,
        address: "0x70B5fB320b261C2Df354CC25f3Bba33Df41093B9" as Address,
        client: wc.data,
      });
      const gas = await contract.estimateGas.registerKYC(
        [a, b, c, publicInputs],
        { account: address }
      );

      const {
        request: { args, ...options },
      } = await contract.simulate.registerKYC([a, b, c, publicInputs], {
        account: address,
      });

      const txHash = await contract.write.registerKYC(args, options);

      const receipt = await pc.waitForTransactionReceipt({
        hash: txHash,
      });

      return receipt;
    },
    onError: (error) => {
      console.dir(error);

      if (error instanceof TransactionExecutionError) {
        console.dir(error);
      }
      console.error(error);
    },
  });
};

function processPublicSignals(publicSignals: string[]) {
  const formatedInputs = publicSignals.map((value) => BigInt(value));
  return formatedInputs;
}

function processProof(proof: ZkCertProof["proof"]) {
  const piA = [BigInt(proof.pi_a[0]), BigInt(proof.pi_a[1])] as const;
  const piB = [
    [BigInt(proof.pi_b[0][1]), BigInt(proof.pi_b[0][0])],
    [BigInt(proof.pi_b[1][1]), BigInt(proof.pi_b[1][0])],
  ] as const;

  const piC = [BigInt(proof.pi_c[0]), BigInt(proof.pi_c[1])] as const;
  return [piA, piB, piC] as const;
}

async function getExpectedValidationTimestamp(pc: PublicClient) {
  const latestBlock = await pc.getBlock({ blockTag: "latest" });
  const timestamp = latestBlock.timestamp;

  const estimatedProofCreationDuration = 20n;

  const expectedValidationTimestamp =
    timestamp + estimatedProofCreationDuration;

  return Number(expectedValidationTimestamp);
}
