/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  BasicKYCExampleDApp,
  BasicKYCExampleDAppInterface,
} from "../BasicKYCExampleDApp";

const _abi = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      {
        type: "address",
        name: "_SBT",
        internalType: "contract VerificationSBT",
      },
      {
        type: "address",
        name: "_verifierWrapper",
        internalType: "contract IZkKYCVerifier",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract VerificationSBT",
      },
    ],
    name: "SBT",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "isVerified",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "registerKYC",
    inputs: [
      {
        type: "uint256[2]",
        name: "a",
        internalType: "uint256[2]",
      },
      {
        type: "uint256[2][2]",
        name: "b",
        internalType: "uint256[2][2]",
      },
      {
        type: "uint256[2]",
        name: "c",
        internalType: "uint256[2]",
      },
      {
        type: "uint256[]",
        name: "input",
        internalType: "uint256[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IZkKYCVerifier",
      },
    ],
    name: "verifierWrapper",
    inputs: [],
  },
] as const;

export class BasicKYCExampleDApp__factory {
  static readonly abi = _abi;
  static createInterface(): BasicKYCExampleDAppInterface {
    return new utils.Interface(_abi) as BasicKYCExampleDAppInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BasicKYCExampleDApp {
    return new Contract(address, _abi, signerOrProvider) as BasicKYCExampleDApp;
  }
}
