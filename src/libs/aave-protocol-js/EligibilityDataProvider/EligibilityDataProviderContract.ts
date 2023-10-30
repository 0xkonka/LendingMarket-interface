import { BigNumber, providers } from 'ethers';
import { BaseService, tEthereumAddress } from '@radiantcapital/contract-helpers';
import { EligibilityDataProvider } from './EligibilityDataProvider';
import { EligibilityDataProvider__factory } from './EligibilityDataProvider__factory';

export class EligibilityDataProviderService extends BaseService<EligibilityDataProvider> {
  public readonly contractAddress: tEthereumAddress;

  constructor(provider: providers.Provider, addr: string) {
    super(provider, EligibilityDataProvider__factory);

    this.contractAddress = addr;
  }

  public async lockedUsdValue(userAddress: string): Promise<BigNumber> {
    const contract: EligibilityDataProvider = this.getContractInstance(this.contractAddress);
    return await contract.callStatic.lockedUsdValue(userAddress);
  }

  public async requiredUsdValue(userAddress: string): Promise<BigNumber> {
    const contract: EligibilityDataProvider = this.getContractInstance(this.contractAddress);
    return await contract.callStatic.requiredUsdValue(userAddress);
  }

  public async isEligibleForRewards(userAddress: string): Promise<boolean> {
    const contract: EligibilityDataProvider = this.getContractInstance(this.contractAddress);
    return await contract.callStatic.isEligibleForRewards(userAddress);
  }
  public async lastEligibleTime(userAddress: string): Promise<BigNumber> {
    const contract: EligibilityDataProvider = this.getContractInstance(this.contractAddress);
    return await contract.callStatic.lastEligibleTime(userAddress);
  }
  public async getDqTime(userAddress: string): Promise<BigNumber> {
    const contract: EligibilityDataProvider = this.getContractInstance(this.contractAddress);
    return await contract.callStatic.getDqTime(userAddress);
  }
}
