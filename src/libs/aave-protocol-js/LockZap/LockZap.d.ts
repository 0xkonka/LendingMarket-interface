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

export interface LockZapInterface extends utils.Interface {
  functions: {
    'ACCEPTABLE_RATIO()': FunctionFragment;
    'RATIO_DIVISOR()': FunctionFragment;
    'WETH()': FunctionFragment;
    'ethOracle()': FunctionFragment;
    'getPoolHelper()': FunctionFragment;
    'getVDebtToken(address)': FunctionFragment;
    'initialize(address,address,address,address)': FunctionFragment;
    'lendingPool()': FunctionFragment;
    'lpMfd()': FunctionFragment;
    'mfd()': FunctionFragment;
    'owner()': FunctionFragment;
    'paused()': FunctionFragment;
    'poolHelper()': FunctionFragment;
    'priceProvider()': FunctionFragment;
    'quoteFromToken(uint256)': FunctionFragment;
    'rdntAddr()': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'setLpMfd(address)': FunctionFragment;
    'setMfd(address)': FunctionFragment;
    'setPoolHelper(address)': FunctionFragment;
    'setPriceProvider(address)': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'zap(bool,uint256,uint256,uint256)': FunctionFragment;
    'zapFromVesting(bool,uint256)': FunctionFragment;
    'zapWithDefaultDuration(bool,uint256,uint256,address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'ACCEPTABLE_RATIO'
      | 'RATIO_DIVISOR'
      | 'WETH'
      | 'ethOracle'
      | 'getPoolHelper'
      | 'getVDebtToken'
      | 'initialize'
      | 'lendingPool'
      | 'lpMfd'
      | 'mfd'
      | 'owner'
      | 'paused'
      | 'poolHelper'
      | 'priceProvider'
      | 'quoteFromToken'
      | 'rdntAddr'
      | 'renounceOwnership'
      | 'setLpMfd'
      | 'setMfd'
      | 'setPoolHelper'
      | 'setPriceProvider'
      | 'transferOwnership'
      | 'zap'
      | 'zapFromVesting'
      | 'zapWithDefaultDuration'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'ACCEPTABLE_RATIO', values?: undefined): string;
  encodeFunctionData(functionFragment: 'RATIO_DIVISOR', values?: undefined): string;
  encodeFunctionData(functionFragment: 'WETH', values?: undefined): string;
  encodeFunctionData(functionFragment: 'ethOracle', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getPoolHelper', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getVDebtToken', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: 'lendingPool', values?: undefined): string;
  encodeFunctionData(functionFragment: 'lpMfd', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mfd', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'paused', values?: undefined): string;
  encodeFunctionData(functionFragment: 'poolHelper', values?: undefined): string;
  encodeFunctionData(functionFragment: 'priceProvider', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'quoteFromToken',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'rdntAddr', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setLpMfd', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'setMfd', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'setPoolHelper', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'setPriceProvider',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'zap',
    values: [
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'zapFromVesting',
    values: [PromiseOrValue<boolean>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'zapWithDefaultDuration',
    values: [
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(functionFragment: 'ACCEPTABLE_RATIO', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'RATIO_DIVISOR', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'WETH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'ethOracle', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolHelper', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVDebtToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lendingPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lpMfd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mfd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paused', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'poolHelper', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'priceProvider', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteFromToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rdntAddr', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setLpMfd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMfd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPoolHelper', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPriceProvider', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'zap', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'zapFromVesting', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'zapWithDefaultDuration', data: BytesLike): Result;

  events: {
    'OwnershipTransferred(address,address)': EventFragment;
    'Paused(address)': EventFragment;
    'Unpaused(address)': EventFragment;
    'Zapped(bool,uint256,uint256,address,address,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Paused'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Unpaused'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Zapped'): EventFragment;
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

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface ZappedEventObject {
  _borrow: boolean;
  _ethAmt: BigNumber;
  _rdntAmt: BigNumber;
  _from: string;
  _onBehalf: string;
  _lockTypeIndex: BigNumber;
}
export type ZappedEvent = TypedEvent<
  [boolean, BigNumber, BigNumber, string, string, BigNumber],
  ZappedEventObject
>;

export type ZappedEventFilter = TypedEventFilter<ZappedEvent>;

export interface LockZap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LockZapInterface;

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
    ACCEPTABLE_RATIO(overrides?: CallOverrides): Promise<[BigNumber]>;

    RATIO_DIVISOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    WETH(overrides?: CallOverrides): Promise<[string]>;

    ethOracle(overrides?: CallOverrides): Promise<[string]>;

    getPoolHelper(overrides?: CallOverrides): Promise<[string]>;

    getVDebtToken(_asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _poolHelper: PromiseOrValue<string>,
      _lendingPool: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      _rdntAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    lendingPool(overrides?: CallOverrides): Promise<[string]>;

    lpMfd(overrides?: CallOverrides): Promise<[string]>;

    mfd(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    poolHelper(overrides?: CallOverrides): Promise<[string]>;

    priceProvider(overrides?: CallOverrides): Promise<[string]>;

    quoteFromToken(
      _tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { optimalWETHAmount: BigNumber }>;

    rdntAddr(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setLpMfd(
      _lpMfdAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMfd(
      _mfdAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPoolHelper(
      _poolHelper: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPriceProvider(
      _provider: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    zap(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    zapFromVesting(
      _borrow: PromiseOrValue<boolean>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    zapWithDefaultDuration(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _onBehalf: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  ACCEPTABLE_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

  RATIO_DIVISOR(overrides?: CallOverrides): Promise<BigNumber>;

  WETH(overrides?: CallOverrides): Promise<string>;

  ethOracle(overrides?: CallOverrides): Promise<string>;

  getPoolHelper(overrides?: CallOverrides): Promise<string>;

  getVDebtToken(_asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  initialize(
    _poolHelper: PromiseOrValue<string>,
    _lendingPool: PromiseOrValue<string>,
    _weth: PromiseOrValue<string>,
    _rdntAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  lendingPool(overrides?: CallOverrides): Promise<string>;

  lpMfd(overrides?: CallOverrides): Promise<string>;

  mfd(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  poolHelper(overrides?: CallOverrides): Promise<string>;

  priceProvider(overrides?: CallOverrides): Promise<string>;

  quoteFromToken(
    _tokenAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rdntAddr(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setLpMfd(
    _lpMfdAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMfd(
    _mfdAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPoolHelper(
    _poolHelper: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPriceProvider(
    _provider: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  zap(
    _borrow: PromiseOrValue<boolean>,
    _wethAmt: PromiseOrValue<BigNumberish>,
    _rdntAmt: PromiseOrValue<BigNumberish>,
    _lockTypeIndex: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  zapFromVesting(
    _borrow: PromiseOrValue<boolean>,
    _lockTypeIndex: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  zapWithDefaultDuration(
    _borrow: PromiseOrValue<boolean>,
    _wethAmt: PromiseOrValue<BigNumberish>,
    _rdntAmt: PromiseOrValue<BigNumberish>,
    _onBehalf: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    ACCEPTABLE_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    RATIO_DIVISOR(overrides?: CallOverrides): Promise<BigNumber>;

    WETH(overrides?: CallOverrides): Promise<string>;

    ethOracle(overrides?: CallOverrides): Promise<string>;

    getPoolHelper(overrides?: CallOverrides): Promise<string>;

    getVDebtToken(_asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

    initialize(
      _poolHelper: PromiseOrValue<string>,
      _lendingPool: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      _rdntAddr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    lendingPool(overrides?: CallOverrides): Promise<string>;

    lpMfd(overrides?: CallOverrides): Promise<string>;

    mfd(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    poolHelper(overrides?: CallOverrides): Promise<string>;

    priceProvider(overrides?: CallOverrides): Promise<string>;

    quoteFromToken(
      _tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rdntAddr(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setLpMfd(_lpMfdAddr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setMfd(_mfdAddr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setPoolHelper(_poolHelper: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setPriceProvider(_provider: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    zap(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    zapFromVesting(
      _borrow: PromiseOrValue<boolean>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    zapWithDefaultDuration(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _onBehalf: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
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

    'Paused(address)'(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    'Unpaused(address)'(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;

    'Zapped(bool,uint256,uint256,address,address,uint256)'(
      _borrow?: null,
      _ethAmt?: null,
      _rdntAmt?: null,
      _from?: null,
      _onBehalf?: null,
      _lockTypeIndex?: null
    ): ZappedEventFilter;
    Zapped(
      _borrow?: null,
      _ethAmt?: null,
      _rdntAmt?: null,
      _from?: null,
      _onBehalf?: null,
      _lockTypeIndex?: null
    ): ZappedEventFilter;
  };

  estimateGas: {
    ACCEPTABLE_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    RATIO_DIVISOR(overrides?: CallOverrides): Promise<BigNumber>;

    WETH(overrides?: CallOverrides): Promise<BigNumber>;

    ethOracle(overrides?: CallOverrides): Promise<BigNumber>;

    getPoolHelper(overrides?: CallOverrides): Promise<BigNumber>;

    getVDebtToken(_asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _poolHelper: PromiseOrValue<string>,
      _lendingPool: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      _rdntAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    lendingPool(overrides?: CallOverrides): Promise<BigNumber>;

    lpMfd(overrides?: CallOverrides): Promise<BigNumber>;

    mfd(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    poolHelper(overrides?: CallOverrides): Promise<BigNumber>;

    priceProvider(overrides?: CallOverrides): Promise<BigNumber>;

    quoteFromToken(
      _tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rdntAddr(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setLpMfd(
      _lpMfdAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMfd(
      _mfdAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPoolHelper(
      _poolHelper: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPriceProvider(
      _provider: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    zap(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    zapFromVesting(
      _borrow: PromiseOrValue<boolean>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    zapWithDefaultDuration(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _onBehalf: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ACCEPTABLE_RATIO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    RATIO_DIVISOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ethOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPoolHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVDebtToken(
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _poolHelper: PromiseOrValue<string>,
      _lendingPool: PromiseOrValue<string>,
      _weth: PromiseOrValue<string>,
      _rdntAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    lendingPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lpMfd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mfd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolHelper(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    priceProvider(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quoteFromToken(
      _tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rdntAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setLpMfd(
      _lpMfdAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMfd(
      _mfdAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPoolHelper(
      _poolHelper: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPriceProvider(
      _provider: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    zap(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    zapFromVesting(
      _borrow: PromiseOrValue<boolean>,
      _lockTypeIndex: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    zapWithDefaultDuration(
      _borrow: PromiseOrValue<boolean>,
      _wethAmt: PromiseOrValue<BigNumberish>,
      _rdntAmt: PromiseOrValue<BigNumberish>,
      _onBehalf: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
