import { providers } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  tEthereumAddress,
} from '@radiantcapital/contract-helpers';

import { LendingPoolAddressesProvider } from './LendingPoolAddressesProvider';
import { LendingPoolAddressesProvider__factory } from './LendingPoolAddressesProvider__factory';

export class LendingPoolAddressesProviderContract extends BaseService<LendingPoolAddressesProvider> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: LendingPoolAddressesProvider;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, lendingPoolAddressesProviderAddress: string) {
    super(provider, LendingPoolAddressesProvider__factory);

    this.contractAddress = lendingPoolAddressesProviderAddress;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
  }

  public async getLendingPoolConfigurator(): Promise<any> {
    const lendingPoolAddressesProviderContract: LendingPoolAddressesProvider =
      this.getContractInstance(this.contractAddress);
    const lendingPoolConfigurator =
      await lendingPoolAddressesProviderContract.callStatic.getLendingPoolConfigurator();
    return lendingPoolConfigurator;
  }
}
