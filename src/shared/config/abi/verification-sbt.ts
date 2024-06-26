export const verificationSBT = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dApp",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "humanID",
        type: "bytes32",
      },
    ],
    name: "VerificationSBTMinted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "VerificationSBTMapping",
    outputs: [
      {
        internalType: "address",
        name: "dApp",
        type: "address",
      },
      {
        internalType: "contract IVerifierWrapper",
        name: "verifierWrapper",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "verifierCodehash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "humanID",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deploymentBlock",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "dApp",
        type: "address",
      },
    ],
    name: "getHumanID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "dApp",
        type: "address",
      },
    ],
    name: "getVerificationSBTInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "dApp",
            type: "address",
          },
          {
            internalType: "contract IVerifierWrapper",
            name: "verifierWrapper",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "expirationTime",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "verifierCodehash",
            type: "bytes32",
          },
          {
            internalType: "bytes32[]",
            name: "encryptedData",
            type: "bytes32[]",
          },
          {
            internalType: "uint256[2]",
            name: "userPubKey",
            type: "uint256[2]",
          },
          {
            internalType: "bytes32",
            name: "humanID",
            type: "bytes32",
          },
          {
            internalType: "uint256[2]",
            name: "providerPubKey",
            type: "uint256[2]",
          },
        ],
        internalType: "struct IVerificationSBT.VerificationSBTInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "dApp",
        type: "address",
      },
    ],
    name: "isVerificationSBTValid",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "contract IVerifierWrapper",
        name: "_verifierWrapper",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expirationTime",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "_encryptedData",
        type: "bytes32[]",
      },
      {
        internalType: "uint256[2]",
        name: "_userPubKey",
        type: "uint256[2]",
      },
      {
        internalType: "bytes32",
        name: "_humanID",
        type: "bytes32",
      },
      {
        internalType: "uint256[2]",
        name: "_providerPubKey",
        type: "uint256[2]",
      },
    ],
    name: "mintVerificationSBT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
