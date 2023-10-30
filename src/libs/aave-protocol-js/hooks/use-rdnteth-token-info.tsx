import React, { useContext, useState, useEffect } from 'react';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { POLLING_INTERVAL } from 'helpers/config/common';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { GeistTokenContract } from '../GeistToken/GeistTokenContract';

type RdntEthTokenInfoProviderContext = {
  tokenInfo: {
    walletBalance?: BigNumber;
    currencySymbol?: string;
    totalSupply?: BigNumber;
  };
};

const Context = React.createContext<RdntEthTokenInfoProviderContext>(
  {} as RdntEthTokenInfoProviderContext
);

export const RdntEthTokenInfoProvider: React.FC = ({ children }) => {
  const { userId = '' } = useStaticPoolDataContext();
  const { chainId, currentMarketData } = useProtocolDataContext();

  const [tokenInfo, setTokenInfo] = useState<{
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  }>({
    walletBalance: valueToBigNumber(0),
    currencySymbol: 'dLP',
    totalSupply: valueToBigNumber(0),
  });

  useEffect(() => {
    if (!userId) {
      return;
    }

    const stakingTokenContract = new GeistTokenContract(
      getProvider(chainId),
      currentMarketData.addresses.stakingToken
    );

    const getData = async () => {
      try {
        const info = await stakingTokenContract.getInfo(userId);
        setTokenInfo(info);
      } catch (error) {
        console.log('useRdntethTokenInfo => Error: ', error);
      }
    };

    document.addEventListener('stakeTxnConfirmed', () => {
      getData();
    });

    getData();
    const intervalId = setInterval(getData, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <Context.Provider
      value={{
        tokenInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useRdntethTokenInfo = () => useContext(Context);
