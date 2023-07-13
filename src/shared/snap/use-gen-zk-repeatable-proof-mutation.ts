import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import { RepeatableZKPTest__factory } from "shared/contracts";
import { invokeSnap } from "./api-sdk";
import { snapsKeys } from "./keys";
import { SbtDetails } from "./types";
import {
  getExpectedValidationTimestamp,
  processProof,
  processPublicSignals,
} from "./utils";

export const repeatableZkKYCTest = "0x57ebf246fC38c59f48CE316381eEFF883C006Fa1";

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
        dAppAddress: repeatableZkKYCTest,
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

      const [a, b, c] = processProof(zkp.proof);
      const publicInputs = processPublicSignals(zkp.publicSignals);

      const repeatableZKPTestSC = RepeatableZKPTest__factory.connect(
        repeatableZkKYCTest,
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
