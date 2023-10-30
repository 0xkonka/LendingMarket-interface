import { providers } from 'ethers';
import {
  BaseService,
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
  ERC20Service,
  IERC20ServiceInterface,
  BaseDebtToken,
  BaseDebtTokenInterface,
  DEFAULT_APPROVE_AMOUNT,
  valueToWei,
} from '@radiantcapital/contract-helpers';

import { Migration__factory } from './Migration__factory';
import { Migration } from './Migration';

export class MigrationContract extends BaseService<Migration> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;

  constructor(provider: providers.Provider, migrationAddr: string) {
    super(provider, Migration__factory);

    this.contractAddress = migrationAddr;
    const erc20Service = new ERC20Service(provider);
    this.erc20Service = erc20Service;
    this.baseDebtToken = new BaseDebtToken(provider, erc20Service);
  }

  public async exchange(
    user: tEthereumAddress,
    asset: string,
    amount: string
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const { decimalsOf, isApproved, approve } = this.erc20Service;

    const approved = await isApproved({
      token: asset,
      user,
      spender: this.contractAddress,
      amount,
    });
    if (!approved) {
      const approveTx = approve({
        user,
        token: asset,
        spender: this.contractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const migrationContract: Migration = this.getContractInstance(this.contractAddress);
    const convertedAmount: string = valueToWei(amount, await decimalsOf(asset));
    const paused = await migrationContract.callStatic.paused();
    console.log('paused: ', paused);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => migrationContract.populateTransaction.exchange(convertedAmount),
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
