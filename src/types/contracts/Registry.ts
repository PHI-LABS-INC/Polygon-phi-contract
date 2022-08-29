/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
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

export declare namespace Registry {
  export type CouponStruct = { r: BytesLike; s: BytesLike; v: BigNumberish };

  export type CouponStructOutput = [string, string, number] & {
    r: string;
    s: string;
    v: number;
  };
}

export interface RegistryInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "changePhiMapAddress(address)": FunctionFragment;
    "changePhilandOwner(string,(bytes32,bytes32,uint8))": FunctionFragment;
    "claimed()": FunctionFragment;
    "createPhiland(string,(bytes32,bytes32,uint8))": FunctionFragment;
    "getAdminSigner()": FunctionFragment;
    "getPhiMapAddress()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initialize(address,address,address)": FunctionFragment;
    "map()": FunctionFragment;
    "ownerLists(address,string)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setAdminSigner(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "changePhiMapAddress"
      | "changePhilandOwner"
      | "claimed"
      | "createPhiland"
      | "getAdminSigner"
      | "getPhiMapAddress"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "map"
      | "ownerLists"
      | "renounceRole"
      | "revokeRole"
      | "setAdminSigner"
      | "supportsInterface"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "changePhiMapAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "changePhilandOwner",
    values: [string, Registry.CouponStruct]
  ): string;
  encodeFunctionData(functionFragment: "claimed", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "createPhiland",
    values: [string, Registry.CouponStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getAdminSigner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPhiMapAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "map", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerLists",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setAdminSigner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changePhiMapAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changePhilandOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createPhiland",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAdminSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPhiMapAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "map", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerLists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAdminSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "Hello()": EventFragment;
    "Initialized(uint8)": EventFragment;
    "LogChangePhilandAddress(address,address)": EventFragment;
    "LogChangePhilandOwner(address,string)": EventFragment;
    "LogCreatePhiland(address,string)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "SetAdminSigner(address)": EventFragment;
    "SetBaseNode(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Hello"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogChangePhilandAddress"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogChangePhilandOwner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogCreatePhiland"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetAdminSigner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetBaseNode"): EventFragment;
}

export interface HelloEventObject {}
export type HelloEvent = TypedEvent<[], HelloEventObject>;

export type HelloEventFilter = TypedEventFilter<HelloEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface LogChangePhilandAddressEventObject {
  sender: string;
  phiMapAddress: string;
}
export type LogChangePhilandAddressEvent = TypedEvent<
  [string, string],
  LogChangePhilandAddressEventObject
>;

export type LogChangePhilandAddressEventFilter =
  TypedEventFilter<LogChangePhilandAddressEvent>;

export interface LogChangePhilandOwnerEventObject {
  sender: string;
  name: string;
}
export type LogChangePhilandOwnerEvent = TypedEvent<
  [string, string],
  LogChangePhilandOwnerEventObject
>;

export type LogChangePhilandOwnerEventFilter =
  TypedEventFilter<LogChangePhilandOwnerEvent>;

export interface LogCreatePhilandEventObject {
  sender: string;
  name: string;
}
export type LogCreatePhilandEvent = TypedEvent<
  [string, string],
  LogCreatePhilandEventObject
>;

export type LogCreatePhilandEventFilter =
  TypedEventFilter<LogCreatePhilandEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface SetAdminSignerEventObject {
  verifierAddress: string;
}
export type SetAdminSignerEvent = TypedEvent<
  [string],
  SetAdminSignerEventObject
>;

export type SetAdminSignerEventFilter = TypedEventFilter<SetAdminSignerEvent>;

export interface SetBaseNodeEventObject {
  basenode: string;
}
export type SetBaseNodeEvent = TypedEvent<[string], SetBaseNodeEventObject>;

export type SetBaseNodeEventFilter = TypedEventFilter<SetBaseNodeEvent>;

export interface Registry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RegistryInterface;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    changePhiMapAddress(
      phiMapAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changePhilandOwner(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimed(overrides?: CallOverrides): Promise<[BigNumber]>;

    createPhiland(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAdminSigner(overrides?: CallOverrides): Promise<[string]>;

    getPhiMapAddress(overrides?: CallOverrides): Promise<[string]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      admin: string,
      initMap: string,
      initAdminSigner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    map(overrides?: CallOverrides): Promise<[string]>;

    ownerLists(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  changePhiMapAddress(
    phiMapAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changePhilandOwner(
    name: string,
    coupon: Registry.CouponStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimed(overrides?: CallOverrides): Promise<BigNumber>;

  createPhiland(
    name: string,
    coupon: Registry.CouponStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAdminSigner(overrides?: CallOverrides): Promise<string>;

  getPhiMapAddress(overrides?: CallOverrides): Promise<string>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    admin: string,
    initMap: string,
    initAdminSigner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  map(overrides?: CallOverrides): Promise<string>;

  ownerLists(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAdminSigner(
    verifierAdderss: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    changePhiMapAddress(
      phiMapAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    changePhilandOwner(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    claimed(overrides?: CallOverrides): Promise<BigNumber>;

    createPhiland(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    getAdminSigner(overrides?: CallOverrides): Promise<string>;

    getPhiMapAddress(overrides?: CallOverrides): Promise<string>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      admin: string,
      initMap: string,
      initAdminSigner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    map(overrides?: CallOverrides): Promise<string>;

    ownerLists(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Hello()"(): HelloEventFilter;
    Hello(): HelloEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "LogChangePhilandAddress(address,address)"(
      sender?: string | null,
      phiMapAddress?: null
    ): LogChangePhilandAddressEventFilter;
    LogChangePhilandAddress(
      sender?: string | null,
      phiMapAddress?: null
    ): LogChangePhilandAddressEventFilter;

    "LogChangePhilandOwner(address,string)"(
      sender?: string | null,
      name?: null
    ): LogChangePhilandOwnerEventFilter;
    LogChangePhilandOwner(
      sender?: string | null,
      name?: null
    ): LogChangePhilandOwnerEventFilter;

    "LogCreatePhiland(address,string)"(
      sender?: string | null,
      name?: null
    ): LogCreatePhilandEventFilter;
    LogCreatePhiland(
      sender?: string | null,
      name?: null
    ): LogCreatePhilandEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "SetAdminSigner(address)"(
      verifierAddress?: string | null
    ): SetAdminSignerEventFilter;
    SetAdminSigner(verifierAddress?: string | null): SetAdminSignerEventFilter;

    "SetBaseNode(bytes32)"(basenode?: null): SetBaseNodeEventFilter;
    SetBaseNode(basenode?: null): SetBaseNodeEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    changePhiMapAddress(
      phiMapAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changePhilandOwner(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimed(overrides?: CallOverrides): Promise<BigNumber>;

    createPhiland(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAdminSigner(overrides?: CallOverrides): Promise<BigNumber>;

    getPhiMapAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      admin: string,
      initMap: string,
      initAdminSigner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    map(overrides?: CallOverrides): Promise<BigNumber>;

    ownerLists(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changePhiMapAddress(
      phiMapAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changePhilandOwner(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createPhiland(
      name: string,
      coupon: Registry.CouponStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAdminSigner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPhiMapAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      admin: string,
      initMap: string,
      initAdminSigner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    map(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerLists(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAdminSigner(
      verifierAdderss: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}