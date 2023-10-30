import { ReactNode, useContext, useMemo } from 'react';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getProvider, marketsDataByChainId } from 'helpers/config/markets-and-network-config';
import { useQuery } from '@tanstack/react-query';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { ChainId } from '@radiantcapital/contract-helpers';
import { MultiFeeDistributionServiceContext } from './multifee-distribution-service-context';

// This may not be necessary, the class caches the contract instance within itself
// so it is pretty much just a thin wrapper
export const MultiFeeDistributionServiceProvider = ({ children }: { children: ReactNode }) => {
  const { chainId, currentMarketData } = useProtocolDataContext();

  const { rdntToken, multiFeeDistribution } = currentMarketData.addresses;

  const multiFeeDistributionService = useMemo(() => {
    return new MultiFeeDistributionService(getProvider(chainId), rdntToken, multiFeeDistribution);
  }, [chainId, rdntToken, multiFeeDistribution]);

  return (
    <MultiFeeDistributionServiceContext.Provider value={multiFeeDistributionService}>
      {children}
    </MultiFeeDistributionServiceContext.Provider>
  );
};

export const useMultiFeeDistributionService = () => {
  const context = useContext(MultiFeeDistributionServiceContext);
  if (!context) {
    throw new Error(
      'useMultiFeeDistributionService must be used within a MultiFeeDistributionServiceProvider'
    );
  }
  return context;
};

export const useMfdDefaultLockIndex = () => {
  const multiFeeDistributionService = useMultiFeeDistributionService();
  const { user } = useDynamicPoolDataContext();
  const userId = user?.id || '';

  return useQuery({
    // The queryKey needs serializable objects because it does not use referential equality which is why it uses
    // instanceId
    queryKey: ['mfdDefaultLockIndex', multiFeeDistributionService.instanceId, userId],
    queryFn: () => {
      if (!userId) return 0;
      return multiFeeDistributionService.getDefaultLockIndex(userId);
    },
    placeholderData: 0,
  });
};

export const useMfdLockedBalances = (chainId: number, tokenAddress: string) => {
  const mfdAddress = marketsDataByChainId[chainId as ChainId].addresses.multiFeeDistribution;
  const { user } = useDynamicPoolDataContext();
  const userId = user?.id || '';

  return useQuery({
    queryKey: ['mfdLockedBalances', chainId, tokenAddress, mfdAddress, userId],
    queryFn: () => {
      if (!userId) return [];
      const multiFeeDistributionService = new MultiFeeDistributionService(
        getProvider(chainId),
        tokenAddress,
        mfdAddress
      );
      return multiFeeDistributionService.getLockedBalances(userId);
    },
    placeholderData: [],
  });
};

export const useMfdLockedSupply = (chainId: number, tokenAddress: string) => {
  const mfdAddress = marketsDataByChainId[chainId as ChainId].addresses.multiFeeDistribution;

  return useQuery({
    queryKey: ['mfdLockedSupply', chainId, tokenAddress, mfdAddress],
    queryFn: () => {
      const multiFeeDistributionService = new MultiFeeDistributionService(
        getProvider(chainId),
        tokenAddress,
        mfdAddress
      );
      return multiFeeDistributionService.getLockedSupply();
    },
    placeholderData: 0,
  });
};

export const useMfdLockedSupplyWithMultiplier = (chainId: number, tokenAddress: string) => {
  const mfdAddress = marketsDataByChainId[chainId as ChainId].addresses.multiFeeDistribution;

  return useQuery({
    queryKey: ['mfdLockedSupplyWithMultiplier', chainId, tokenAddress, mfdAddress],
    queryFn: () => {
      const multiFeeDistributionService = new MultiFeeDistributionService(
        getProvider(chainId),
        tokenAddress,
        mfdAddress
      );
      return multiFeeDistributionService.getLockedSupplyWithMultiplier();
    },
    placeholderData: 0,
  });
};
