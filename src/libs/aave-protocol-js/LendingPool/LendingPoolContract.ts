import { providers } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  eEthereumTxType,
  ProtocolAction,
  LendingPoolMarketConfig,
  tEthereumAddress,
  DEFAULT_APPROVE_AMOUNT,
  getTxValue,
  valueToWei,
  BaseDebtToken,
  BaseDebtTokenInterface,
} from '@radiantcapital/contract-helpers';

import { LendingPool } from './LendingPool';
import { LendingPool__factory } from './LendingPool__factory';
import { WETHGatewayContract } from 'libs/aave-protocol-js/WETHGateway/WETHGatewayContract';

export class LendingPoolContract extends BaseService<LendingPool> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: LendingPool;

  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;
  readonly wethGatewayAddress: string;

  constructor(provider: providers.Provider, lendingPoolConfig?: LendingPoolMarketConfig) {
    super(provider, LendingPool__factory);

    const { LENDING_POOL, WETH_GATEWAY } = lendingPoolConfig ?? {};

    this.contractAddress = LENDING_POOL ?? '';
    this.wethGatewayAddress = WETH_GATEWAY ?? '';
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
    this.baseDebtToken = new BaseDebtToken(provider, this.erc20Service);
  }

  public async depositWithAutoDLP(
    user: tEthereumAddress,
    reserve: tEthereumAddress,
    amount: string,
    vdWETHAddress: tEthereumAddress,
    leveragerAddress: tEthereumAddress,
    onBehalfOf?: tEthereumAddress,
    referralCode?: string
  ) {
    const { isApproved, approve, decimalsOf } = this.erc20Service;
    const API_ETH_MOCK_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      const wethGatewayContract = new WETHGatewayContract(this.provider, this.wethGatewayAddress);
      return wethGatewayContract.depositWithAutoDLP(
        user,
        this.contractAddress,
        amount,
        vdWETHAddress,
        leveragerAddress,
        onBehalfOf,
        referralCode
      );
    }
    const txs = [];
    const reserveDecimals = await decimalsOf(reserve);
    const convertedAmount = valueToWei(amount, reserveDecimals);

    const approved = await isApproved({
      token: reserve,
      user,
      spender: this.contractAddress,
      amount,
    });

    if (!approved) {
      const approveTx = approve({
        user,
        token: reserve,
        spender: this.contractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const vdWETHApproved = await this.baseDebtToken.isDelegationApproved({
      debtTokenAddress: vdWETHAddress,
      allowanceGiver: user,
      allowanceReceiver: leveragerAddress,
      amount,
    });
    if (!vdWETHApproved) {
      const vdWETHApproveTx = this.baseDebtToken.approveDelegation({
        user,
        delegatee: leveragerAddress,
        debtTokenAddress: vdWETHAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(vdWETHApproveTx);
    }

    const txCallback = this.generateTxCallback({
      rawTxMethod: async () =>
        this.contract.populateTransaction.depositWithAutoDLP(
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
    // const txs: EthereumTransactionTypeExtended[] = [];

    // const convertedAmount = valueToWei(amount, 18);

    // const vdWETHApproved = await this.baseDebtToken.isDelegationApproved({
    //   debtTokenAddress: vdWETHAddress,
    //   allowanceGiver: user,
    //   allowanceReceiver: leveragerAddress,
    //   amount,
    // });
    // if (!vdWETHApproved) {
    //   const vdWETHApproveTx = this.baseDebtToken.approveDelegation({
    //     user,
    //     delegatee: leveragerAddress,
    //     debtTokenAddress: vdWETHAddress,
    //     amount: DEFAULT_APPROVE_AMOUNT,
    //   });
    //   txs.push(vdWETHApproveTx);
    // }

    // const txCallback = this.generateTxCallback({
    //   rawTxMethod: async () =>
    //     this.contract.populateTransaction.depositETHWithAutoDLP(
    //       lendingPool,
    //       onBehalfOf ?? user,
    //       referralCode ?? '0'
    //     ),
    //   from: user,
    //   value: convertedAmount,
    // });

    // txs.push({
    //   tx: txCallback,
    //   txType: eEthereumTxType.DLP_ACTION,
    //   gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
    // });

    // return txs;
  }
}
