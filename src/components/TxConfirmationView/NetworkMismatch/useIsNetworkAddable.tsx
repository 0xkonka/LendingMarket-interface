import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { AvailableWeb3Connectors } from 'libs/web3-data-provider';

const useIsNetworkAddable = (currentProviderName: AvailableWeb3Connectors | undefined) => {
  const { library } = useWeb3React<providers.Web3Provider>();
  const isMetaMask = (window as any)?.ethereum?.isMetaMask;
  // @ts-ignore
  const isCoinbaseWallet = library?.provider?.isCoinbaseWallet === true;

  return (
    (isMetaMask || isCoinbaseWallet) &&
    currentProviderName &&
    ['browser', 'wallet-link'].includes(currentProviderName)
  );
};

export default useIsNetworkAddable;
