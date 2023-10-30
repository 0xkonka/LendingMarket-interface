import { ethers, providers } from 'ethers';
import {
  ChainId,
  BaseService,
  ERC20Service,
  IERC20ServiceInterface,
  tEthereumAddress,
} from '@radiantcapital/contract-helpers';

import { AddressList } from 'helpers/config/types';
import { LockerList } from './LockerList';
import { LockerList__factory } from './LockerList__factory';
import { BountyManagerContract } from '../BountyManager/BountyManagerContract';
import { getProvider } from 'helpers/config/markets-and-network-config';

export class LockerListContract extends BaseService<LockerList> {
  public readonly contractAddress: tEthereumAddress;
  public readonly contract: LockerList;
  // public readonly multicall: MulticallContract;

  readonly erc20Service: IERC20ServiceInterface;
  bountyManager: BountyManagerContract;

  constructor(provider: providers.Provider, addresses: AddressList, chainId: ChainId) {
    super(provider, LockerList__factory);

    this.contractAddress = addresses.lpLockerList;
    this.erc20Service = new ERC20Service(provider);
    this.contract = this.getContractInstance(this.contractAddress);
    this.bountyManager = new BountyManagerContract(getProvider(chainId), addresses);
    // this.multicall = new MulticallContract(provider, addresses.multicall, this.contract);
  }

  public async getBounties(scanAll: boolean = false) {
    const lockerList: LockerList = this.getContractInstance(this.contractAddress);
    let totalLockers = (await lockerList.lockersCount()).toNumber();
    let limit = Math.min(scanAll ? totalLockers : Math.min(totalLockers, 10), 1000);
    const pageCount = scanAll ? Math.ceil(totalLockers / (limit || 1)) : 1;

    let bounties: { address: string; bounty: number }[] = [];

    let i = 1;

    const lockers = (
      await Promise.all(
        Array(pageCount)
          .fill(0)
          .map(async (_, page) => {
            // This is to prevent going over the limit because it will fill the excess with 0x0 addresses
            const pageLimit = Math.min(limit, totalLockers - page * limit);
            return lockerList.callStatic.getUsers(page, pageLimit, {
              customData: { noMulticall: true },
            });
          })
      )
    ).flat();

    await Promise.all(
      lockers.map(async (locker) => {
        try {
          let quote = await this.bountyManager.quote(locker);
          if (!quote.bounty.eq(0)) {
            const bounty = {
              address: locker,
              bounty: parseFloat(ethers.utils.formatEther(quote.bounty.toString())),
            };
            bounties.push(bounty);
          }
        } catch (e) {
          console.error(e);
        }

        if (i % 10 === 0) {
          const event = new CustomEvent<number>('scan_update', {
            detail: (i / totalLockers) * 100,
          });
          document.dispatchEvent(event);
        }
        i++;
      })
    );

    return bounties;
  }
}
