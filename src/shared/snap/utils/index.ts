import { ZkCertProof } from "@galactica-net/snap-api";
import { default as BigNumber } from "bignumber.js";
import { Address, PublicClient } from "viem";

export function fromHexToDec(hexIn: string): string {
  if (hexIn.startsWith("0x")) {
    return new BigNumber(hexIn.slice(2).toUpperCase(), 16).toString(10);
  }
  return new BigNumber(hexIn, 16).toString(10);
}

export function fromDecToHex(dec: string, withPrefix = false): string {
  if (withPrefix) {
    return `0x${new BigNumber(dec, 10).toString(16)}`;
  }
  return new BigNumber(dec, 10).toString(16);
}

export const getExpectedValidationTimestamp = async (pc: PublicClient) => {
  const latestBlock = await pc.getBlock({ blockTag: "latest" });
  const timestamp = latestBlock.timestamp;
  const estimatedProofCreationDuration = 20n;
  const expectedValidationTimestamp =
    timestamp + estimatedProofCreationDuration;

  return Number(expectedValidationTimestamp);
};

// this function convert the proof output from snarkjs to parameter format for onchain solidity verifier
export const processProof = (proof: ZkCertProof["proof"]) => {
  const piA = proof.pi_a
    .slice(0, 2)
    .map((value: string) => fromDecToHex(value, true) as Address);
  // for some reason the order of coordinate is reverse
  const piB = [
    [proof.pi_b[0][1], proof.pi_b[0][0]].map(
      (value) => fromDecToHex(value, true) as Address
    ),
    [proof.pi_b[1][1], proof.pi_b[1][0]].map(
      (value) => fromDecToHex(value, true) as Address
    ),
  ];

  const piC = proof.pi_c
    .slice(0, 2)
    .map((value: string) => fromDecToHex(value, true) as Address);

  return [piA, piB, piC];
};

export const processPublicSignals = (publicSignals: string[]) => {
  const formatedInputs = publicSignals.map((value) =>
    fromDecToHex(value, true)
  );
  return formatedInputs;
};
