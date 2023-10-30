import React, { PropsWithChildren, useCallback, useContext, useState, useEffect } from 'react';
import { providers } from 'ethers';
import { ChainId } from '@radiantcapital/contract-helpers';

import { MarketDataType, NetworkConfig } from 'helpers/config/types';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
  getProvider,
  CustomMarket,
} from 'helpers/config/markets-and-network-config';

const LS_KEY = 'selectedMarket';
const OS_KEY = 'otherChainMarket';

export interface ProtocolContextData {
  currentMarket: CustomMarket;
  otherChainMarket: CustomMarket;
  setOtherChainMarket: (market: CustomMarket) => void;
  setCurrentMarket: (market: CustomMarket) => void;
  currentMarketData: MarketDataType;
  otherChainMarketData: MarketDataType;
  chainId: number;
  otherChainId: ChainId;
  setOtherChainId: React.Dispatch<React.SetStateAction<ChainId>>;
  networkConfig: NetworkConfig;
  jsonRpcProvider: providers.Provider;
}

const PoolDataContext = React.createContext({} as ProtocolContextData);

/**
 * @returns the last accessed market if it's still available, the first market if not.
 */
const getInitialMarket = () => {
  const cachedMarket = localStorage.getItem(LS_KEY) as CustomMarket | undefined;
  if (cachedMarket && availableMarkets.includes(cachedMarket)) return cachedMarket;
  return availableMarkets[0];
};

const getInitialOtherChainMarket = () => {
  const cachedMarket = localStorage.getItem(OS_KEY) as CustomMarket | undefined;
  if (cachedMarket && availableMarkets.includes(cachedMarket)) return cachedMarket;
  return availableMarkets[0];
};

export function ProtocolDataProvider({ children }: PropsWithChildren<{}>) {
  const [otherChainId, setOtherChainId] = useState<ChainId>(() =>
    getInitialMarket() === CustomMarket.bsc ? ChainId.arbitrum_one : ChainId.bsc
  );
  const [currentMarket, setCurrentMarket] = useState<CustomMarket>(getInitialMarket());
  const [otherChainMarket, setOtherChainMarket] = useState<CustomMarket>(
    getInitialOtherChainMarket()
  );

  const currentMarketData = marketsData[currentMarket];
  const otherChainMarketData = marketsData[otherChainMarket];

  const handleSetMarket = useCallback(
    (market: CustomMarket) => {
      localStorage.setItem(LS_KEY, market);
      setCurrentMarket(market);
      setOtherChainId(market === CustomMarket.bsc ? ChainId.arbitrum_one : ChainId.bsc);
    },
    [setCurrentMarket]
  );

  const handleSetOtherChainMarket = useCallback(
    (market: CustomMarket) => {
      localStorage.setItem(OS_KEY, market);
      setOtherChainMarket(market);
    },
    [setOtherChainMarket]
  );

  useEffect(() => {
    const otherChainMarket = availableMarkets.filter((market) => {
      const marketData = marketsData[market];
      return otherChainId === marketData.chainId;
    });
    handleSetOtherChainMarket(otherChainMarket[0]);
  }, [otherChainId]);

  return (
    <PoolDataContext.Provider
      value={{
        currentMarket,
        chainId: currentMarketData.chainId,
        otherChainMarket,
        otherChainId,
        setOtherChainId,
        setOtherChainMarket: handleSetOtherChainMarket,
        setCurrentMarket: handleSetMarket,
        currentMarketData: currentMarketData,
        otherChainMarketData,
        networkConfig: getNetworkConfig(currentMarketData.chainId),
        jsonRpcProvider: getProvider(currentMarketData.chainId),
      }}
    >
      {children}
    </PoolDataContext.Provider>
  );
}

export const useProtocolDataContext = () => useContext(PoolDataContext);
