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
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../common';

export declare namespace Multicall {
  export type CallStruct = {
    target: PromiseOrValue<string>;
    callData: PromiseOrValue<BytesLike>;
  };

  export type CallStructOutput = [string, string] & {
    target: string;
    callData: string;
  };
}

export interface MulticallInterface extends utils.Interface {
  functions: {
    'aggregate((address,bytes)[])': FunctionFragment;
    'getBlockHash(uint256)': FunctionFragment;
    'getCurrentBlockCoinbase()': FunctionFragment;
    'getCurrentBlockDifficulty()': FunctionFragment;
    'getCurrentBlockGasLimit()': FunctionFragment;
    'getCurrentBlockTimestamp()': FunctionFragment;
    'getEthBalance(address)': FunctionFragment;
    'getLastBlockHash()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'aggregate'
      | 'getBlockHash'
      | 'getCurrentBlockCoinbase'
      | 'getCurrentBlockDifficulty'
      | 'getCurrentBlockGasLimit'
      | 'getCurrentBlockTimestamp'
      | 'getEthBalance'
      | 'getLastBlockHash'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'aggregate', values: [Multicall.CallStruct[]]): string;
  encodeFunctionData(
    functionFragment: 'getBlockHash',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockCoinbase', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockDifficulty', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockGasLimit', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getCurrentBlockTimestamp', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getEthBalance', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'getLastBlockHash', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'aggregate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getBlockHash', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockCoinbase', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockDifficulty', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockGasLimit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentBlockTimestamp', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getEthBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLastBlockHash', data: BytesLike): Result;

  events: {};
}

export interface Multicall extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MulticallInterface;

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
    aggregate(
      calls: Multicall.CallStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getBlockHash(
      blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { blockHash: string }>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<[string] & { coinbase: string }>;

    getCurrentBlockDifficulty(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { difficulty: BigNumber }>;

    getCurrentBlockGasLimit(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { gaslimit: BigNumber }>;

    getCurrentBlockTimestamp(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { timestamp: BigNumber }>;

    getEthBalance(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    getLastBlockHash(overrides?: CallOverrides): Promise<[string] & { blockHash: string }>;
  };

  aggregate(
    calls: Multicall.CallStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getBlockHash(
    blockNumber: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>;

  getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  getLastBlockHash(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    aggregate(
      calls: Multicall.CallStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber, string[]] & { blockNumber: BigNumber; returnData: string[] }>;

    getBlockHash(
      blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>;

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getLastBlockHash(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    aggregate(
      calls: Multicall.CallStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getBlockHash(
      blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getEthBalance(addr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getLastBlockHash(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    aggregate(
      calls: Multicall.CallStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getBlockHash(
      blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEthBalance(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLastBlockHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
