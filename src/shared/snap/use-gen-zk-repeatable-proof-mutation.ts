import { GenZkProofParams } from "@galactica-net/snap-api";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import { CONTRACTS_ADDRESSES } from "shared/config/const";
import { RepeatableZKPTest__factory } from "shared/contracts";
import { invokeSnap } from "./api-sdk";
import { snapsKeys } from "./keys";
import { SbtDetails } from "./types";
import {
  getExpectedValidationTimestamp,
  processProof,
  processPublicSignals,
} from "./utils";
import zkKYCProver from "./zkKYC.json";

type Options = {
  onPublish?: () => void;
};

export const useGenZkRepeatableProofMutation = ({
  onPublish,
}: Options = {}) => {
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
        dAppAddress: CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST,
        investigationInstitutionPubKey: [],
      };

      const zkp: any = await invokeSnap({
        method: "genZkKycProof",
        params: {
          input: proofInput,
          requirements: {
            zkCertStandard: "gip69" as const,
            registryAddress: CONTRACTS_ADDRESSES.ZK_KYC_REGISTRY,
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
          prover: {
            wasm: (zkKYCProver as any).wasm,
            zkeyHeader: (zkKYCProver as any).zkeyHeader,
            zkeySections: (zkKYCProver as any).zkeySections,
          },
        } as GenZkProofParams<any>,
      });

      onPublish?.();
      const [a, b, c] = processProof(zkp.proof);
      const publicInputs = processPublicSignals(zkp.publicSignals);

      const repeatableZKPTestSC = RepeatableZKPTest__factory.connect(
        CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST,
        signerQuery.data
      );

      const tx = await repeatableZKPTestSC.submitZKP(a, b, c, publicInputs);

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
