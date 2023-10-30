import { BigNumber, providers } from 'ethers';
import {
  BaseService,
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { MockToken__factory } from './MockToken__factory';
import { MockToken } from './MockToken';

export class MockTokenContract extends BaseService<MockToken> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, stakingTokenAddr: string) {
    super(provider, MockToken__factory);

    this.contractAddress = stakingTokenAddr;
    this.erc20Service = new ERC20Service(provider);
  }

  public async mint(
    user: tEthereumAddress,
    amount: BigNumber
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const mockTokenContract: MockToken = this.getContractInstance(this.contractAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => mockTokenContract.populateTransaction.mint(user, amount),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.FAUCET_MINT,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }
}
