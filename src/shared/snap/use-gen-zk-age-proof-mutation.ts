import { BigNumber } from "ethers";
import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import { CONTRACTS_ADDRESSES } from "shared/config/const";
import {
  IGalacticaInstitution__factory,
  MockDApp__factory,
} from "shared/contracts";
import { invokeSnap } from "./api-sdk";
import exampleMockDApp from "./provers/exampleMockDApp.json";
import {
  getExpectedValidationTimestamp,
  processProof,
  processPublicSignals,
} from "./utils";

export const useGenZkAgeProofMutation = () => {
  const provider = useProvider();
  const signerQuery = useSigner();
  const { address } = useAccount();
  return useMutation(async () => {
    if (!signerQuery.data || !provider || !address) return;
    const expectedValidationTimestamp = await getExpectedValidationTimestamp(
      provider
    );

    const dateNow = new Date(expectedValidationTimestamp * 1000);

    const pubKeysPromises = CONTRACTS_ADDRESSES.EXAMPLE_INSTITUTIONS.map(
      async (address) => {
        const institutionContract = IGalacticaInstitution__factory.connect(
          address,
          signerQuery.data || provider
        );
        return [
          BigNumber.from(
            await institutionContract.institutionPubKey(0)
          ).toString(),
          BigNumber.from(
            await institutionContract.institutionPubKey(1)
          ).toString(),
        ] as const;
      }
    );

    const institutionPubKeys = await Promise.all(pubKeysPromises);

    const generalProofInput = {
      currentTime: expectedValidationTimestamp,
      dAppAddress: CONTRACTS_ADDRESSES.EXAMPLE_DAPP,
      investigationInstitutionPubKey: institutionPubKeys,
      currentYear: dateNow.getUTCFullYear().toString(),
      currentMonth: (dateNow.getUTCMonth() + 1).toString(),
      currentDay: dateNow.getUTCDate().toString(),
      ageThreshold: "18",
    };

    const params = {
      input: generalProofInput,
      requirements: {
        zkCertStandard: "gip69" as const,
      },
      userAddress: address,
      wasm: (exampleMockDApp as any).wasm,
      zkeyHeader: (exampleMockDApp as any).zkeyHeader,
      zkeySections: (exampleMockDApp as any).zkeySections,
    };

    const zkp: any = await invokeSnap({
      method: "genZkKycProof",
      params: params,
    });

    const [a, b, c] = processProof(zkp.proof);
    const publicInputs = processPublicSignals(zkp.publicSignals);

    const dappContract = MockDApp__factory.connect(
      CONTRACTS_ADDRESSES.EXAMPLE_DAPP,
      signerQuery.data
    );

    const tx = await dappContract.airdropToken(1, a, b, c, publicInputs);

    const receipt = await tx.wait();

    return receipt;
  });
};
