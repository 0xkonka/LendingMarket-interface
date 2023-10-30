import { ethers, providers } from 'ethers';
import { BigNumber } from '@aave/protocol-js';
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

import { MultiFeeDistribution } from './MultiFeeDistribution';
import { MultiFeeDistribution__factory } from './MultiFeeDistribution__factory';
import getNumberFromEtherBigNumber from '../getNumberFromEtherBigNumber';

export class MultiFeeDistributionService extends BaseService<MultiFeeDistribution> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  rdntTokenAddress: string;
  readonly instanceId;
  private static instanceCount = 0;

  constructor(
    provider: providers.Provider,
    rdntTokenAddress: string,
    multiFeeDistribution: string
  ) {
    super(provider, MultiFeeDistribution__factory);

    this.contractAddress = multiFeeDistribution;
    this.rdntTokenAddress = rdntTokenAddress;
    this.erc20Service = new ERC20Service(provider);
    this.instanceId = ++MultiFeeDistributionService.instanceCount;
  }

  // @StakingValidator
  public async getBalances(
    // @isEthAddress() user: tEthereumAddress,
    // @isPositiveAmount() amount: string,
    // @isEthAddress() onBehalfOf?: tEthereumAddress,
    user: tEthereumAddress
  ): Promise<BigNumber[]> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const [totalBalance, earnedBalances, withdrawableBalance, lockedBalances, locks] =
      await Promise.all([
        multiFeeDistributionContract.callStatic.totalBalance(user),
        multiFeeDistributionContract.callStatic.earnedBalances(user),
        multiFeeDistributionContract.callStatic.withdrawableBalance(user),
        multiFeeDistributionContract.callStatic.lockedBalances(user),
        this.getLockedBalances(user),
      ]);

    // todo:pavlik check what should be second argument (precision) of getNumberFromEtherBigNumber
    const balance = totalBalance;
    const unlocked = earnedBalances.unlocked;
    const earned = new BigNumber(earnedBalances.total._hex);

    let locked = 0;
    locks.map((lock) => {
      locked += parseFloat(lock.amount);
      return null;
    });

    const staked = new BigNumber(unlocked._hex);
    const total = new BigNumber(balance._hex);
    const withdrawable = new BigNumber(withdrawableBalance[0]._hex);
    const penalty = new BigNumber(withdrawableBalance[1]._hex);
    const unlockable = new BigNumber(lockedBalances.unlockable._hex);

    const res = [
      new BigNumber(locked).plus(unlockable.div(new BigNumber(10 ** 18))),
      unlockable.div(new BigNumber(10 ** 18)),
      staked.div(new BigNumber(10 ** 18)),
      earned.div(new BigNumber(10 ** 18)),
      withdrawable.div(new BigNumber(10 ** 18)),
      penalty.div(new BigNumber(10 ** 18)),
      total.div(new BigNumber(10 ** 18)),
    ];

    return res;
  }

  public async getUnlockable(user: tEthereumAddress): Promise<string> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const lockedBalances = await multiFeeDistributionContract.callStatic.lockedBalances(user);

    const unlockable = ethers.utils.formatUnits(lockedBalances.unlockable, 18);
    return unlockable;
  }

  public async getStarfleetTreasury(): Promise<string> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const starfleetTreasuryAddress = await multiFeeDistributionContract.startfleetTreasury();
    return starfleetTreasuryAddress;
  }

  public async getLocked(
    // @isEthAddress() user: tEthereumAddress,
    // @isPositiveAmount() amount: string,
    // @isEthAddress() onBehalfOf?: tEthereumAddress,
    user: tEthereumAddress
  ): Promise<BigNumber> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const [lockedBalances, locks] = await Promise.all([
      multiFeeDistributionContract.callStatic.lockedBalances(user),
      this.getLockedBalances(user),
    ]);

    let locked = 0;
    locks.map((lock) => {
      locked += parseFloat(lock.amount);
      return null;
    });
    const unlockable = new BigNumber(lockedBalances.unlockable._hex);

    const res = new BigNumber(locked).plus(unlockable.div(new BigNumber(10 ** 18)));

    return res;
  }

  public async getLockedSupplyWithMultiplier(): Promise<number> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    const lockedSupplyWithMultiplier =
      await multiFeeDistributionContract.callStatic.lockedSupplyWithMultiplier();
    const lockedSupplyWithMultiplierValue = Number(
      ethers.utils.formatUnits(lockedSupplyWithMultiplier)
    );
    return lockedSupplyWithMultiplierValue;
  }

  public async getTotalLockedJsNum(user: tEthereumAddress): Promise<number> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const [lockedBalances] = await Promise.all([
      multiFeeDistributionContract.callStatic.lockedBalances(user),
    ]);
    return parseFloat(
      ethers.utils.formatEther(new BigNumber(lockedBalances.total._hex).toString())
    );
  }

  public async getTotalLockedMultipliedJsNum(user: tEthereumAddress): Promise<number> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const [lockedBalances] = await Promise.all([
      multiFeeDistributionContract.callStatic.lockedBalances(user),
    ]);
    return parseFloat(
      ethers.utils.formatEther(new BigNumber(lockedBalances.lockedWithMultiplier._hex).toString())
    );
  }

  // public async getTotalSupply(): Promise<BigNumber> {
  //   const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
  //     this.contractAddress
  //   );
  //   const totalBalance = await multiFeeDistributionContract.callStatic.totalSupply();
  //   const total = new BigNumber(totalBalance._hex);
  //   const res = total.div(new BigNumber(10 ** 18));
  //   return res;
  // }

  public async getLockedBalances(
    user: tEthereumAddress
  ): Promise<{ amount: string; expiryDate: Date; unlockTime: string; multiplier: number }[]> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const lockedBalances = await multiFeeDistributionContract.callStatic.lockedBalances(user);

    return lockedBalances.lockData.map(({ amount, unlockTime, multiplier, ...rest }) => {
      return {
        // todo:pavlik check what should be second argument (precision) of getNumberFromEtherBigNumber
        amount: getNumberFromEtherBigNumber(amount).toString(),
        expiryDate: new Date(+unlockTime.mul(1000).toString()),
        unlockTime: unlockTime.toString(),
        multiplier: Number(ethers.utils.formatUnits(multiplier, 0)),
      };
    });
  }

  public async getEarnedBalances(
    user: tEthereumAddress
  ): Promise<{ amount: string; expiryDate: Date; unlockTime: string; penalty: string }[]> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    const earnedBalances = await multiFeeDistributionContract.callStatic.earnedBalances(user);
    return earnedBalances.earningsData.map(({ amount, unlockTime, penalty }) => {
      return {
        // todo:pavlik check what should be second argument (precision) of getNumberFromEtherBigNumber
        amount: getNumberFromEtherBigNumber(amount).toString(),
        expiryDate: new Date(+unlockTime.mul(1000).toString()),
        unlockTime: unlockTime.toString(),
        penalty: getNumberFromEtherBigNumber(penalty).toString(),
      };
    });
  }

  public async getLockDurations(): Promise<
    { value: number; label: string; multiplier: number; lockDuration: string }[]
  > {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    const lockDurations = await multiFeeDistributionContract.callStatic.getLockDurations();
    const lockMultipliers = await multiFeeDistributionContract.callStatic.getLockMultipliers();

    let lockDurationsValue: {
      value: number;
      label: string;
      multiplier: number;
      lockDuration: string;
    }[] = [];
    for (let lockDurationIndex = 0; lockDurationIndex < lockDurations.length; lockDurationIndex++) {
      const lockDuration = lockDurations[lockDurationIndex];
      const lockMultiplier = lockMultipliers[lockDurationIndex];
      const lockDurationSeconds = Number(ethers.utils.formatUnits(lockDuration, 0));

      let lockDurationValue = '';
      if (lockDurationSeconds / (3600 * 24 * 30) >= 1) {
        const month = lockDurationSeconds / (3600 * 24 * 30);
        lockDurationValue = `${month} ${month === 1 ? 'month' : 'months'}`;
      } else if (lockDurationSeconds / (3600 * 24) >= 1) {
        const day = lockDurationSeconds / (3600 * 24);
        lockDurationValue = `${day} ${day === 1 ? 'day' : 'days'}`;
      } else {
        const hour = lockDurationSeconds / 3600;
        lockDurationValue = `${hour} ${hour === 1 ? 'hour' : 'hours'}`;
      }

      const multiplier = Number(ethers.utils.formatUnits(lockMultiplier, 0));

      lockDurationsValue = [
        ...lockDurationsValue,
        {
          value: lockDurationIndex,
          label: `${multiplier}X`,
          multiplier,
          lockDuration: lockDurationValue,
        },
      ];
    }
    return lockDurationsValue;
  }

  public async withdraw(user: tEthereumAddress, amount: string) {
    const txs: EthereumTransactionTypeExtended[] = [];

    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    // eslint-disable-next-line new-cap
    const convertedAmount: string = valueToWei(amount, 18); // todo:pavlik HARDCODE 18, should be from settings

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.withdraw(convertedAmount),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async cleanExpiredLocksAndEarnings(addresses: tEthereumAddress[], user: tEthereumAddress) {
    // TODO: handle addresses better (see [0] below)
    const txs: EthereumTransactionTypeExtended[] = [];
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        multiFeeDistributionContract.populateTransaction.withdrawExpiredLocksFor(addresses[0]),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async exit(user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.exit(false),
      from: user,
    });
  }

  // public async claimCompound(user: tEthereumAddress, _execute: boolean) {
  //   const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(this.contractAddress);

  //   return this.generateTxCallback({
  //     rawTxMethod: () =>
  //       multiFeeDistributionContract.populateTransaction.claimCompound(user, _execute),
  //     from: user,
  //   });
  // }

  public async individualEarlyExit(user: tEthereumAddress, unlockTime: string) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () =>
        multiFeeDistributionContract.populateTransaction.individualEarlyExit(false, unlockTime),
      from: user,
    });
  }

  public async withdrawExpiredLocks(user: tEthereumAddress, withdrawLimit: string) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    // const limit = parseInt(withdrawLimit);

    // if (limit > 0) {
    //   return this.generateTxCallback({
    //     rawTxMethod: () =>
    //       multiFeeDistributionContract.populateTransaction.withdrawExpiredLocksForWithLimit(
    //         user,
    //         limit
    //       ),
    //     from: user,
    //   });
    // } else {
    //   return this.generateTxCallback({
    //     rawTxMethod: () =>
    //       multiFeeDistributionContract.populateTransaction.withdrawExpiredLocksFor(user),
    //     from: user,
    //   });
    // }
    return this.generateTxCallback({
      rawTxMethod: () =>
        multiFeeDistributionContract.populateTransaction.withdrawExpiredLocksFor(user),
      from: user,
    });
  }

  // @StakingValidator
  public async stake(
    // @isEthAddress() user: tEthereumAddress,
    // @isPositiveAmount() amount: string,
    // @isEthAddress() onBehalfOf?: tEthereumAddress,
    user: tEthereumAddress,
    amount: string,
    durationIndex: number
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const { isApproved, approve } = this.erc20Service;

    const approved = await isApproved({
      token: this.rdntTokenAddress,
      user,
      spender: this.contractAddress,
      amount,
    });
    if (!approved) {
      const approveTx = approve({
        user,
        token: this.rdntTokenAddress,
        spender: this.contractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    // eslint-disable-next-line new-cap
    const convertedAmount: string = valueToWei(amount, 18); // todo:pavlik HARDCODE 18, should be from settings

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        multiFeeDistributionContract.populateTransaction.stake(
          convertedAmount,
          user,
          durationIndex
        ),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async claimableRewards(user: tEthereumAddress) {
    const { decimalsOf } = this.erc20Service;
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const rewards = await multiFeeDistributionContract.callStatic.claimableRewards(user);
    const decimals = await Promise.all(rewards.map(({ token }) => decimalsOf(token)));

    return rewards.map(({ token, amount }, i) => ({
      token,
      amount: getNumberFromEtherBigNumber(amount, decimals[i]),
    }));
  }

  // public async bountyForUser(user: tEthereumAddress) {
  //   const { decimalsOf } = this.erc20Service;
  //   const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(this.contractAddress);

  //   const rewards = await multiFeeDistributionContract.callStatic.bountyForUser(user);
  //   const decimals = await Promise.all(rewards.map(({ token }) => decimalsOf(token)));

  //   return rewards.map(({ token, amount }, i) => ({
  //     token,
  //     amount: getNumberFromEtherBigNumber(amount, decimals[i]),
  //   }));
  // }

  public async getReward(user: tEthereumAddress, tokens: string[]) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.getReward(tokens),
      from: user,
    });
  }

  public async requalify(user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.requalify(),
      from: user,
    });
  }

  public async getLockedSupply() {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const lockedSupply = await multiFeeDistributionContract.callStatic.lockedSupply();
    const lockedSupplyNum = getNumberFromEtherBigNumber(lockedSupply);

    return lockedSupplyNum;
  }

  // public async getSupply() {
  //   const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
  //     this.contractAddress
  //   );

  //   // todo:pavlik check what should be second argument (precision) of getNumberFromEtherBigNumber
  //   const totalSupply = await multiFeeDistributionContract.callStatic.totalSupply();
  //   const totalSupplyNum = getNumberFromEtherBigNumber(totalSupply);

  //   const lockedSupply = await multiFeeDistributionContract.callStatic.lockedSupply();
  //   const lockedSupplyNum = getNumberFromEtherBigNumber(lockedSupply);

  //   return {
  //     total: totalSupplyNum,
  //     locked: lockedSupplyNum,
  //     staked: totalSupplyNum - lockedSupplyNum,
  //   };
  // }

  public async getRelockStatus(user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    const relockStatus = await multiFeeDistributionContract.callStatic.autoRelockDisabled(user);
    return !relockStatus;
  }

  public async getDefaultLockIndex(user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    const defaultLockIndex = await multiFeeDistributionContract.callStatic.defaultLockIndex(user);
    const defaultLockIndexNumber = Number(ethers.utils.formatUnits(defaultLockIndex, 0));
    return defaultLockIndexNumber;
  }

  public async setRelock(status: boolean, user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.setRelock(status),
      from: user,
    });
  }

  public async getAutocompoundEnabled(user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    const autocompoundStatus = await multiFeeDistributionContract.callStatic.autocompoundEnabled(
      user
    );
    return autocompoundStatus;
  }

  public async setAutocompound(status: boolean, user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.setAutocompound(status),
      from: user,
    });
  }

  public async setDefaultRelockTypeIndex(typeIndex: number, user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () =>
        multiFeeDistributionContract.populateTransaction.setDefaultRelockTypeIndex(typeIndex),
      from: user,
    });
  }

  public async relock(user: tEthereumAddress, asset: string) {
    const txs: EthereumTransactionTypeExtended[] = [];
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const { isApproved, approve } = this.erc20Service;

    const approved = await isApproved({
      token: asset,
      user,
      spender: this.contractAddress,
      amount: '1',
    });
    if (!approved) {
      const approveTx = await approve({
        user,
        token: asset,
        spender: this.contractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.relock(),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async relockNoApprove(user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.relock(),
      from: user,
    });
  }
}
