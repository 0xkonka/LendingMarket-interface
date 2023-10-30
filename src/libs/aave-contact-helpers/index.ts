import { providers } from 'ethers';
import {
  LendingPool as ParentLendingPool,
  tEthereumAddress,
  eEthereumTxType,
  ProtocolAction,
  LendingPoolMarketConfig,
  BaseDebtToken,
  BaseDebtTokenInterface,
  DEFAULT_APPROVE_AMOUNT,
  getTxValue,
  valueToWei,
} from '@radiantcapital/contract-helpers';

import { ILendingPoolWithLock } from './ILendingPoolWithLock';

export type LPLockParamsType = {
  user: tEthereumAddress;
  reserve: tEthereumAddress;
  amount: string;
  onBehalfOf?: tEthereumAddress;
  referralCode?: string;
};

export default class LendingPool extends ParentLendingPool {
  readonly baseDebtToken: BaseDebtTokenInterface;
  readonly wethGatewayAddress: string;

  constructor(provider: providers.Provider, lendingPoolConfig?: LendingPoolMarketConfig) {
    super(provider, lendingPoolConfig);
    const { WETH_GATEWAY } = lendingPoolConfig ?? {};

    this.wethGatewayAddress = WETH_GATEWAY ?? '';
    this.baseDebtToken = new BaseDebtToken(provider, this.erc20Service);
  }

  public async lock({ user, reserve, amount, onBehalfOf, referralCode }: LPLockParamsType) {
    const { isApproved, approve, decimalsOf } = this.erc20Service;
    const txs = [];
    const reserveDecimals = await decimalsOf(reserve);
    const convertedAmount = valueToWei(amount, reserveDecimals);
    const fundsAvailable = await this.synthetixService.synthetixValidation({
      user,
      reserve,
      amount: convertedAmount,
    });

    if (!fundsAvailable) {
      throw new Error('Not enough funds to execute operation');
    }

    const approved = await isApproved({
      token: reserve,
      user,
      spender: this.lendingPoolAddress,
      amount,
    });

    if (!approved) {
      const approveTx = approve({
        user,
        token: reserve,
        spender: this.lendingPoolAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const lendingPoolContract: ILendingPoolWithLock = this.getContractInstance(
      this.lendingPoolAddress
    );

    const txCallback = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.lock(
          reserve,
          convertedAmount,
          onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
          referralCode !== null && referralCode !== void 0 ? referralCode : '0'
        ),
      from: user,
      value: getTxValue(reserve, convertedAmount),
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
    });

    return txs;
  }
}
