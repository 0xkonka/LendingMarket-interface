/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export interface PriceProviderInterface extends utils.Interface {
  functions: {
    'baseTokenPriceInUsdProxyAggregator()': FunctionFragment;
    'decimals()': FunctionFragment;
    'eligibilityProvider()': FunctionFragment;
    'getLpTokenAddress()': FunctionFragment;
    'getLpTokenPrice()': FunctionFragment;
    'getLpTokenPriceUsd()': FunctionFragment;
    'getTokenPrice()': FunctionFragment;
    'getTokenPriceUsd()': FunctionFragment;
    'initialize(address,address,address)': FunctionFragment;
    'oracle()': FunctionFragment;
    'owner()': FunctionFragment;
    'poolHelper()': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'setRewardEligibilityProvider(address)': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'update()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'baseTokenPriceInUsdProxyAggregator'
      | 'decimals'
      | 'eligibilityProvider'
      | 'getLpTokenAddress'
      | 'getLpTokenPrice'
      | 'getLpTokenPriceUsd'
      | 'getTokenPrice'
      | 'getTokenPriceUsd'
      | 'initialize'
      | 'oracle'
      | 'owner'
      | 'poolHelper'
      | 'renounceOwnership'
      | 'setRewardEligibilityProvider'
      | 'transferOwnership'
      | 'update'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'baseTokenPriceInUsdProxyAggregator',
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string;
  encodeFunctionData(functionFragment: 'eligibilityProvider', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getLpTokenAddress', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getLpTokenPrice', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getLpTokenPriceUsd', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTokenPrice', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getTokenPriceUsd', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'oracle', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'poolHelper', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setRewardEligibilityProvider',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'update', values?: undefined): string;

  decodeFunctionResult(
    functionFragment: 'baseTokenPriceInUsdProxyAggregator',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'eligibilityProvider', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLpTokenAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLpTokenPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLpTokenPriceUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTokenPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTokenPriceUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'oracle', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'poolHelper', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setRewardEligibilityProvider', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'update', data: BytesLike): Result;

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

export interface PriceProvider extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PriceProviderInterface;

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
    baseTokenPriceInUsdProxyAggregator(overrides?: CallOverrides): Promise<[string]>;

    decimals(overrides?: CallOverrides): Promise<[BigNumber]>;

    eligibilityProvider(overrides?: CallOverrides): Promise<[string]>;

    getLpTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    getLpTokenPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getLpTokenPriceUsd(overrides?: CallOverrides): Promise<[BigNumber] & { price: BigNumber }>;

    getTokenPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTokenPriceUsd(overrides?: CallOverrides): Promise<[BigNumber]>;

    initialize(
      _baseTokenPriceInUsdProxyAggregator: PromiseOrValue<string>,
      _poolHelper: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    oracle(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    poolHelper(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRewardEligibilityProvider(
      _eligibilityProvider: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    update(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;
  };

  baseTokenPriceInUsdProxyAggregator(overrides?: CallOverrides): Promise<string>;

  decimals(overrides?: CallOverrides): Promise<BigNumber>;

  eligibilityProvider(overrides?: CallOverrides): Promise<string>;

  getLpTokenAddress(overrides?: CallOverrides): Promise<string>;

  getLpTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

  getLpTokenPriceUsd(overrides?: CallOverrides): Promise<BigNumber>;

  getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

  getTokenPriceUsd(overrides?: CallOverrides): Promise<BigNumber>;

  initialize(
    _baseTokenPriceInUsdProxyAggregator: PromiseOrValue<string>,
    _poolHelper: PromiseOrValue<string>,
    _oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  oracle(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  poolHelper(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRewardEligibilityProvider(
    _eligibilityProvider: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  update(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  callStatic: {
    baseTokenPriceInUsdProxyAggregator(overrides?: CallOverrides): Promise<string>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    eligibilityProvider(overrides?: CallOverrides): Promise<string>;

    getLpTokenAddress(overrides?: CallOverrides): Promise<string>;

    getLpTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getLpTokenPriceUsd(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenPriceUsd(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _baseTokenPriceInUsdProxyAggregator: PromiseOrValue<string>,
      _poolHelper: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    oracle(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    poolHelper(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setRewardEligibilityProvider(
      _eligibilityProvider: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    update(overrides?: CallOverrides): Promise<void>;
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
    baseTokenPriceInUsdProxyAggregator(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    eligibilityProvider(overrides?: CallOverrides): Promise<BigNumber>;

    getLpTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getLpTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getLpTokenPriceUsd(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenPriceUsd(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _baseTokenPriceInUsdProxyAggregator: PromiseOrValue<string>,
      _poolHelper: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    poolHelper(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRewardEligibilityProvider(
      _eligibilityProvider: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    update(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    baseTokenPriceInUsdProxyAggregator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    eligibilityProvider(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLpTokenAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLpTokenPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLpTokenPriceUsd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenPriceUsd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _baseTokenPriceInUsdProxyAggregator: PromiseOrValue<string>,
      _poolHelper: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRewardEligibilityProvider(
      _eligibilityProvider: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    update(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
