import { providers } from 'ethers';
import {
  BaseService,
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
  ERC20Service,
  IERC20ServiceInterface,
  DEFAULT_APPROVE_AMOUNT,
  valueToWei,
} from '@radiantcapital/contract-helpers';

import { MasterChef__factory } from './MasterChef__factory';
import { MasterChef } from './MasterChef';
import getNumberFromEtherBigNumber from '../getNumberFromEtherBigNumber';

export class MasterChefContract extends BaseService<MasterChef> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  stakingTokenAddr: string;

  constructor(provider: providers.Provider, stakingTokenAddr: string, masterchefAddr: string) {
    super(provider, MasterChef__factory);

    // todo: fill in the contract
    this.contractAddress = masterchefAddr;
    this.stakingTokenAddr = stakingTokenAddr;
    this.erc20Service = new ERC20Service(provider);
  }

  public async deposit(
    user: tEthereumAddress,
    amount: string
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const { decimalsOf, isApproved, approve } = this.erc20Service;

    const approved = await isApproved({
      token: this.stakingTokenAddr,
      user,
      spender: this.contractAddress,
      amount,
    });
    if (!approved) {
      const approveTx = approve({
        user,
        token: this.stakingTokenAddr,
        spender: this.contractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const masterChefContract: MasterChef = this.getContractInstance(this.contractAddress);
    // eslint-disable-next-line new-cap
    const convertedAmount: string = valueToWei(amount, await decimalsOf(this.stakingTokenAddr)); // todo:pavlik HARDCODE 18, should be from settings

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        masterChefContract.populateTransaction.deposit(this.stakingTokenAddr, convertedAmount),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async getUserAmount(user: tEthereumAddress) {
    const { decimalsOf } = this.erc20Service;
    const masterChefContract: MasterChef = this.getContractInstance(this.contractAddress);
    const res = await masterChefContract.callStatic.userInfo(this.stakingTokenAddr, user);
    const decimals = await decimalsOf(this.stakingTokenAddr);

    return getNumberFromEtherBigNumber(res.amount, decimals);
  }

  public async rewardsPerSecond() {
    const { decimalsOf } = this.erc20Service;
    const masterChefContract: MasterChef = this.getContractInstance(this.contractAddress);
    const res2 = await masterChefContract.callStatic.rewardsPerSecond();
    const decimals = await decimalsOf(this.stakingTokenAddr);
    const rp2 = getNumberFromEtherBigNumber(res2, decimals);
    return rp2;
  }

  public async claimableReward(user: tEthereumAddress) {
    const { decimalsOf } = this.erc20Service;
    const masterChefContract: MasterChef = this.getContractInstance(this.contractAddress);
    const res = await masterChefContract.callStatic.claimableReward(user, [this.stakingTokenAddr]);
    // userBaseClaimable
    const res2 = await masterChefContract.callStatic.userBaseClaimable(user);
    const decimals = await decimalsOf(this.stakingTokenAddr);
    const claimableReward = getNumberFromEtherBigNumber(res[0], decimals);
    const claimableReward2 = getNumberFromEtherBigNumber(res2, decimals);
    return claimableReward + claimableReward2;
  }

  public async withdraw(user: tEthereumAddress, amount: string) {
    const { decimalsOf } = this.erc20Service;

    const masterChefContract: MasterChef = this.getContractInstance(this.contractAddress);
    const convertedAmount: string = valueToWei(amount, await decimalsOf(this.stakingTokenAddr));

    return this.generateTxCallback({
      rawTxMethod: () =>
        masterChefContract.populateTransaction.withdraw(this.stakingTokenAddr, convertedAmount),
      from: user,
    });
  }

  public async claim(user: tEthereumAddress): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const masterChefContract: MasterChef = this.getContractInstance(this.contractAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        masterChefContract.populateTransaction.claim(user, [this.stakingTokenAddr]),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }
}
