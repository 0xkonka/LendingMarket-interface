import { BigNumber, providers, BytesLike } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  tEthereumAddress,
} from '@radiantcapital/contract-helpers';

import { ArbAirdrop__factory } from './ArbAirdrop__factory';
import { ArbAirdrop } from './ArbAirdrop';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  transactionType,
} from '@aave/protocol-js';

export class ArbAirdropContract extends BaseService<ArbAirdrop> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: ArbAirdrop;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, arbAirdropAddress: tEthereumAddress) {
    super(provider, ArbAirdrop__factory);

    this.contractAddress = arbAirdropAddress;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
  }

  public async canClaim(
    userAddress: tEthereumAddress,
    claimAmount: BigNumber,
    proof: BytesLike[]
  ): Promise<boolean> {
    const arbAirdrop: ArbAirdrop = this.getContractInstance(this.contractAddress);
    const canClaim = await arbAirdrop.canClaim(userAddress, claimAmount, proof);
    return canClaim;
  }

  public async claim(
    userAddress: tEthereumAddress,
    claimAmount: BigNumber,
    proof: BytesLike[]
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const arbAirdrop: ArbAirdrop = this.getContractInstance(this.contractAddress);

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => arbAirdrop.populateTransaction.claim(claimAmount, proof),
      from: userAddress,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.REWARD_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });
    console.log(txs);
    return txs;
  }
}
