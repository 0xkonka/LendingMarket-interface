import React, { useContext, useState, useEffect, useCallback } from 'react';
import { valueToBigNumber } from '@aave/protocol-js';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { isEmpty } from 'helpers/utility';

type TokenPricesProviderContext = {
  tokenPrices: {
    decimals: number;
    price: number;
    symbol: string;
    rToken: string;
  }[];
};

const Context = React.createContext<TokenPricesProviderContext>({} as TokenPricesProviderContext);

export const TokenPricesProvider: React.FC = ({ children }) => {
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { reserves } = useDynamicPoolDataContext();

  const [tokenPrices, setTokenPrices] = useState<
    {
      decimals: number;
      price: number;
      symbol: string;
      rToken: string;
    }[]
  >([]);

  const getData = useCallback(async () => {
    if (!isEmpty(tokenPrices)) {
      return null;
    }

    try {
      let tokenPrices = [] as any;
      for (const reserve of reserves) {
        const price = valueToBigNumber(reserve.priceInMarketReferenceCurrency)
          .multipliedBy(marketRefPriceInUsd)
          .toNumber();

        tokenPrices = [
          ...tokenPrices,
          {
            decimals: reserve.decimals,
            symbol: reserve.symbol,
            rToken: reserve.aTokenAddress,
            price,
          },
        ];
      }
      setTokenPrices(tokenPrices);
    } catch (error) {
      console.log('useTokenPrices: Error => ', error);
    }
  }, [reserves, marketRefPriceInUsd]);

  useEffect(() => {
    if (!isEmpty(reserves) && !!marketRefPriceInUsd) {
      getData();
    }
  }, [reserves, marketRefPriceInUsd, getData]);

  return (
    <Context.Provider
      value={{
        tokenPrices,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTokenPrices = () => useContext(Context);
