import { providers } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  tEthereumAddress,
} from '@radiantcapital/contract-helpers';

import { MFDstats } from './MFDstats';
import { MFDstats__factory } from './MFDstats__factory';

export class MFDstatsService extends BaseService<MFDstats> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, mfdStats: string) {
    super(provider, MFDstats__factory);

    this.contractAddress = mfdStats;
    this.erc20Service = new ERC20Service(provider);
  }

  public async getLastDayTotal() {
    const mfdStatsContract: MFDstats = this.getContractInstance(this.contractAddress);

    const lastDayTotal = await mfdStatsContract.callStatic.getLastDayTotal();

    return lastDayTotal;
  }

  public async getTotal() {
    const mfdStatsContract: MFDstats = this.getContractInstance(this.contractAddress);
    const total = await mfdStatsContract.callStatic.getTotal();

    return total;
  }

  public async getCirculatingSupply(chef: string, bounty: string, migration: string) {
    const mfdStatsContract: MFDstats = this.getContractInstance(this.contractAddress);
    const circulatingSupply = mfdStatsContract.callStatic.getCirculatingSupply(
      chef,
      bounty,
      migration
    );

    return circulatingSupply;
  }
}
