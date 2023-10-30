import { ContractTransaction, providers } from 'ethers';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import {
  BaseService,
  tEthereumAddress,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { GeistToken__factory } from './GeistToken__factory';
import { GeistToken } from './GeistToken';
import getNumberFromEtherBigNumber from '../getNumberFromEtherBigNumber';

export class GeistTokenContract extends BaseService<GeistToken> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, contractAddress: string) {
    super(provider, GeistToken__factory);

    this.contractAddress = contractAddress;
    this.erc20Service = new ERC20Service(provider);
  }

  public async getBalance(user: tEthereumAddress) {
    const geistTokenContract: GeistToken = this.getContractInstance(this.contractAddress);
    const walletBalance = await geistTokenContract.callStatic.balanceOf(user);
    return walletBalance;
  }

  public async totalSupply() {
    const geistTokenContract: GeistToken = this.getContractInstance(this.contractAddress);
    const walletBalance = await geistTokenContract.callStatic.totalSupply();
    return walletBalance;
  }

  public async getInfo(
    user: tEthereumAddress
  ): Promise<{ walletBalance: BigNumber; currencySymbol: string; totalSupply: BigNumber }> {
    const { decimalsOf } = this.erc20Service;
    const geistTokenContract: GeistToken = this.getContractInstance(this.contractAddress);

    const [walletBalance, currencySymbol, totalSupply] = await Promise.all([
      geistTokenContract.callStatic.balanceOf(user),
      geistTokenContract.callStatic.symbol(),
      geistTokenContract.callStatic.totalSupply(),
    ]);

    const decimals = await decimalsOf(this.contractAddress);
    const balance = getNumberFromEtherBigNumber(walletBalance, decimals).toString();
    const total = getNumberFromEtherBigNumber(totalSupply, decimals).toString();

    return {
      walletBalance: valueToBigNumber(balance.toString()),
      currencySymbol,
      totalSupply: valueToBigNumber(total.toString()),
    };
  }

  public async mint(user: tEthereumAddress): Promise<ContractTransaction> {
    const geistTokenContract: GeistToken = this.getContractInstance(this.contractAddress);

    return geistTokenContract.mint(user, 100);
  }
}
