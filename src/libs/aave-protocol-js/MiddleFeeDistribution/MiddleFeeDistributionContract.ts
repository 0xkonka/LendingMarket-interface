import { providers } from 'ethers';
import {
  BaseService,
  tEthereumAddress,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { MiddleFeeDistribution } from './MiddleFeeDistribution';
import { MiddleFeeDistribution__factory } from './MiddleFeeDistribution__factory';
import getNumberFromEtherBigNumber from '../getNumberFromEtherBigNumber';

export class MiddleFeeDistributionService extends BaseService<MiddleFeeDistribution> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  rdntTokenAddress: string;

  constructor(
    provider: providers.Provider,
    rdntTokenAddress: string,
    middleFeeDistribution: string
  ) {
    super(provider, MiddleFeeDistribution__factory);

    this.contractAddress = middleFeeDistribution;
    this.rdntTokenAddress = rdntTokenAddress;
    this.erc20Service = new ERC20Service(provider);
  }

  public async getLpLockingRewardRatio() {
    const middleFeeDistributionContract: MiddleFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const lpLockingRewardRatio =
      await middleFeeDistributionContract.callStatic.lpLockingRewardRatio();
    const lpLockingRewardRatioNum = getNumberFromEtherBigNumber(lpLockingRewardRatio, 2);
    return lpLockingRewardRatioNum;
  }
}
