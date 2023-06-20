/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace IVerificationSBT {
  export type VerificationSBTInfoStruct = {
    dApp: PromiseOrValue<string>;
    verifierWrapper: PromiseOrValue<string>;
    expirationTime: PromiseOrValue<BigNumberish>;
    verifierCodehash: PromiseOrValue<BytesLike>;
    encryptedData: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>];
    userPubKey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>];
    humanID: PromiseOrValue<BytesLike>;
    providerPubKey: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ];
  };

  export type VerificationSBTInfoStructOutput = [
    string,
    string,
    BigNumber,
    string,
    [string, string],
    [BigNumber, BigNumber],
    string,
    [BigNumber, BigNumber]
  ] & {
    dApp: string;
    verifierWrapper: string;
    expirationTime: BigNumber;
    verifierCodehash: string;
    encryptedData: [string, string];
    userPubKey: [BigNumber, BigNumber];
    humanID: string;
    providerPubKey: [BigNumber, BigNumber];
  };
}

export interface IVerificationSBTInterface extends utils.Interface {
  functions: {
    "getHumanID(address,address)": FunctionFragment;
    "getVerificationSBTInfo(address,address)": FunctionFragment;
    "isVerificationSBTValid(address,address)": FunctionFragment;
    "mintVerificationSBT(address,address,uint256,bytes32[2],uint256[2],bytes32,uint256[2])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getHumanID"
      | "getVerificationSBTInfo"
      | "isVerificationSBTValid"
      | "mintVerificationSBT"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getHumanID",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getVerificationSBTInfo",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isVerificationSBTValid",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "mintVerificationSBT",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BytesLike>,
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ]
  ): string;

  decodeFunctionResult(functionFragment: "getHumanID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVerificationSBTInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isVerificationSBTValid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintVerificationSBT",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IVerificationSBT extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IVerificationSBTInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getHumanID(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getVerificationSBTInfo(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[IVerificationSBT.VerificationSBTInfoStructOutput]>;

    isVerificationSBTValid(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mintVerificationSBT(
      user: PromiseOrValue<string>,
      _verifierWrapper: PromiseOrValue<string>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _encryptedData: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _userPubKey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      _humanID: PromiseOrValue<BytesLike>,
      _providerPubKey: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getHumanID(
    user: PromiseOrValue<string>,
    dApp: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getVerificationSBTInfo(
    user: PromiseOrValue<string>,
    dApp: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<IVerificationSBT.VerificationSBTInfoStructOutput>;

  isVerificationSBTValid(
    user: PromiseOrValue<string>,
    dApp: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mintVerificationSBT(
    user: PromiseOrValue<string>,
    _verifierWrapper: PromiseOrValue<string>,
    _expirationTime: PromiseOrValue<BigNumberish>,
    _encryptedData: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
    _userPubKey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    _humanID: PromiseOrValue<BytesLike>,
    _providerPubKey: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getHumanID(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getVerificationSBTInfo(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IVerificationSBT.VerificationSBTInfoStructOutput>;

    isVerificationSBTValid(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mintVerificationSBT(
      user: PromiseOrValue<string>,
      _verifierWrapper: PromiseOrValue<string>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _encryptedData: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _userPubKey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      _humanID: PromiseOrValue<BytesLike>,
      _providerPubKey: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getHumanID(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVerificationSBTInfo(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isVerificationSBTValid(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mintVerificationSBT(
      user: PromiseOrValue<string>,
      _verifierWrapper: PromiseOrValue<string>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _encryptedData: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _userPubKey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      _humanID: PromiseOrValue<BytesLike>,
      _providerPubKey: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getHumanID(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVerificationSBTInfo(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isVerificationSBTValid(
      user: PromiseOrValue<string>,
      dApp: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintVerificationSBT(
      user: PromiseOrValue<string>,
      _verifierWrapper: PromiseOrValue<string>,
      _expirationTime: PromiseOrValue<BigNumberish>,
      _encryptedData: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _userPubKey: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      _humanID: PromiseOrValue<BytesLike>,
      _providerPubKey: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}