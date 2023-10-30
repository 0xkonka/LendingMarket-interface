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
  valueToWei,
} from '@radiantcapital/contract-helpers';

import { Leverager__factory } from './Leverager__factory';
import { Leverager } from './Leverager';

export class LeveragerContract extends BaseService<Leverager> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;

  constructor(provider: providers.Provider, leveragerAddr: string) {
    super(provider, Leverager__factory);

    this.contractAddress = leveragerAddr;
    const erc20Service = new ERC20Service(provider);
    this.erc20Service = erc20Service;
    this.baseDebtToken = new BaseDebtToken(provider, erc20Service);
  }

  public async getVDebtToken(asset: string) {
    const leveragerContract: Leverager = this.getContractInstance(this.contractAddress);
    const debtTokenAddress = await leveragerContract.callStatic.getVDebtToken(asset);
    return debtTokenAddress;
  }

  public async getFeePercent() {
    const leveragerContract: Leverager = this.getContractInstance(this.contractAddress);
    const feePercent = await leveragerContract.callStatic.feePercent();
    const feePercentValue = parseFloat(ethers.utils.formatUnits(feePercent, 4));
    return feePercentValue;
  }

  public async wethToZapEstimation(
    user: tEthereumAddress,
    asset: string,
    amount: string,
    borrowRatio: string,
    loopCount: string
  ) {
    const API_ETH_MOCK_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const { decimalsOf } = this.erc20Service;
    if (asset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      asset = API_ETH_MOCK_ADDRESS;
    }
    borrowRatio = Math.floor(parseFloat(borrowRatio) * 10000).toString();
    const leveragerContract: Leverager = this.getContractInstance(this.contractAddress);
    const convertedAmount: string = valueToWei(amount, await decimalsOf(asset));
    const estimation = await leveragerContract.callStatic.wethToZapEstimation(
      user,
      asset,
      convertedAmount,
      borrowRatio,
      loopCount
    );
    const estimationValue = parseFloat(ethers.utils.formatUnits(estimation, 18));
    return estimationValue;
  }

  public async loop(
    user: tEthereumAddress,
    asset: string,
    debtTokenAddress: string,
    amount: string,
    interestRateMode: string,
    borrowRatio: string,
    loopCount: string,
    vdWETHAddress: string,
    isBorrow: boolean
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const { decimalsOf, isApproved, approve } = this.erc20Service;
    const API_ETH_MOCK_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

    const leveragerContract: Leverager = this.getContractInstance(this.contractAddress);

    borrowRatio = Math.floor(parseFloat(borrowRatio) * 10000).toString();

    console.log(`executing`);
    console.log(amount);
    console.log(borrowRatio);
    console.log(loopCount);

    if (asset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
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

      const vdWETHApproved = await this.baseDebtToken.isDelegationApproved({
        debtTokenAddress: vdWETHAddress,
        allowanceGiver: user,
        allowanceReceiver: this.contractAddress,
        amount,
      });
      if (!vdWETHApproved) {
        const vdWETHApproveTx = this.baseDebtToken.approveDelegation({
          user,
          delegatee: this.contractAddress,
          debtTokenAddress: vdWETHAddress,
          amount: DEFAULT_APPROVE_AMOUNT,
        });
        txs.push(vdWETHApproveTx);
      }

      const convertedAmount: string = valueToWei(amount, 18);
      const txCallback: () => Promise<transactionType> = this.generateTxCallback({
        rawTxMethod: () =>
          leveragerContract.populateTransaction.loopETH(interestRateMode, borrowRatio, loopCount),
        from: user,
        value: convertedAmount,
      });

      txs.push({
        tx: txCallback,
        txType: eEthereumTxType.STAKE_ACTION,
        gas: this.generateTxPriceEstimation(txs, txCallback),
      });
      return txs;
    } else {
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

      const vdWETHApproved = await this.baseDebtToken.isDelegationApproved({
        debtTokenAddress: vdWETHAddress,
        allowanceGiver: user,
        allowanceReceiver: this.contractAddress,
        amount,
      });
      if (!vdWETHApproved) {
        const vdWETHApproveTx = this.baseDebtToken.approveDelegation({
          user,
          delegatee: this.contractAddress,
          debtTokenAddress: vdWETHAddress,
          amount: DEFAULT_APPROVE_AMOUNT,
        });
        txs.push(vdWETHApproveTx);
      }

      const convertedAmount: string = valueToWei(amount, await decimalsOf(asset));
      const txCallback: () => Promise<transactionType> = this.generateTxCallback({
        rawTxMethod: () =>
          leveragerContract.populateTransaction.loop(
            asset,
            convertedAmount,
            interestRateMode,
            borrowRatio,
            loopCount,
            isBorrow
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
  }
}
