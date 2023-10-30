import { ChainId } from '@radiantcapital/contract-helpers';

import { MarketDataType } from 'helpers/config/types';
import { networkConfigs } from 'ui-config/networks';
import * as logos from './images';

export enum CustomMarket {
  arbitrum_one = 'arbitrum_one',
  mainnet = 'mainnet',
  local = 'local',
  bsc = 'bsc',
}

export const CHAIN_ID_TO_NETWORKNAME: Record<number, CustomMarket> = {
  // main chain Id to network
  1: CustomMarket['mainnet'],
  56: CustomMarket['bsc'],
  42161: CustomMarket['arbitrum_one'],
  31337: CustomMarket['local'],
} as const;

export const marketsData: { [key in keyof typeof CustomMarket]: MarketDataType } = {
  [CustomMarket.local]: {
    chainId: ChainId.local,
    logo: logos.radiant,
    activeLogo: logos.radiantActive,
    subLogo: logos.arbitrum,
    chainSymbol: 'ARETH',
    aTokenPrefix: 'R',
    enabledFeatures: {
      faucet: true,
      incentives: false,
      migration: true,
    },
    addresses: networkConfigs[ChainId.local].addresses,
  },
  [CustomMarket.arbitrum_one]: {
    chainId: ChainId.arbitrum_one,
    logo: logos.radiant,
    activeLogo: logos.radiantActive,
    subLogo: logos.arbitrum,
    chainSymbol: 'ARETH',
    aTokenPrefix: 'R',
    enabledFeatures: {
      faucet: false,
      incentives: false,
      migration: true,
    },
    addresses: networkConfigs[ChainId.arbitrum_one].addresses,
  },
  [CustomMarket.bsc]: {
    chainId: ChainId.bsc,
    logo: logos.radiant,
    activeLogo: logos.radiantActive,
    subLogo: logos.bsc,
    chainSymbol: 'BNB',
    aTokenPrefix: 'R',
    enabledFeatures: {
      faucet: false,
      incentives: false,
      migration: false,
    },
    addresses: networkConfigs[ChainId.bsc].addresses,
  },
  [CustomMarket.mainnet]: {
    chainId: ChainId.mainnet,
    logo: logos.radiant,
    activeLogo: logos.radiantActive,
    subLogo: logos.ethereum,
    chainSymbol: 'ETH',
    aTokenPrefix: 'R',
    enabledFeatures: {
      faucet: false,
      incentives: true,
      migration: false,
    },
    addresses: networkConfigs[ChainId.mainnet].addresses,
  },
} as const;
