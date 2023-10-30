/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { ethers, EventFilter, Signer, BigNumber, PopulatedTransaction } from 'ethers';
import { Contract, CallOverrides } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, Result } from '@ethersproject/abi';

interface WalletBalanceProviderInterface extends ethers.utils.Interface {
  // todo:pavlik ts-generated from what? we need this balance
  functions: {
    'balanceOf(address,address)': FunctionFragment;
    'batchBalanceOf(address[],address[])': FunctionFragment;
    'getUserWalletBalances(address)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'balanceOf', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'batchBalanceOf', values: [string[], string[]]): string;
  encodeFunctionData(functionFragment: 'getUserWalletBalances', values: [string, string]): string;

  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'batchBalanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getUserWalletBalances', data: BytesLike): Result;

  events: {};
}

export class WalletBalanceProvider extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: WalletBalanceProviderInterface;

  functions: {
    balanceOf(
      _user: string,
      _token: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    batchBalanceOf(
      _users: string[],
      _tokens: string[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    getUserWalletBalances(
      _addressesProvider: string,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string[];
      1: BigNumber[];
    }>;
  };

  balanceOf(_user: string, _token: string, overrides?: CallOverrides): Promise<BigNumber>;

  batchBalanceOf(
    _users: string[],
    _tokens: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getUserWalletBalances(
    _addressesProvider: string,
    _user: string,
    overrides?: CallOverrides
  ): Promise<{
    0: string[];
    1: BigNumber[];
  }>;

  staticCall: {
    balanceOf(_user: string, _token: string, overrides?: CallOverrides): Promise<BigNumber>;

    batchBalanceOf(
      _users: string[],
      _tokens: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getUserWalletBalances(
      _addressesProvider: string,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string[];
      1: BigNumber[];
    }>;
  };

  filters: {};

  estimateGas: {
    balanceOf(_user: string, _token: string): Promise<BigNumber>;
    batchBalanceOf(_users: string[], _tokens: string[]): Promise<BigNumber>;
    getUserWalletBalances(_addressesProvider: string, _user: string): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(_user: string, _token: string): Promise<PopulatedTransaction>;
    batchBalanceOf(_users: string[], _tokens: string[]): Promise<PopulatedTransaction>;
    getUserWalletBalances(_addressesProvider: string, _user: string): Promise<PopulatedTransaction>;
  };
}
