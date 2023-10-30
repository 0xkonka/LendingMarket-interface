import { providers } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { AaveProtocolDataProvider__factory } from './AaveProtocolDataProvider__factory';
import { AaveProtocolDataProvider } from './AaveProtocolDataProvider';

export class AaveProtocolDataProviderContract extends BaseService<AaveProtocolDataProvider> {
  readonly erc20Service: IERC20ServiceInterface;
  aaveProtocolDataProvider: string;

  constructor(provider: providers.Provider, aaveProtocolDataProvider: string) {
    super(provider, AaveProtocolDataProvider__factory);

    this.aaveProtocolDataProvider = aaveProtocolDataProvider;
    this.erc20Service = new ERC20Service(provider);
  }

  public async getAllReservesTokens() {
    const aaveProtocolDataProvider: AaveProtocolDataProvider = this.getContractInstance(
      this.aaveProtocolDataProvider
    );

    const res: { address: string; symbol: string }[] = [];

    const tokens = await aaveProtocolDataProvider.getAllReservesTokens();
    for (let i = 0; i < tokens.length; i += 1) {
      const [aToken] = await aaveProtocolDataProvider.getReserveTokensAddresses(
        tokens[i].tokenAddress
      );
      res.push({ address: aToken, symbol: tokens[i].symbol });
    }
    return res;
  }

  public async getTokens(): Promise<string[]> {
    const aaveProtocolDataProvider: AaveProtocolDataProvider = this.getContractInstance(
      this.aaveProtocolDataProvider
    );

    const res: string[] = [];

    const tokens = await aaveProtocolDataProvider.getAllReservesTokens();
    for (let i = 0; i < tokens.length; i += 1) {
      const [aToken, , vToken] = await aaveProtocolDataProvider.getReserveTokensAddresses(
        tokens[i].tokenAddress
      );
      // @ts-ignore
      res.push(aToken, vToken);
    }

    return res;
  }

  public async getReserveConfigurationData(asset: string) {
    const aaveProtocolDataProvider: AaveProtocolDataProvider = this.getContractInstance(
      this.aaveProtocolDataProvider
    );

    return aaveProtocolDataProvider.callStatic.getReserveConfigurationData(asset);
  }
}
