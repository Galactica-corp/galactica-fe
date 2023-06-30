import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import { IGalacticaInstitution__factory } from "shared/contracts";
import { invokeSnap } from "./api-sdk";
import ageProofZkKYC from "./provers/ageProofZkKYC.json";

export const ageProofZkKYCAddress =
  "0xbc196948e8c1Bc416aEaCf309a63DCEFfdf0cE31";
export const mockDApp = "0xe331bf40260FB9CDA7AdA540DB820A596C47330a";
export const verificationSBT = "0x3A7b8BCe6ecEC1e64294C8d24C3F5b073e111ec4";
export const galacticaInstitution =
  "0x6f318e025977BEb146CBa6376cc642ffe142EB00";

export const useGenZkProofMutation = () => {
  const provider = useProvider();
  const signerQuery = useSigner();
  const { address } = useAccount();
  return useMutation(async () => {
    if (!signerQuery.data || !provider) return;
    const latestBlock = await provider.getBlock("latest");
    const timestamp = latestBlock.timestamp;
    const estimatedProofCreationDuration = 20;
    const expectedValidationTimestamp =
      timestamp + estimatedProofCreationDuration;
    const dateNow = new Date(expectedValidationTimestamp * 1000);

    const GalacticaInstitution = IGalacticaInstitution__factory.connect(
      galacticaInstitution,
      signerQuery.data || provider
    );

    const [pubKey0Bn, pubKey1Bn] = await Promise.all([
      GalacticaInstitution.institutionPubKey(0),
      GalacticaInstitution.institutionPubKey(1),
    ]);

    const pubKey = [pubKey0Bn.toString(), pubKey1Bn.toString()];

    const proofInput = {
      currentTime: expectedValidationTimestamp,
      dAppAddress: "0xc05e8FA7FB5Ff3c8F9fAe95a62c751498EFFF3E7",
      investigationInstitutionPubKey: pubKey,
      // the zkKYC itself is not needed here. It is filled by the snap for user privacy.

      // specific inputs to prove that the holder is at least 18 years old
      currentYear: dateNow.getUTCFullYear().toString(),
      currentMonth: (dateNow.getUTCMonth() + 1).toString(),
      currentDay: dateNow.getUTCDate().toString(),
      ageThreshold: "18",
    };

    console.log("hello");
    const response = await invokeSnap({
      method: "genZkKycProof",
      params: {
        input: proofInput,
        userAddress: address,
        requirements: {
          zkCertStandard: "gip69",
        },
        wasm: (ageProofZkKYC as unknown as { wasm: string }).wasm,
        zkeyHeader: ageProofZkKYC as unknown as { zkeyHeader: unknown },
        zkeySections: (ageProofZkKYC as unknown as { zkeySections: string[] })
          .zkeySections,
      },
    });

    return response;
  });
};
