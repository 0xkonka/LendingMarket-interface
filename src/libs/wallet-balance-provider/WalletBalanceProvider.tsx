import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { BigNumber } from 'ethers';

import { POLLING_INTERVAL } from 'helpers/config/common';
import {
  marketsData,
  getNetworkConfig,
  getProvider,
  CustomMarket,
} from 'helpers/config/markets-and-network-config';
import { WalletBalanceProviderFactory } from 'libs/pool-data-provider/contracts/WalletBalanceProviderContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';

type WalletBalanceContractData = {
  0: string[];
  1: BigNumber[];
};

type WalletBalanceProviderContext = {
  markets: {
    [key in keyof typeof CustomMarket]?: {
      [address: string]: string;
    };
  };
  marketsLoading: boolean;
  subscribeToMarket: (market: CustomMarket) => void;
  unsubscribeFromMarket: (market: CustomMarket) => void;
  refetch: () => void;
};

const Context = React.createContext<WalletBalanceProviderContext>(
  {} as WalletBalanceProviderContext
);

export const WalletBalanceProvider: React.FC = ({ children }) => {
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const [markets, setMarkets] = React.useState<{
    [key in keyof typeof CustomMarket]?: {
      [address: string]: string;
    };
  }>({});
  const [marketsLoading, setMarketsLoading] = React.useState(false);
  const [observedMarkets, setObservedMarkets] = React.useState<CustomMarket[]>([]);

  const uniqueMarkets = useMemo(
    () => observedMarkets.filter((value, ix, self) => self.indexOf(value) === ix),
    [observedMarkets]
  );

  const subscribeToMarket = useCallback((market: CustomMarket) => {
    setObservedMarkets((currentObservedMarkets) => [...currentObservedMarkets, market]);
  }, []);

  const unsubscribeFromMarket = useCallback((market: CustomMarket) => {
    setObservedMarkets((currentObservedMarkets) => {
      const index = currentObservedMarkets.indexOf(market);
      return [...currentObservedMarkets].splice(index, 1);
    });
  }, []);

  const fetchFunctions = useMemo(() => {
    return uniqueMarkets.map((market) => {
      const marketData = marketsData[market];
      const networkConfig = getNetworkConfig(marketData.chainId);
      const provider = getProvider(marketData.chainId);
      const contract = WalletBalanceProviderFactory.connect(
        networkConfig.addresses.walletBalanceProvider,
        provider
      );

      return async () => {
        const { 0: reserves, 1: balances }: WalletBalanceContractData =
          await contract.getUserWalletBalances(
            marketData.addresses.lendingPoolAddressProvider.toLowerCase(),
            walletAddress
          );

        const aggregatedBalance = reserves.reduce((acc, reserve, i) => {
          acc[reserve.toLowerCase()] = balances[i].toString();
          return acc;
        }, {} as { [address: string]: string });
        setMarkets((prev) => ({ ...prev, [market]: aggregatedBalance }));
      };
    });
  }, [uniqueMarkets, walletAddress]);

  const refetch = useCallback(async () => {
    setMarketsLoading(true);
    try {
      await Promise.all(fetchFunctions.map((fn) => fn()));
    } catch (e) {
      console.log('error fetching balances', e);
    }
    setMarketsLoading(false);
  }, [fetchFunctions]);

  useEffect(() => {
    if (!walletAddress) return;
    refetch();
    const interval = setInterval(refetch, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [refetch, walletAddress]);

  // whenever address changes or gets unset, unset balances
  useEffect(() => {
    setMarkets({});
  }, [walletAddress]);

  const value = useMemo(
    () => ({
      markets,
      subscribeToMarket,
      unsubscribeFromMarket,
      marketsLoading,
      refetch,
    }),
    [markets, marketsLoading, refetch, subscribeToMarket, unsubscribeFromMarket]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

type UseWalletBalanceProviderContextProps = {
  market?: CustomMarket;
  skip?: boolean;
};
/**
 * Returns current wallet balance for the provided market.
 * Falls back to current market when no market is provided.
 */
export const useWalletBalanceProviderContext = ({
  market,
  skip,
}: UseWalletBalanceProviderContextProps = {}) => {
  const { currentMarket } = useProtocolDataContext();
  const { markets, marketsLoading, refetch, subscribeToMarket, unsubscribeFromMarket } =
    useContext(Context);

  useEffect(() => {
    if (skip) return;
    subscribeToMarket(market || currentMarket);
    return () => unsubscribeFromMarket(market || currentMarket);
  }, [market, currentMarket, skip, subscribeToMarket, unsubscribeFromMarket]);
  return {
    walletData: markets[market || currentMarket] || {},
    loading: marketsLoading,
    refetch: refetch,
  };
};
