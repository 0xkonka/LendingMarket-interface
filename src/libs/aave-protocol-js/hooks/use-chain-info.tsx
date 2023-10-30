import React, { useContext, useState, useEffect, useCallback } from 'react';

import { POLLING_INTERVAL } from 'helpers/config/common';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';

type ChainInfoProviderContext = {
  chainTime: string;
  blockNum: number;
  fetchChain: () => void;
};

const Context = React.createContext<ChainInfoProviderContext>({} as ChainInfoProviderContext);

export const ChainInfoProvider: React.FC = ({ children }) => {
  const [chainTime, setChainTime] = useState<string>('');
  const [blockNum, setBlockNum] = useState<number>(0);
  const { chainId } = useProtocolDataContext();

  const getData = useCallback(async () => {
    try {
      const block = await getProvider(chainId).getBlock('latest');
      const chainTime = new Date(block.timestamp * 1000);
      setChainTime(chainTime.toString());
      setBlockNum(block.number);
    } catch (error) {
      console.log('useChainInfo: Error => ', error);
    }
  }, [chainId, setChainTime, setBlockNum]);

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Context.Provider
      value={{
        chainTime,
        blockNum,
        fetchChain: getData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useChainInfo = () => useContext(Context);
