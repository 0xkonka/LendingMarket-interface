import { BigNumber, providers } from 'ethers';
import {
  BaseService,
  tEthereumAddress,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { AddressList } from 'helpers/config/types';
import { BountyManager } from './BountyManager';
import { BountyManager__factory } from './BountyManager__factory';

export class BountyManagerContract extends BaseService<BountyManager> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: BountyManager;
  // public readonly multicall: MulticallContract;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, addresses: AddressList) {
    super(provider, BountyManager__factory);

    this.contractAddress = addresses.bountyManager;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
    // this.multicall = new MulticallContract(provider, addresses.multicall, this.contract);
  }

  public async quote(user: string): Promise<{ bounty: BigNumber; actionType: BigNumber }> {
    const bountyManager: BountyManager = this.getContractInstance(this.contractAddress);
    const quote = await bountyManager.callStatic.quote(user);
    return quote;
  }

  public async quote2(user: string): Promise<{ bounty: BigNumber; actionType: BigNumber }> {
    const bountyManager: BountyManager = this.getContractInstance(this.contractAddress);
    const quote = await bountyManager.callStatic.executeBounty(user, false, 0);
    return quote;
  }

  public async claim(
    user: tEthereumAddress,
    target: string,
    quote: BigNumber,
    actionType: BigNumber
  ) {
    const bountyManager: BountyManager = this.getContractInstance(this.contractAddress);

    return this.generateTxCallback({
      rawTxMethod: () => bountyManager.populateTransaction.claim(target, actionType),
      from: user,
    });
  }

  public async getBaseBounty(): Promise<BigNumber> {
    const bountyManager: BountyManager = this.getContractInstance(this.contractAddress);
    const baseBounty = await bountyManager.callStatic.getBaseBounty();
    return baseBounty;
  }

  public async getMinDLPBalance(): Promise<BigNumber> {
    const bountyManager: BountyManager = this.getContractInstance(this.contractAddress);
    const minDLPBalance = await bountyManager.minDLPBalance();
    return minDLPBalance;
  }

  //   public async getDqTime(user: string): Promise<BigNumber> {
  //     const dqContract: Disqualifier = this.getContractInstance(this.contractAddress);
  //     const dqTime = await dqContract.callStatic.getDqTime(user);
  //     return dqTime;
  //   }

  //   public async getOpenBounties(): Promise<string[]> {
  //     const dqContract: Disqualifier = this.getContractInstance(this.contractAddress);
  //     const bounties = await dqContract.callStatic.getOpenBounties();
  //     return bounties;
  //   }

  //   public async processUserWithBounty(target: string, user: tEthereumAddress) {
  //     const disqualifier: Disqualifier = this.getContractInstance(this.contractAddress);

  //     return this.generateTxCallback({
  //       rawTxMethod: () => disqualifier.populateTransaction.processUserWithBounty(target, user),
  //       from: user,
  //     });
  //   }
}
