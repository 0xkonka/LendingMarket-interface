import { providers } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  tEthereumAddress,
  eEthereumTxType,
  ProtocolAction,
  EthereumTransactionTypeExtended,
  DEFAULT_APPROVE_AMOUNT,
  valueToWei,
  BaseDebtToken,
  BaseDebtTokenInterface,
} from '@radiantcapital/contract-helpers';

import { WETHGateway } from './WETHGateway';
import { WETHGateway__factory } from './WETHGateway__factory';

export class WETHGatewayContract extends BaseService<WETHGateway> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: WETHGateway;

  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;

  constructor(provider: providers.Provider, wethGateway: string) {
    super(provider, WETHGateway__factory);

    this.contractAddress = wethGateway;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
    this.baseDebtToken = new BaseDebtToken(provider, this.erc20Service);
  }

  public async depositWithAutoDLP(
    user: tEthereumAddress,
    lendingPool: tEthereumAddress,
    amount: string,
    vdWETHAddress: tEthereumAddress,
    leveragerAddress: tEthereumAddress,
    onBehalfOf?: tEthereumAddress,
    referralCode?: string
  ) {
    const txs: EthereumTransactionTypeExtended[] = [];

    const convertedAmount = valueToWei(amount, 18);

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
        this.contract.populateTransaction.depositETHWithAutoDLP(
          lendingPool,
          onBehalfOf ?? user,
          referralCode ?? '0'
        ),
      from: user,
      value: convertedAmount,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
    });

    return txs;
  }
}
