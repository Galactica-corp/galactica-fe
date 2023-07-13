import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import { RepeatableZKPTest__factory } from "shared/contracts";
import { invokeSnap } from "./api-sdk";
import { CONTRACTS_ADDRESSES } from "./const";
import { snapsKeys } from "./keys";
import { SbtDetails } from "./types";
import {
  getExpectedValidationTimestamp,
  processProof,
  processPublicSignals,
} from "./utils";

type Options = {
  onDownloadProver?: () => void;

  onGenerateSbt?: () => void;

  onSubmitSbt?: () => void;
};

export const useGenZkRepeatableProofMutation = ({
  onDownloadProver,
  onGenerateSbt,
  onSubmitSbt,
}: Options) => {
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

      onDownloadProver?.();
      const response = await fetch(
        "https://galactica-trusted-setup.s3.eu-central-1.amazonaws.com/zkKYC.json"
      );
      const zkKYCProver = await response.json();

      onGenerateSbt?.();

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
        CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST,
        signerQuery.data
      );

      onSubmitSbt?.();
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
