import { CallOverrides, ContractTransaction, Overrides } from '@ethersproject/contracts';
import { BigNumber, BigNumberish, PopulatedTransaction } from 'ethers';
import { ILendingPool } from '@radiantcapital/contract-helpers';

export class ILendingPoolWithLock extends ILendingPool {
  functions: {
    lock(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    'lock(address,uint256,address,uint16)'(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  lock(
    reserve: string,
    amount: BigNumberish,
    onBehalfOf: string,
    referralCode: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  'lock(address,uint256,address,uint16)'(
    reserve: string,
    amount: BigNumberish,
    onBehalfOf: string,
    referralCode: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    lock(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    'lock(address,uint256,address,uint16)'(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    lock(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    'lock(address,uint256,address,uint16)'(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    lock(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    'lock(address,uint256,address,uint16)'(
      reserve: string,
      amount: BigNumberish,
      onBehalfOf: string,
      referralCode: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
