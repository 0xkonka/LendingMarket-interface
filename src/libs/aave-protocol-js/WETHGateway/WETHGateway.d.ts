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
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../../common';

export interface WETHGatewayInterface extends utils.Interface {
  functions: {
    'authorizeLendingPool(address)': FunctionFragment;
    'borrowETH(address,uint256,uint256,uint16)': FunctionFragment;
    'depositETH(address,address,uint16)': FunctionFragment;
    'depositETHWithAutoDLP(address,address,uint16)': FunctionFragment;
    'emergencyEtherTransfer(address,uint256)': FunctionFragment;
    'emergencyTokenTransfer(address,address,uint256)': FunctionFragment;
    'getWETHAddress()': FunctionFragment;
    'owner()': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'repayETH(address,uint256,uint256,address)': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'withdrawETH(address,uint256,address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'authorizeLendingPool'
      | 'borrowETH'
      | 'depositETH'
      | 'depositETHWithAutoDLP'
      | 'emergencyEtherTransfer'
      | 'emergencyTokenTransfer'
      | 'getWETHAddress'
      | 'owner'
      | 'renounceOwnership'
      | 'repayETH'
      | 'transferOwnership'
      | 'withdrawETH'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'authorizeLendingPool',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'borrowETH',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositETH',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositETHWithAutoDLP',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'emergencyEtherTransfer',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'emergencyTokenTransfer',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'getWETHAddress', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'repayETH',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawETH',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: 'authorizeLendingPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'borrowETH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'depositETH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'depositETHWithAutoDLP', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'emergencyEtherTransfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'emergencyTokenTransfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getWETHAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'repayETH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawETH', data: BytesLike): Result;

  events: {
    'OwnershipTransferred(address,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;

export interface WETHGateway extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WETHGatewayInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    authorizeLendingPool(
      lendingPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    borrowETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      interesRateMode: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositETH(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositETHWithAutoDLP(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    emergencyEtherTransfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    emergencyTokenTransfer(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getWETHAddress(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    repayETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      rateMode: PromiseOrValue<BigNumberish>,
      onBehalfOf: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  authorizeLendingPool(
    lendingPool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  borrowETH(
    lendingPool: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    interesRateMode: PromiseOrValue<BigNumberish>,
    referralCode: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositETH(
    lendingPool: PromiseOrValue<string>,
    onBehalfOf: PromiseOrValue<string>,
    referralCode: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositETHWithAutoDLP(
    lendingPool: PromiseOrValue<string>,
    onBehalfOf: PromiseOrValue<string>,
    referralCode: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  emergencyEtherTransfer(
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  emergencyTokenTransfer(
    token: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getWETHAddress(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  repayETH(
    lendingPool: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    rateMode: PromiseOrValue<BigNumberish>,
    onBehalfOf: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawETH(
    lendingPool: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    authorizeLendingPool(
      lendingPool: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    borrowETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      interesRateMode: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositETH(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositETHWithAutoDLP(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyEtherTransfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyTokenTransfer(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getWETHAddress(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    repayETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      rateMode: PromiseOrValue<BigNumberish>,
      onBehalfOf: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    withdrawETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    'OwnershipTransferred(address,address)'(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    authorizeLendingPool(
      lendingPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    borrowETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      interesRateMode: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositETH(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositETHWithAutoDLP(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    emergencyEtherTransfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    emergencyTokenTransfer(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getWETHAddress(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    repayETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      rateMode: PromiseOrValue<BigNumberish>,
      onBehalfOf: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    authorizeLendingPool(
      lendingPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    borrowETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      interesRateMode: PromiseOrValue<BigNumberish>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositETH(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositETHWithAutoDLP(
      lendingPool: PromiseOrValue<string>,
      onBehalfOf: PromiseOrValue<string>,
      referralCode: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    emergencyEtherTransfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    emergencyTokenTransfer(
      token: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getWETHAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    repayETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      rateMode: PromiseOrValue<BigNumberish>,
      onBehalfOf: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawETH(
      lendingPool: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
