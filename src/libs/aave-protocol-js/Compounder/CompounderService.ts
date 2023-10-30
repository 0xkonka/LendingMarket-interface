import { providers } from 'ethers';
import {
  BaseService,
  tEthereumAddress,
  ERC20Service,
  IERC20ServiceInterface,
} from '@radiantcapital/contract-helpers';

import { AddressList } from 'helpers/config/types';
import { Compounder } from './Compounder';
import { Compounder__factory } from './Compounder__factory';

export class CompounderService extends BaseService<Compounder> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: Compounder;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, addresses: AddressList) {
    super(provider, Compounder__factory);

    this.contractAddress = addresses.compounder;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
    // this.multicall = new MulticallContract(provider, addresses.multicall, this.contract);
  }

  public async compound(user: tEthereumAddress) {
    const compounder: Compounder = this.getContractInstance(this.contractAddress);
    return this.generateTxCallback({
      rawTxMethod: () => compounder.populateTransaction.selfCompound(),
      from: user,
    });
  }

  public async selfEligibleCompound(user: tEthereumAddress): Promise<boolean> {
    const contract: Compounder = this.getContractInstance(this.contractAddress);
    return await contract.callStatic.userEligibleForCompound(user);
  }
}
