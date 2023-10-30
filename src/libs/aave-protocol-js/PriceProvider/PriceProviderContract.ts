import { ethers, providers } from 'ethers';
import {
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  tEthereumAddress,
} from '@radiantcapital/contract-helpers';

import { PriceProvider__factory } from './PriceProvider__factory';
import { PriceProvider } from './PriceProvider';
import { AddressList } from 'helpers/config/types';

export class PriceProviderContract extends BaseService<PriceProvider> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: PriceProvider;
  // public readonly multicall: MulticallContract;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, addresses: AddressList) {
    super(provider, PriceProvider__factory);

    this.contractAddress = addresses.priceProvider;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
    // this.multicall = new MulticallContract(provider, addresses.multicall, this.contract);
  }

  public async getPrices(): Promise<{
    tokenPrice: number;
    lpTokenPrice: number;
  }> {
    // this.multicall.push('getTokenPriceUsd');
    // this.multicall.push('getLpTokenPriceUsd');

    // await this.multicall.execute();

    // const tokenPrice = this.multicall.get('getTokenPriceUsd');
    // const lpTokenPrice = this.multicall.get('getLpTokenPriceUsd');

    let tokenPrice = await this.getTokenPriceUsd();
    let lpTokenPrice = await this.getLpTokenPriceUsd();

    return {
      tokenPrice: parseFloat(ethers.utils.formatUnits(tokenPrice.toString(), 8)),
      lpTokenPrice: parseFloat(ethers.utils.formatUnits(lpTokenPrice.toString(), 8)),
    };
  }

  public async getTokenPriceUsd() {
    const priceProviderContract: PriceProvider = this.getContractInstance(this.contractAddress);
    const tokenPrice = await priceProviderContract.callStatic.getTokenPriceUsd();
    // const tokenPriceValue = ethers.utils.formatUnits(tokenPrice, 8);
    // return tokenPriceValue;
    return tokenPrice;
  }

  public async getLpTokenPriceUsd() {
    const priceProviderContract: PriceProvider = this.getContractInstance(this.contractAddress);
    const lpTokenPrice = await priceProviderContract.callStatic.getLpTokenPriceUsd();
    // const lpTokenPriceValue = ethers.utils.formatUnits(lpTokenPrice, 8);
    // return lpTokenPriceValue;
    return lpTokenPrice;
  }
}
