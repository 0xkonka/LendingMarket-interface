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

import { StargateBorrow__factory } from './StargateBorrow__factory';
import { StargateBorrow } from './StargateBorrow';

export class StargateBorrowContract extends BaseService<StargateBorrow> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;

  constructor(provider: providers.Provider, stargateBorrowAddr: string) {
    super(provider, StargateBorrow__factory);

    this.contractAddress = stargateBorrowAddr;
    const erc20Service = new ERC20Service(provider);
    this.erc20Service = erc20Service;
    this.baseDebtToken = new BaseDebtToken(provider, erc20Service);
  }

  public async quoteLayerZeroSwapFee(destChainId: number, user: tEthereumAddress) {
    const stargateBorrowContract: StargateBorrow = this.getContractInstance(this.contractAddress);
    const quoteData = await stargateBorrowContract.callStatic.quoteLayerZeroSwapFee(
      destChainId.toString(),
      1,
      user,
      '0x',
      {
        dstGasForCall: 0,
        dstNativeAmount: 0,
        dstNativeAddr: user,
      }
    );
    return quoteData;
  }

  public async borrow(
    user: tEthereumAddress,
    asset: string,
    debtTokenAddress: string,
    amount: string,
    destChainId: number,
    borrowValue: string
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

    const delegationApproved = await this.baseDebtToken.isDelegationApproved({
      debtTokenAddress,
      allowanceGiver: user,
      allowanceReceiver: this.contractAddress,
      amount,
    });
    if (!delegationApproved) {
      const approveTx = this.baseDebtToken.approveDelegation({
        user,
        delegatee: this.contractAddress,
        debtTokenAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const stargateBorrowContract: StargateBorrow = this.getContractInstance(this.contractAddress);
    const convertedAmount: string = valueToWei(amount, await decimalsOf(asset));
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        stargateBorrowContract.populateTransaction.borrow(
          asset,
          convertedAmount,
          2,
          destChainId.toString()
        ),
      from: user,
      value: borrowValue,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });
    return txs;
  }
}
