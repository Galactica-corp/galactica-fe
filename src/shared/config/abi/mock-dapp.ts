export const mockDapp = {
  _format: "hh-sol-artifact-1",
  contractName: "MockDApp",
  sourceName: "contracts/mock/MockDApp.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "contract VerificationSBT",
          name: "_SBT",
          type: "address",
        },
        {
          internalType: "contract IAgeProofZkKYCVerifier",
          name: "_verifierWrapper",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "SBT",
      outputs: [
        {
          internalType: "contract VerificationSBT",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenIndex",
          type: "uint256",
        },
        {
          internalType: "uint256[2]",
          name: "a",
          type: "uint256[2]",
        },
        {
          internalType: "uint256[2][2]",
          name: "b",
          type: "uint256[2][2]",
        },
        {
          internalType: "uint256[2]",
          name: "c",
          type: "uint256[2]",
        },
        {
          internalType: "uint256[]",
          name: "input",
          type: "uint256[]",
        },
      ],
      name: "airdropToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "hasReceivedToken1",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "hasReceivedToken2",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract ERC20",
          name: "_token1",
          type: "address",
        },
      ],
      name: "setToken1",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract ERC20",
          name: "_token2",
          type: "address",
        },
      ],
      name: "setToken2",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token1",
      outputs: [
        {
          internalType: "contract ERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token1AirdropAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token2",
      outputs: [
        {
          internalType: "contract ERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token2AirdropAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "verifierWrapper",
      outputs: [
        {
          internalType: "contract IAgeProofZkKYCVerifier",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  bytecode: "0x",
  deployedBytecode: "0x",
  linkReferences: {},
  deployedLinkReferences: {},
} as const;
