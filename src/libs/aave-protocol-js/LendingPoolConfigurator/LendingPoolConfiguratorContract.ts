import { providers } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
} from '@radiantcapital/contract-helpers';

import { LendingPoolConfigurator } from './LendingPoolConfigurator';
import { LendingPoolConfigurator__factory } from './LendingPoolConfigurator__factory';

export class LendingPoolConfiguratorContract extends BaseService<LendingPoolConfigurator> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: LendingPoolConfigurator;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, lendingPoolConfiguratorAddress: string) {
    super(provider, LendingPoolConfigurator__factory);

    this.contractAddress = lendingPoolConfiguratorAddress;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
  }

  public async freezeReserve(address: tEthereumAddress, user: tEthereumAddress) {
    const txs: EthereumTransactionTypeExtended[] = [];
    const lendingPoolConfiguratorContract: LendingPoolConfigurator = this.getContractInstance(
      this.contractAddress
    );
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => lendingPoolConfiguratorContract.populateTransaction.freezeReserve(address),
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
