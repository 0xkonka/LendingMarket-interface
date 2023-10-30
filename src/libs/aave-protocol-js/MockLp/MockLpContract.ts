import { providers } from 'ethers';
import {
  BaseService,
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { MockLpContract__factory } from './MockLp__factory';
import { MockLp } from './MockLp';

export class MockLpContract extends BaseService<MockLp> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, stakingTokenAddr: string) {
    super(provider, MockLpContract__factory);

    this.contractAddress = stakingTokenAddr;
    this.erc20Service = new ERC20Service(provider);
  }

  public async mint(user: tEthereumAddress): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const mockLpContract: MockLp = this.getContractInstance(this.contractAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => mockLpContract.populateTransaction.mint(),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.FAUCET_MINT,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async decreasePrice(user: tEthereumAddress): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const mockLpContract: MockLp = this.getContractInstance(this.contractAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => mockLpContract.populateTransaction.decreasePrice(),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }
  public async increasePrice(user: tEthereumAddress): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const mockLpContract: MockLp = this.getContractInstance(this.contractAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => mockLpContract.populateTransaction.increasePrice(),
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
