import { providers } from 'ethers';
import {
  BaseService,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  ERC20Service,
  IERC20ServiceInterface,
  BaseDebtToken,
  BaseDebtTokenInterface,
  DEFAULT_APPROVE_AMOUNT,
} from '@radiantcapital/contract-helpers';

import { IStargateRouter__factory } from './IStargateRouter__factory';
import { IStargateRouter } from './IStargateRouter';

export class IStargateRouterContract extends BaseService<IStargateRouter> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;

  constructor(provider: providers.Provider, stargateRouterAddr: string) {
    super(provider, IStargateRouter__factory);

    this.contractAddress = stargateRouterAddr;
    const erc20Service = new ERC20Service(provider);
    this.erc20Service = erc20Service;
    this.baseDebtToken = new BaseDebtToken(provider, erc20Service);
  }

  public async loop(
    user: tEthereumAddress,
    asset: string,
    debtTokenAddress: string,
    amount: string,
    interestRateMode: string,
    borrowRatio: string,
    loopCount: string
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const { isApproved, approve } = this.erc20Service;

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

    return txs;
  }
}
