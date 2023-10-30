import { ChainId } from '@radiantcapital/contract-helpers';
import { networkConfigs } from '../../helpers/config/markets-and-network-config';

export const ASSET_ADDRESS_BY_CHAIN_ID: Record<number, Record<string, string>> = {
  [ChainId.arbitrum_one]: {
    // ARB
    [networkConfigs[ChainId.arbitrum_one].baseAsset]:
      networkConfigs[ChainId.arbitrum_one].baseAssetWrappedAddress!,
    DAI: networkConfigs[ChainId.arbitrum_one].addresses.allTokens.DAI,
    // Native USDC
    // USDC: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    // USDC.e
    USDC: networkConfigs[ChainId.arbitrum_one].addresses.allTokens.USDC,
    USDT: networkConfigs[ChainId.arbitrum_one].addresses.allTokens.USDT,
  },
  [ChainId.bsc]: {
    // BNB
    [networkConfigs[ChainId.bsc].baseAsset]: networkConfigs[ChainId.bsc].baseAssetWrappedAddress!,
    BUSD: networkConfigs[ChainId.bsc].addresses.allTokens.BUSD,
    USDC: networkConfigs[ChainId.bsc].addresses.allTokens.USDC,
    USDT: networkConfigs[ChainId.bsc].addresses.allTokens.USDT,
  },
  [ChainId.local]: {
    // LOCAL
    [networkConfigs[ChainId.local].baseAsset]:
      networkConfigs[ChainId.local].baseAssetWrappedAddress!,
    DAI: networkConfigs[ChainId.local].addresses.allTokens.DAI,
    USDC: networkConfigs[ChainId.local].addresses.allTokens.USDC,
    USDT: networkConfigs[ChainId.local].addresses.allTokens.USDT,
  },
  [ChainId.mainnet]: {
    // ETH
    [networkConfigs[ChainId.local].baseAsset]:
      networkConfigs[ChainId.local].baseAssetWrappedAddress!,
    DAI: networkConfigs[ChainId.local].addresses.allTokens.DAI,
    USDC: networkConfigs[ChainId.local].addresses.allTokens.USDC,
    USDT: networkConfigs[ChainId.local].addresses.allTokens.USDT,
  },
};
