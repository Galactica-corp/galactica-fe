import { BigNumber } from "ethers";
import { useAccount, useMutation, useProvider, useSigner } from "wagmi";
import {
  IGalacticaInstitution__factory,
  RepeatableZKPTest__factory,
} from "shared/contracts";
import { invokeSnap } from "./api-sdk";
import exampleMockDApp from "./provers/exampleMockDApp.json";
import { fromDecToHex } from "./utils";

export const ageProofZkKYCAddress =
  "0x71d80ea7744302E5b1cFD61a7a26153FF221ca9E";
export const mockDApp = "0x9319380E410643A9BC874f8b90C0618f7621eF25";
export const verificationSBT = "0x4E49d2383158568F5d4A30075e63614Dd7459060";
export const galacticaInstitutions = [
  "0x80c8C09868E97CF789e10666Ad10dD96639aCB6e",
  "0x45Da9c7a3B497757DCc07327507029535D9A3097",
  "0xa99fcD678D985fB2ac8aD3fE913aED88705A44fc",
];
export const repeatableZkKYCTest = "0x036B470b19dEA234Bb240Fb8f54a0Cce7160022c";

export const useGenZkProofMutation = () => {
  const provider = useProvider();
  const signerQuery = useSigner();
  const { address } = useAccount();
  return useMutation(async () => {
    if (!signerQuery.data || !provider || !address) return;
    const latestBlock = await provider.getBlock("latest");
    const timestamp = latestBlock.timestamp;
    const estimatedProofCreationDuration = 20;
    const expectedValidationTimestamp =
      timestamp + estimatedProofCreationDuration;

    // const dateNow = new Date(expectedValidationTimestamp * 1000);

    const pubKeysPromises = galacticaInstitutions.map(async (address) => {
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
    });

    const institutionPubKeys = await Promise.all(pubKeysPromises);

    const generalProofInput = {
      currentTime: expectedValidationTimestamp,
      dAppAddress: repeatableZkKYCTest,
      investigationInstitutionPubKey: institutionPubKeys,
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

    console.log({ params: JSON.stringify(params) });

    const zkp: any = await invokeSnap({
      method: "genZkKycProof",
      params: params,
    });

    const [a, b, c] = processProof(zkp.proof);
    const publicInputs = processPublicSignals(zkp.publicSignals);

    const repeatablezkKycContract = RepeatableZKPTest__factory.connect(
      repeatableZkKYCTest,
      provider
    );

    const tx = await repeatablezkKycContract.submitZKP(a, b, c, publicInputs);

    const receipt = await tx.wait();

    return receipt;
  });
};

// this function convert the proof output from snarkjs to parameter format for onchain solidity verifier
export function processProof(proof: any) {
  const piA = proof.pi_a
    .slice(0, 2)
    .map((value: any) => fromDecToHex(value, true));
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
    .map((value: any) => fromDecToHex(value, true));

  console.log(
    `Formated proof: ${JSON.stringify({ a: piA, b: piB, c: piC }, null, 2)}`
  );

  return [piA, piB, piC];
}

function processPublicSignals(publicSignals: any) {
  const formatedInputs = publicSignals.map((value: any) =>
    fromDecToHex(value, true)
  );
  console.log(
    `Formated publicInputs: ${JSON.stringify(formatedInputs, null, 2)}`
  );
  return formatedInputs;
}
