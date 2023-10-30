/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import type { TypedEventFilter, TypedEvent, TypedListener } from './common';

interface MasterChefInterface extends ethers.utils.Interface {
  functions: {
    'addPool(address,uint256)': FunctionFragment;
    'batchUpdateAllocPoint(address[],uint256[])': FunctionFragment;
    'claim(address,address[])': FunctionFragment;
    'claimReceiver(address)': FunctionFragment;
    'claimableReward(address,address[])': FunctionFragment;
    'deposit(address,uint256)': FunctionFragment;
    'emergencyWithdraw(address)': FunctionFragment;
    'emissionSchedule(uint256)': FunctionFragment;
    'maxMintableTokens()': FunctionFragment;
    'mintedTokens()': FunctionFragment;
    'owner()': FunctionFragment;
    'poolConfigurator()': FunctionFragment;
    'poolInfo(address)': FunctionFragment;
    'poolLength()': FunctionFragment;
    'registeredTokens(uint256)': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'rewardMinter()': FunctionFragment;
    'rewardsPerSecond()': FunctionFragment;
    'setClaimReceiver(address,address)': FunctionFragment;
    'setOnwardIncentives(address,address)': FunctionFragment;
    'start()': FunctionFragment;
    'startTime()': FunctionFragment;
    'totalAllocPoint()': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'userBaseClaimable(address)': FunctionFragment;
    'userInfo(address,address)': FunctionFragment;
    'withdraw(address,uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'addPool', values: [string, BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'batchUpdateAllocPoint',
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: 'claim', values: [string, string[]]): string;
  encodeFunctionData(functionFragment: 'claimReceiver', values: [string]): string;
  encodeFunctionData(functionFragment: 'claimableReward', values: [string, string[]]): string;
  encodeFunctionData(functionFragment: 'deposit', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'emergencyWithdraw', values: [string]): string;
  encodeFunctionData(functionFragment: 'emissionSchedule', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'maxMintableTokens', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mintedTokens', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'poolConfigurator', values?: undefined): string;
  encodeFunctionData(functionFragment: 'poolInfo', values: [string]): string;
  encodeFunctionData(functionFragment: 'poolLength', values?: undefined): string;
  encodeFunctionData(functionFragment: 'registeredTokens', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rewardMinter', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rewardsPerSecond', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setClaimReceiver', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'setOnwardIncentives', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'start', values?: undefined): string;
  encodeFunctionData(functionFragment: 'startTime', values?: undefined): string;
  encodeFunctionData(functionFragment: 'totalAllocPoint', values?: undefined): string;
  encodeFunctionData(functionFragment: 'transferOwnership', values: [string]): string;
  encodeFunctionData(functionFragment: 'userBaseClaimable', values: [string]): string;
  encodeFunctionData(functionFragment: 'userInfo', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'withdraw', values: [string, BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'addPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'batchUpdateAllocPoint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'claim', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'claimReceiver', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'claimableReward', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'deposit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'emergencyWithdraw', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'emissionSchedule', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'maxMintableTokens', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintedTokens', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'poolConfigurator', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'poolInfo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'poolLength', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registeredTokens', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rewardMinter', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rewardsPerSecond', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setClaimReceiver', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setOnwardIncentives', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'start', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'startTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalAllocPoint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'userBaseClaimable', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'userInfo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result;

  events: {
    'Deposit(address,address,uint256)': EventFragment;
    'EmergencyWithdraw(address,address,uint256)': EventFragment;
    'OwnershipTransferred(address,address)': EventFragment;
    'Withdraw(address,address,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Deposit'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'EmergencyWithdraw'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Withdraw'): EventFragment;
}

export type DepositEvent = TypedEvent<
  [string, string, BigNumber] & {
    token: string;
    user: string;
    amount: BigNumber;
  }
>;

export type EmergencyWithdrawEvent = TypedEvent<
  [string, string, BigNumber] & {
    token: string;
    user: string;
    amount: BigNumber;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type WithdrawEvent = TypedEvent<
  [string, string, BigNumber] & {
    token: string;
    user: string;
    amount: BigNumber;
  }
>;

export class MasterChef extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MasterChefInterface;

  functions: {
    addPool(
      _token: string,
      _allocPoint: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    batchUpdateAllocPoint(
      _tokens: string[],
      _allocPoints: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claim(
      _user: string,
      _tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimReceiver(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    claimableReward(
      _user: string,
      _tokens: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    deposit(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emergencyWithdraw(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emissionSchedule(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        startTimeOffset: BigNumber;
        rewardsPerSecond: BigNumber;
      }
    >;

    maxMintableTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintedTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    poolConfigurator(overrides?: CallOverrides): Promise<[string]>;

    poolInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        allocPoint: BigNumber;
        lastRewardTime: BigNumber;
        accRewardPerShare: BigNumber;
        onwardIncentives: string;
      }
    >;

    poolLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    registeredTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardMinter(overrides?: CallOverrides): Promise<[string]>;

    rewardsPerSecond(overrides?: CallOverrides): Promise<[BigNumber]>;

    setClaimReceiver(
      _user: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOnwardIncentives(
      _token: string,
      _incentives: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    start(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalAllocPoint(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userBaseClaimable(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    userInfo(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }>;

    withdraw(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addPool(
    _token: string,
    _allocPoint: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  batchUpdateAllocPoint(
    _tokens: string[],
    _allocPoints: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claim(
    _user: string,
    _tokens: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimReceiver(arg0: string, overrides?: CallOverrides): Promise<string>;

  claimableReward(
    _user: string,
    _tokens: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  deposit(
    _token: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emergencyWithdraw(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emissionSchedule(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      startTimeOffset: BigNumber;
      rewardsPerSecond: BigNumber;
    }
  >;

  maxMintableTokens(overrides?: CallOverrides): Promise<BigNumber>;

  mintedTokens(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  poolConfigurator(overrides?: CallOverrides): Promise<string>;

  poolInfo(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string] & {
      allocPoint: BigNumber;
      lastRewardTime: BigNumber;
      accRewardPerShare: BigNumber;
      onwardIncentives: string;
    }
  >;

  poolLength(overrides?: CallOverrides): Promise<BigNumber>;

  registeredTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardMinter(overrides?: CallOverrides): Promise<string>;

  rewardsPerSecond(overrides?: CallOverrides): Promise<BigNumber>;

  setClaimReceiver(
    _user: string,
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOnwardIncentives(
    _token: string,
    _incentives: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  start(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  startTime(overrides?: CallOverrides): Promise<BigNumber>;

  totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userBaseClaimable(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  userInfo(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }>;

  withdraw(
    _token: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addPool(_token: string, _allocPoint: BigNumberish, overrides?: CallOverrides): Promise<void>;

    batchUpdateAllocPoint(
      _tokens: string[],
      _allocPoints: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    claim(_user: string, _tokens: string[], overrides?: CallOverrides): Promise<void>;

    claimReceiver(arg0: string, overrides?: CallOverrides): Promise<string>;

    claimableReward(
      _user: string,
      _tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    deposit(_token: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    emergencyWithdraw(_token: string, overrides?: CallOverrides): Promise<void>;

    emissionSchedule(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        startTimeOffset: BigNumber;
        rewardsPerSecond: BigNumber;
      }
    >;

    maxMintableTokens(overrides?: CallOverrides): Promise<BigNumber>;

    mintedTokens(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    poolConfigurator(overrides?: CallOverrides): Promise<string>;

    poolInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        allocPoint: BigNumber;
        lastRewardTime: BigNumber;
        accRewardPerShare: BigNumber;
        onwardIncentives: string;
      }
    >;

    poolLength(overrides?: CallOverrides): Promise<BigNumber>;

    registeredTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rewardMinter(overrides?: CallOverrides): Promise<string>;

    rewardsPerSecond(overrides?: CallOverrides): Promise<BigNumber>;

    setClaimReceiver(_user: string, _receiver: string, overrides?: CallOverrides): Promise<void>;

    setOnwardIncentives(
      _token: string,
      _incentives: string,
      overrides?: CallOverrides
    ): Promise<void>;

    start(overrides?: CallOverrides): Promise<void>;

    startTime(overrides?: CallOverrides): Promise<BigNumber>;

    totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;

    userBaseClaimable(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    userInfo(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }>;

    withdraw(_token: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'Deposit(address,address,uint256)'(
      token?: string | null,
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { token: string; user: string; amount: BigNumber }
    >;

    Deposit(
      token?: string | null,
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { token: string; user: string; amount: BigNumber }
    >;

    'EmergencyWithdraw(address,address,uint256)'(
      token?: string | null,
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { token: string; user: string; amount: BigNumber }
    >;

    EmergencyWithdraw(
      token?: string | null,
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { token: string; user: string; amount: BigNumber }
    >;

    'OwnershipTransferred(address,address)'(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<[string, string], { previousOwner: string; newOwner: string }>;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<[string, string], { previousOwner: string; newOwner: string }>;

    'Withdraw(address,address,uint256)'(
      token?: string | null,
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { token: string; user: string; amount: BigNumber }
    >;

    Withdraw(
      token?: string | null,
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { token: string; user: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    addPool(
      _token: string,
      _allocPoint: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    batchUpdateAllocPoint(
      _tokens: string[],
      _allocPoints: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claim(
      _user: string,
      _tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimReceiver(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimableReward(
      _user: string,
      _tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposit(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emergencyWithdraw(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emissionSchedule(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    maxMintableTokens(overrides?: CallOverrides): Promise<BigNumber>;

    mintedTokens(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    poolConfigurator(overrides?: CallOverrides): Promise<BigNumber>;

    poolInfo(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    poolLength(overrides?: CallOverrides): Promise<BigNumber>;

    registeredTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardMinter(overrides?: CallOverrides): Promise<BigNumber>;

    rewardsPerSecond(overrides?: CallOverrides): Promise<BigNumber>;

    setClaimReceiver(
      _user: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOnwardIncentives(
      _token: string,
      _incentives: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    start(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    startTime(overrides?: CallOverrides): Promise<BigNumber>;

    totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userBaseClaimable(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    userInfo(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addPool(
      _token: string,
      _allocPoint: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    batchUpdateAllocPoint(
      _tokens: string[],
      _allocPoints: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claim(
      _user: string,
      _tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimReceiver(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimableReward(
      _user: string,
      _tokens: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deposit(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emergencyWithdraw(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emissionSchedule(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxMintableTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintedTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolConfigurator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolInfo(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registeredTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardMinter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardsPerSecond(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setClaimReceiver(
      _user: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOnwardIncentives(
      _token: string,
      _incentives: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    start(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalAllocPoint(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userBaseClaimable(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    userInfo(arg0: string, arg1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
