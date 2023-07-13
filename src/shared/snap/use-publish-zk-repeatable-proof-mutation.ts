import { useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useAccount, useMutation, useSigner } from "wagmi";
import { RepeatableZKPTest__factory } from "shared/contracts";
import { CONTRACTS_ADDRESSES } from "./const";
import { snapsKeys } from "./keys";
import { SbtDetails } from "./types";
import { processProof, processPublicSignals } from "./utils";

export const usePublishZkRepeatableProofMutation = () => {
  const signerQuery = useSigner();
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useMutation(
    async (zkp: any) => {
      invariant(signerQuery.data);
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
