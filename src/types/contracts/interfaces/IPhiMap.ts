/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
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

export declare namespace IPhiMap {
  export type ObjectStruct = {
    contractAddress: string;
    tokenId: BigNumberish;
    xStart: BigNumberish;
    yStart: BigNumberish;
  };

  export type ObjectStructOutput = [string, BigNumber, number, number] & {
    contractAddress: string;
    tokenId: BigNumber;
    xStart: number;
    yStart: number;
  };

  export type LinkStruct = { title: string; url: string };

  export type LinkStructOutput = [string, string] & {
    title: string;
    url: string;
  };
}

export interface IPhiMapInterface extends utils.Interface {
  functions: {
    "batchDepositObject(string,address[],uint256[],uint256[])": FunctionFragment;
    "batchDepositObjectFromShop(string,address,address[],uint256[],uint256[])": FunctionFragment;
    "batchWithdrawObject(string,address[],uint256[],uint256[])": FunctionFragment;
    "changePhilandOwner(string,address)": FunctionFragment;
    "create(string,address)": FunctionFragment;
    "mapInitialization(string)": FunctionFragment;
    "ownerOfPhiland(string)": FunctionFragment;
    "save(string,uint256[],(address,uint256,uint8,uint8)[],(string,string)[],address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "batchDepositObject"
      | "batchDepositObjectFromShop"
      | "batchWithdrawObject"
      | "changePhilandOwner"
      | "create"
      | "mapInitialization"
      | "ownerOfPhiland"
      | "save"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "batchDepositObject",
    values: [string, string[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "batchDepositObjectFromShop",
    values: [string, string, string[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "batchWithdrawObject",
    values: [string, string[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "changePhilandOwner",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mapInitialization",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOfPhiland",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "save",
    values: [
      string,
      BigNumberish[],
      IPhiMap.ObjectStruct[],
      IPhiMap.LinkStruct[],
      string,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "batchDepositObject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchDepositObjectFromShop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchWithdrawObject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changePhilandOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mapInitialization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownerOfPhiland",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "save", data: BytesLike): Result;

  events: {};
}

export interface IPhiMap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPhiMapInterface;

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
    batchDepositObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    batchDepositObjectFromShop(
      name: string,
      msgSender: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    batchWithdrawObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changePhilandOwner(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    create(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mapInitialization(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownerOfPhiland(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    save(
      name: string,
      removeIndexArray: BigNumberish[],
      objectDatas: IPhiMap.ObjectStruct[],
      links: IPhiMap.LinkStruct[],
      wcontractAddress: string,
      wtokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  batchDepositObject(
    name: string,
    contractAddresses: string[],
    tokenIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  batchDepositObjectFromShop(
    name: string,
    msgSender: string,
    contractAddresses: string[],
    tokenIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  batchWithdrawObject(
    name: string,
    contractAddresses: string[],
    tokenIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changePhilandOwner(
    name: string,
    caller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  create(
    name: string,
    caller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mapInitialization(
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownerOfPhiland(
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  save(
    name: string,
    removeIndexArray: BigNumberish[],
    objectDatas: IPhiMap.ObjectStruct[],
    links: IPhiMap.LinkStruct[],
    wcontractAddress: string,
    wtokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    batchDepositObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    batchDepositObjectFromShop(
      name: string,
      msgSender: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    batchWithdrawObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    changePhilandOwner(
      name: string,
      caller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    create(
      name: string,
      caller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    mapInitialization(name: string, overrides?: CallOverrides): Promise<void>;

    ownerOfPhiland(name: string, overrides?: CallOverrides): Promise<string>;

    save(
      name: string,
      removeIndexArray: BigNumberish[],
      objectDatas: IPhiMap.ObjectStruct[],
      links: IPhiMap.LinkStruct[],
      wcontractAddress: string,
      wtokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    batchDepositObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    batchDepositObjectFromShop(
      name: string,
      msgSender: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    batchWithdrawObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changePhilandOwner(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    create(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mapInitialization(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownerOfPhiland(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    save(
      name: string,
      removeIndexArray: BigNumberish[],
      objectDatas: IPhiMap.ObjectStruct[],
      links: IPhiMap.LinkStruct[],
      wcontractAddress: string,
      wtokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    batchDepositObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    batchDepositObjectFromShop(
      name: string,
      msgSender: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    batchWithdrawObject(
      name: string,
      contractAddresses: string[],
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changePhilandOwner(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    create(
      name: string,
      caller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mapInitialization(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownerOfPhiland(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    save(
      name: string,
      removeIndexArray: BigNumberish[],
      objectDatas: IPhiMap.ObjectStruct[],
      links: IPhiMap.LinkStruct[],
      wcontractAddress: string,
      wtokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
