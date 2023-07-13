import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import { invokeSnap } from "./api-sdk";
import { CONTRACTS_ADDRESSES } from "./const";
import { snapsKeys } from "./keys";
import { SbtDetails } from "./types";
import { getExpectedValidationTimestamp } from "./utils";

export const useGenZkRepeatableProofMutation = () => {
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

      const response = await fetch(
        "https://galactica-trusted-setup.s3.eu-central-1.amazonaws.com/zkKYC.json"
      );
      const zkKYCProver = await response.json();

      const zkp: any = await invokeSnap({
        method: "genZkKycProof",
        params: {
          input: proofInput,
          requirements: {
            zkCertStandard: "gip69" as const,
          },
          userAddress: address,
          wasm: (zkKYCProver as any).wasm,
          zkeyHeader: (zkKYCProver as any).zkeyHeader,
          zkeySections: (zkKYCProver as any).zkeySections,
        },
      });

      return zkp;
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
