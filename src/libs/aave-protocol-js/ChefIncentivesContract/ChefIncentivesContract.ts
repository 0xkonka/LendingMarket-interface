import { ethers, providers } from 'ethers';
import {
  BaseService,
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { ChefIncentivesController } from './ChefIncentivesController';
import { ChefIncentivesController__factory } from './ChefIncentivesController__factory';
import getNumberFromEtherBigNumber from '../getNumberFromEtherBigNumber';

export class ChefIncentivesService extends BaseService<ChefIncentivesController> {
  readonly erc20Service: IERC20ServiceInterface;
  chefIncentivesControllerAddr: string;

  constructor(provider: providers.Provider, chefIncentivesControllerAddr: string) {
    super(provider, ChefIncentivesController__factory);
    this.chefIncentivesControllerAddr = chefIncentivesControllerAddr;
    this.erc20Service = new ERC20Service(provider);
  }

  public claimAll(user: tEthereumAddress): () => Promise<transactionType> {
    const ChefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );

    return this.generateTxCallback({
      rawTxMethod: () => ChefIncentivesContract.populateTransaction.claimAll(user),
      from: user,
    });
  }

  public async claim(
    user: tEthereumAddress,
    tokens: string[]
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const ChefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => ChefIncentivesContract.populateTransaction.claim(user, tokens),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.REWARD_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async pendingRewards(user: tEthereumAddress, tokens: string[]): Promise<number[]> {
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );

    const rewards = await chefIncentivesContract.callStatic.pendingRewards(user, tokens);
    // TODO: investigate - assuming 18 here?
    return rewards.map((amount, i) => getNumberFromEtherBigNumber(amount, 18));
  }

  public async poolInfo(address: string): Promise<any> {
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );
    const rewards = await chefIncentivesContract.callStatic.poolInfo(address);
    return rewards;
  }

  public async setRewardsPerSec(amount: string, user: tEthereumAddress) {
    const txs: EthereumTransactionTypeExtended[] = [];
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );
    const convertedAmount = ethers.utils.parseUnits(amount, 18);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        chefIncentivesContract.populateTransaction.setRewardsPerSecond(convertedAmount, true),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async batchUpdateAllocPoint(
    user: tEthereumAddress,
    tokens: string[],
    allocPoints: number[]
  ) {
    const txs: EthereumTransactionTypeExtended[] = [];
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        chefIncentivesContract.populateTransaction.batchUpdateAllocPoint(tokens, allocPoints),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async totalAllocPoint(): Promise<any> {
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );
    const rewards = await chefIncentivesContract.callStatic.totalAllocPoint();
    return rewards;
  }

  public async beforeLockUpdate(addr: string): Promise<any> {
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );
    return await chefIncentivesContract.callStatic.beforeLockUpdate(addr);
  }

  public async rewardsPerSecond(): Promise<any> {
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );
    const rewards = await chefIncentivesContract.callStatic.rewardsPerSecond();
    return rewards;
  }

  public async userBaseClaimable(user: tEthereumAddress): Promise<number> {
    const chefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      this.chefIncentivesControllerAddr
    );

    const _userBaseClaimable = await chefIncentivesContract.callStatic.userBaseClaimable(user);
    // TODO: investigate - assuming 18 here?
    return getNumberFromEtherBigNumber(_userBaseClaimable, 18);
  }
}
