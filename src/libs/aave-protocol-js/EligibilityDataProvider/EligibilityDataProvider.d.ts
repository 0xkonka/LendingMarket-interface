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

export interface EligibilityDataProviderInterface extends utils.Interface {
  functions: {
    'RATIO_DIVISOR()': FunctionFragment;
    'chef()': FunctionFragment;
    'disqualifiedTime(address)': FunctionFragment;
    'getDqTime(address)': FunctionFragment;
    'isEligibleForRewards(address)': FunctionFragment;
    'isMarketDisqualified(address)': FunctionFragment;
    'lastEligibleStatus(address)': FunctionFragment;
    'lastEligibleTime(address)': FunctionFragment;
    'lendingPool()': FunctionFragment;
    'lockedUsdValue(address)': FunctionFragment;
    'lpToken()': FunctionFragment;
    'middleFeeDistribution()': FunctionFragment;
    'owner()': FunctionFragment;
    'priceProvider()': FunctionFragment;
    'refresh(address)': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'requiredDepositRatio()': FunctionFragment;
    'requiredUsdValue(address)': FunctionFragment;
    'setChefIncentivesController(address)': FunctionFragment;
    'setDqTime(address,uint256)': FunctionFragment;
    'setLPToken(address)': FunctionFragment;
    'setRequiredDepositRatio(uint256)': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'updatePrice()': FunctionFragment;
    'userDeposits(address,address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'RATIO_DIVISOR'
      | 'chef'
      | 'disqualifiedTime'
      | 'getDqTime'
      | 'isEligibleForRewards'
      | 'isMarketDisqualified'
      | 'lastEligibleStatus'
      | 'lastEligibleTime'
      | 'lendingPool'
      | 'lockedUsdValue'
      | 'lpToken'
      | 'middleFeeDistribution'
      | 'owner'
      | 'priceProvider'
      | 'refresh'
      | 'renounceOwnership'
      | 'requiredDepositRatio'
      | 'requiredUsdValue'
      | 'setChefIncentivesController'
      | 'setDqTime'
      | 'setLPToken'
      | 'setRequiredDepositRatio'
      | 'transferOwnership'
      | 'updatePrice'
      | 'userDeposits'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'RATIO_DIVISOR', values?: undefined): string;
  encodeFunctionData(functionFragment: 'chef', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'disqualifiedTime',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'getDqTime', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'isEligibleForRewards',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'isMarketDisqualified',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'lastEligibleStatus',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'lastEligibleTime',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'lendingPool', values?: undefined): string;
  encodeFunctionData(functionFragment: 'lockedUsdValue', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'lpToken', values?: undefined): string;
  encodeFunctionData(functionFragment: 'middleFeeDistribution', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'priceProvider', values?: undefined): string;
  encodeFunctionData(functionFragment: 'refresh', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'requiredDepositRatio', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'requiredUsdValue',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setChefIncentivesController',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setDqTime',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'setLPToken', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'setRequiredDepositRatio',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'updatePrice', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'userDeposits',
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: 'RATIO_DIVISOR', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'chef', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'disqualifiedTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDqTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isEligibleForRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isMarketDisqualified', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lastEligibleStatus', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lastEligibleTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lendingPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lockedUsdValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lpToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'middleFeeDistribution', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'priceProvider', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'refresh', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'requiredDepositRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'requiredUsdValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setChefIncentivesController', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDqTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setLPToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setRequiredDepositRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updatePrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'userDeposits', data: BytesLike): Result;

  events: {
    'AddToken(address)': EventFragment;
    'ChefIncentivesControllerUpdated(address)': EventFragment;
    'DqTimeUpdated(address,uint256)': EventFragment;
    'LPTokenUpdated(address)': EventFragment;
    'OwnershipTransferred(address,address)': EventFragment;
    'RequiredDepositRatioUpdated(uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'AddToken'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ChefIncentivesControllerUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DqTimeUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'LPTokenUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RequiredDepositRatioUpdated'): EventFragment;
}

export interface AddTokenEventObject {
  token: string;
}
export type AddTokenEvent = TypedEvent<[string], AddTokenEventObject>;

export type AddTokenEventFilter = TypedEventFilter<AddTokenEvent>;

export interface ChefIncentivesControllerUpdatedEventObject {
  _chef: string;
}
export type ChefIncentivesControllerUpdatedEvent = TypedEvent<
  [string],
  ChefIncentivesControllerUpdatedEventObject
>;

export type ChefIncentivesControllerUpdatedEventFilter =
  TypedEventFilter<ChefIncentivesControllerUpdatedEvent>;

export interface DqTimeUpdatedEventObject {
  _user: string;
  _time: BigNumber;
}
export type DqTimeUpdatedEvent = TypedEvent<[string, BigNumber], DqTimeUpdatedEventObject>;

export type DqTimeUpdatedEventFilter = TypedEventFilter<DqTimeUpdatedEvent>;

export interface LPTokenUpdatedEventObject {
  _lpToken: string;
}
export type LPTokenUpdatedEvent = TypedEvent<[string], LPTokenUpdatedEventObject>;

export type LPTokenUpdatedEventFilter = TypedEventFilter<LPTokenUpdatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;

export interface RequiredDepositRatioUpdatedEventObject {
  requiredDepositRatio: BigNumber;
}
export type RequiredDepositRatioUpdatedEvent = TypedEvent<
  [BigNumber],
  RequiredDepositRatioUpdatedEventObject
>;

export type RequiredDepositRatioUpdatedEventFilter =
  TypedEventFilter<RequiredDepositRatioUpdatedEvent>;

export interface EligibilityDataProvider extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EligibilityDataProviderInterface;

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
    RATIO_DIVISOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    chef(overrides?: CallOverrides): Promise<[string]>;

    disqualifiedTime(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    getDqTime(_user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    isEligibleForRewards(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { isEligible: boolean }>;

    isMarketDisqualified(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    lastEligibleStatus(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    lastEligibleTime(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { lastEligibleTimestamp: BigNumber }>;

    lendingPool(overrides?: CallOverrides): Promise<[string]>;

    lockedUsdValue(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    lpToken(overrides?: CallOverrides): Promise<[string]>;

    middleFeeDistribution(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    priceProvider(overrides?: CallOverrides): Promise<[string]>;

    refresh(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requiredDepositRatio(overrides?: CallOverrides): Promise<[BigNumber]>;

    requiredUsdValue(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { required: BigNumber }>;

    setChefIncentivesController(
      _chef: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDqTime(
      _user: PromiseOrValue<string>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setLPToken(
      _lpToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRequiredDepositRatio(
      _requiredDepositRatio: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updatePrice(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    userDeposits(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  RATIO_DIVISOR(overrides?: CallOverrides): Promise<BigNumber>;

  chef(overrides?: CallOverrides): Promise<string>;

  disqualifiedTime(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  getDqTime(_user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  isEligibleForRewards(_user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  isMarketDisqualified(_user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  lastEligibleStatus(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  lastEligibleTime(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  lendingPool(overrides?: CallOverrides): Promise<string>;

  lockedUsdValue(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  lpToken(overrides?: CallOverrides): Promise<string>;

  middleFeeDistribution(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  priceProvider(overrides?: CallOverrides): Promise<string>;

  refresh(
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requiredDepositRatio(overrides?: CallOverrides): Promise<BigNumber>;

  requiredUsdValue(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  setChefIncentivesController(
    _chef: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDqTime(
    _user: PromiseOrValue<string>,
    _time: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setLPToken(
    _lpToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRequiredDepositRatio(
    _requiredDepositRatio: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updatePrice(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  userDeposits(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    RATIO_DIVISOR(overrides?: CallOverrides): Promise<BigNumber>;

    chef(overrides?: CallOverrides): Promise<string>;

    disqualifiedTime(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getDqTime(_user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    isEligibleForRewards(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isMarketDisqualified(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    lastEligibleStatus(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    lastEligibleTime(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    lendingPool(overrides?: CallOverrides): Promise<string>;

    lockedUsdValue(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    lpToken(overrides?: CallOverrides): Promise<string>;

    middleFeeDistribution(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    priceProvider(overrides?: CallOverrides): Promise<string>;

    refresh(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    requiredDepositRatio(overrides?: CallOverrides): Promise<BigNumber>;

    requiredUsdValue(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    setChefIncentivesController(
      _chef: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setDqTime(
      _user: PromiseOrValue<string>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setLPToken(_lpToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setRequiredDepositRatio(
      _requiredDepositRatio: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    updatePrice(overrides?: CallOverrides): Promise<void>;

    userDeposits(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    'AddToken(address)'(token?: PromiseOrValue<string> | null): AddTokenEventFilter;
    AddToken(token?: PromiseOrValue<string> | null): AddTokenEventFilter;

    'ChefIncentivesControllerUpdated(address)'(
      _chef?: null
    ): ChefIncentivesControllerUpdatedEventFilter;
    ChefIncentivesControllerUpdated(_chef?: null): ChefIncentivesControllerUpdatedEventFilter;

    'DqTimeUpdated(address,uint256)'(_user?: null, _time?: null): DqTimeUpdatedEventFilter;
    DqTimeUpdated(_user?: null, _time?: null): DqTimeUpdatedEventFilter;

    'LPTokenUpdated(address)'(_lpToken?: null): LPTokenUpdatedEventFilter;
    LPTokenUpdated(_lpToken?: null): LPTokenUpdatedEventFilter;

    'OwnershipTransferred(address,address)'(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    'RequiredDepositRatioUpdated(uint256)'(
      requiredDepositRatio?: null
    ): RequiredDepositRatioUpdatedEventFilter;
    RequiredDepositRatioUpdated(
      requiredDepositRatio?: null
    ): RequiredDepositRatioUpdatedEventFilter;
  };

  estimateGas: {
    RATIO_DIVISOR(overrides?: CallOverrides): Promise<BigNumber>;

    chef(overrides?: CallOverrides): Promise<BigNumber>;

    disqualifiedTime(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getDqTime(_user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    isEligibleForRewards(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMarketDisqualified(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastEligibleStatus(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    lastEligibleTime(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    lendingPool(overrides?: CallOverrides): Promise<BigNumber>;

    lockedUsdValue(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    lpToken(overrides?: CallOverrides): Promise<BigNumber>;

    middleFeeDistribution(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    priceProvider(overrides?: CallOverrides): Promise<BigNumber>;

    refresh(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requiredDepositRatio(overrides?: CallOverrides): Promise<BigNumber>;

    requiredUsdValue(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    setChefIncentivesController(
      _chef: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDqTime(
      _user: PromiseOrValue<string>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setLPToken(
      _lpToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRequiredDepositRatio(
      _requiredDepositRatio: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updatePrice(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    userDeposits(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    RATIO_DIVISOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    chef(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    disqualifiedTime(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDqTime(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isEligibleForRewards(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMarketDisqualified(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastEligibleStatus(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastEligibleTime(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lendingPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lockedUsdValue(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lpToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    middleFeeDistribution(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    priceProvider(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    refresh(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requiredDepositRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    requiredUsdValue(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setChefIncentivesController(
      _chef: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDqTime(
      _user: PromiseOrValue<string>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setLPToken(
      _lpToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRequiredDepositRatio(
      _requiredDepositRatio: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updatePrice(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    userDeposits(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
