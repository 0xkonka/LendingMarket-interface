import React, { useContext, useState, useEffect, useCallback } from 'react';

import { POLLING_INTERVAL } from 'helpers/config/common';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { PriceProviderContract } from '../PriceProvider/PriceProviderContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';

type RdntPricesProviderContext = {
  prices: {
    tokenPrice?: number;
    lpTokenPrice?: number;
    nativePrice?: number;
    rawTokenPrice?: number;
  };
  otherChainPrices: {
    tokenPrice?: number;
    lpTokenPrice?: number;
    nativePrice?: number;
    rawTokenPrice?: number;
  };
  fetchPrice: () => void;
};

const Context = React.createContext<RdntPricesProviderContext>({} as RdntPricesProviderContext);

export const RdntPricesProvider: React.FC = ({ children }) => {
  const [prices, setPrices] = useState<{
    tokenPrice?: number;
    lpTokenPrice?: number;
    nativePrice?: number;
    rawTokenPrice?: number;
  }>({});
  const [otherChainPrices, setOtherChainPrices] = useState<{
    tokenPrice?: number;
    lpTokenPrice?: number;
    nativePrice?: number;
    rawTokenPrice?: number;
  }>({});

  const { chainId, currentMarketData, otherChainId, otherChainMarketData } =
    useProtocolDataContext();

  const getData = useCallback(async () => {
    try {
      if (!!otherChainMarketData && otherChainMarketData.addresses) {
        const otherChainPriceProviderContract = new PriceProviderContract(
          getProvider(otherChainId),
          otherChainMarketData.addresses
        );
        setOtherChainPrices(await otherChainPriceProviderContract.getPrices());
      }
      const priceProviderContract = new PriceProviderContract(
        getProvider(chainId),
        currentMarketData.addresses
      );

      setPrices(await priceProviderContract.getPrices());
    } catch (error) {
      console.log('useRdntPrices: Error => ', error);
    }
  }, [chainId, setPrices, otherChainId, setOtherChainPrices]);

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Context.Provider
      value={{
        prices,
        otherChainPrices,
        fetchPrice: getData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useRdntPrices = () => useContext(Context);
