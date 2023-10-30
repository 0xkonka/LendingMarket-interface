import { ChainId } from '@radiantcapital/contract-helpers';

interface SwitchChainOpts {
  neededChainId: ChainId;
  chainName: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  rpcUrls: any[];
  blockExplorerUrls: string[];
}

const switchNetwork = async ({
  neededChainId,
  chainName,
  nativeCurrency,
  rpcUrls,
  blockExplorerUrls,
}: SwitchChainOpts) => {
  console.log({
    neededChainId,
    chainName,
    nativeCurrency,
    rpcUrls,
    blockExplorerUrls,
  });
  const { ethereum } = window as any;
  if (!ethereum) {
    console.log('No ethereum');

    return;
  }

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${neededChainId.toString(16)}` }],
    });
  } catch (switchError) {
    console.log(switchError);
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${neededChainId.toString(16)}`,
              chainName,
              nativeCurrency,
              rpcUrls,
              blockExplorerUrls,
            },
          ],
        });
      } catch (addError) {
        console.log(addError);
        // TODO: handle error somehow
      }
    }
  }
};

export default switchNetwork;
