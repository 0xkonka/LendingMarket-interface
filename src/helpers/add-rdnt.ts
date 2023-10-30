import { getAssetInfo } from '../aave-ui-kit/helpers/assets-list';

const RDNTSymbol = 'RDNT';
const RDNTDecimals = 18;
const rdntTokenAddresses: any = {
  '0xa4b1': '0x3082CC23568eA640225c2467653dB90e9250AaA0', // Arbitrum One
  '0x38': '0xf7DE7E8A6bd59ED41a4b5fe50278b3B7f31384dF', // BNB Chain
};

export async function addRDNTTokenToWallet() {
  const injectedProvider = (window as any).ethereum;

  if (!injectedProvider) {
    console.info("Can't add token. No injected provider found");
    return;
  }

  try {
    const chainId = await injectedProvider.request({ method: 'eth_chainId' });
    const RDNTAddress = rdntTokenAddresses[chainId];

    if (!RDNTAddress) {
      console.log('Unsupported network');
      return;
    }

    const asset = getAssetInfo('RDNT');
    const baseUrl = window.location.origin;
    const RDNTImage = `${baseUrl}${asset.icon}`;

    await injectedProvider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: RDNTAddress,
          symbol: RDNTSymbol,
          decimals: RDNTDecimals,
          image: RDNTImage,
        },
      },
    });
  } catch (error) {
    console.log('Failed to add RDNT token to wallet', error);
  }
}
