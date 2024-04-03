import { sdkConfig } from "@galactica-net/snap-api";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import { useChain } from "shared/config/hooks";
import { BasicKYCExampleDApp__factory } from "shared/contracts";
import { invokeSnap } from "./api-sdk";
import { snapsKeys } from "./keys";
import { type SbtDetails } from "./types";
import {
  getExpectedValidationTimestamp,
  processProof,
  processPublicSignals,
} from "./utils";

type Options = {
  onPublish?: () => void;
};

export const useGenBasicProofMutation = ({ onPublish }: Options = {}) => {
  const chain = useChain();
  const contracts = sdkConfig.contracts[chain.id];
  const signerQuery = useSigner();
  const provider = useProvider();
  const { address } = useAccount();

  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      if (!provider || !address || !signerQuery.data) return;
      const expectedValidationTimestamp = await getExpectedValidationTimestamp(
        provider
      );

      const proofInput = {
        currentTime: expectedValidationTimestamp,
        dAppAddress: contracts.exampleDapp,
        investigationInstitutionPubKey: [],
      };

      const response = await fetch(import.meta.env.VITE_PROOF_FILE);
      const zkKYCProver = await response.json();

      const zkp: any = await invokeSnap({
        method: "genZkKycProof",
        params: {
          input: proofInput,
          requirements: {
            zkCertStandard: "gip69" as const,
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
        },
      });

      onPublish?.();
      const [a, b, c] = processProof(zkp.proof);
      const publicInputs = processPublicSignals(zkp.publicSignals);

      const basicKycExampleDAppSC = BasicKYCExampleDApp__factory.connect(
        contracts.exampleDapp,
        signerQuery.data
      );

      const tx = await basicKycExampleDAppSC.registerKYC(a, b, c, publicInputs);

      const receipt = await tx.wait();

      return receipt;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries<SbtDetails>(
          snapsKeys.allSbtByUser({
            userAddress: address,
          })
        );
      },
    }
  );
};
