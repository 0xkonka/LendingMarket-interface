import { ethers, providers } from 'ethers';
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
} from '@radiantcapital/contract-helpers';

import { LockZap__factory } from './LockZap__factory';
import { LockZap } from './LockZap';

export class LockZapContract extends BaseService<LockZap> {
  public readonly contractAddress: tEthereumAddress;
  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;

  constructor(provider: providers.Provider, lockZap: string) {
    super(provider, LockZap__factory);

    this.contractAddress = lockZap;
    const erc20Service = new ERC20Service(provider);
    this.erc20Service = erc20Service;
    this.baseDebtToken = new BaseDebtToken(provider, erc20Service);
  }

  public async zapETHWithRdnt(
    ethAmount: string,
    rdntAmount: string,
    rdntAddress: string,
    durationIndex: number,
    user: tEthereumAddress
  ) {
    const txs: EthereumTransactionTypeExtended[] = [];
    const liquidityZAPContract: LockZap = this.getContractInstance(this.contractAddress);
    const convertedEthAmount = ethers.utils.parseUnits(ethAmount, 18).toString();
    const rdntZapAmt = ethers.utils.parseUnits(rdntAmount, 18).toString();

    const { isApproved, approve } = this.erc20Service;

    if (Number(rdntAmount) > 0) {
      const approved = await isApproved({
        token: rdntAddress,
        user,
        spender: this.contractAddress,
        amount: rdntAmount,
      });

      if (!approved) {
        const approveTx = approve({
          user,
          token: rdntAddress,
          spender: this.contractAddress,
          amount: DEFAULT_APPROVE_AMOUNT,
        });
        txs.push(approveTx);
      }
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        liquidityZAPContract.populateTransaction.zap(false, 0, rdntZapAmt, durationIndex),
      from: user,
      value: convertedEthAmount,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async zapAssetWithRdnt({
    assetAmount,
    rdntAmount,
    assetAddress,
    rdntAddress,
    durationIndex,
    user,
    assetDecimals = 18,
  }: {
    assetAmount: string;
    rdntAmount: string;
    assetAddress: string;
    rdntAddress: string;
    durationIndex: number;
    user: tEthereumAddress;
    assetDecimals?: number;
  }) {
    const txs: EthereumTransactionTypeExtended[] = [];
    const liquidityZAPContract: LockZap = this.getContractInstance(this.contractAddress);
    const convertedAssetAmount = ethers.utils.parseUnits(assetAmount, assetDecimals).toString();
    const rdntZapAmt = ethers.utils.parseUnits(rdntAmount, 18).toString();
    const { isApproved, approve } = this.erc20Service;

    if (Number(rdntAmount) > 0) {
      const rdntApproved = await isApproved({
        token: rdntAddress,
        user,
        spender: this.contractAddress,
        amount: rdntAmount,
      });

      if (!rdntApproved) {
        const approveTx = approve({
          user,
          token: rdntAddress,
          spender: this.contractAddress,
          amount: DEFAULT_APPROVE_AMOUNT,
        });
        txs.push(approveTx);
      }
    }

    const debtTokenAddress = await liquidityZAPContract.getVDebtToken(assetAddress);
    const assetApproved = await isApproved({
      token: assetAddress,
      user,
      spender: this.contractAddress,
      amount: assetAmount,
    });
    if (!assetApproved) {
      const approveTx = approve({
        user,
        token: assetAddress,
        spender: this.contractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const delegationApproved = await this.baseDebtToken.isDelegationApproved({
      debtTokenAddress,
      allowanceGiver: user,
      allowanceReceiver: this.contractAddress,
      amount: assetAmount,
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

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        liquidityZAPContract.populateTransaction.zap(
          true,
          convertedAssetAmount,
          rdntZapAmt,
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

  public async quote(
    rdntAmount: string,
    assetAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
  ) {
    const tokenAmountFormatted = ethers.utils.parseUnits(rdntAmount, 18);

    const liquidityZAPContract: LockZap = this.getContractInstance(this.contractAddress);
    // TODO: This needs to support getting quotes in other assets
    const requiredEth = await liquidityZAPContract.callStatic.quoteFromToken(tokenAmountFormatted);
    const requiredEthFormatted = ethers.utils.formatUnits(requiredEth, 18);
    return requiredEthFormatted;
  }

  public async zapFromVesting(
    amount: string,
    user: tEthereumAddress,
    assetAddress: string,
    borrow: boolean,
    durationIndex: number
  ) {
    const txs: EthereumTransactionTypeExtended[] = [];
    const liquidityZAPContract: LockZap = this.getContractInstance(this.contractAddress);
    const convertedAmount = borrow ? '0' : ethers.utils.parseUnits(amount, 18).toString();

    if (borrow) {
      const { isApproved, approve } = this.erc20Service;
      const debtTokenAddress = await liquidityZAPContract.getVDebtToken(assetAddress);

      const approved = await isApproved({
        token: assetAddress,
        user,
        spender: this.contractAddress,
        amount,
      });
      if (!approved) {
        const approveTx = approve({
          user,
          token: assetAddress,
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
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        liquidityZAPContract.populateTransaction.zapFromVesting(borrow, durationIndex),
      from: user,
      value: convertedAmount,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }
}
