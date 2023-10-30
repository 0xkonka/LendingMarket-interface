import { ChainId } from '@radiantcapital/contract-helpers';

export const AUTHEREUM_API_KEY = import.meta.env.VITE_AUTHEREUM_API_KEY;
export const PORTIS_DAPP_ID = import.meta.env.VITE_PORTIS_DAPP_ID;

export function getFortmaticKeyByChainId(chainId: ChainId): string {
  if (chainId === ChainId.mainnet) {
    return import.meta.env.VITE_FORTMATIC_KEY_MAINNET || '';
  } else {
    return import.meta.env.VITE_FORTMATIC_KEY_TESTNET || '';
  }
}
