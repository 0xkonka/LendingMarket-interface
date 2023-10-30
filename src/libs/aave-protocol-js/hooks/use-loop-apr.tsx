import React, { useContext, useState, useEffect, useCallback } from 'react';

import { isEmpty } from 'helpers/utility';
import { POLLING_INTERVAL } from 'helpers/config/common';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import useRdntLendingPoolRewards from './use-rdnt-lending-pool-rewards';

type LoopAprProviderContext = {
  highLoopApr: number;
  loopAprs: { symbol: string; loopApr: number }[];
  fetchLoopData: () => void;
};

const Context = React.createContext<LoopAprProviderContext>({} as LoopAprProviderContext);

export const LoopAprProvider: React.FC = ({ children }) => {
  const { reserves } = useDynamicPoolDataContext();
  const { getRewardApr, getLoopApr } = useRdntLendingPoolRewards();

  const [highLoopApr, setHighLoopApr] = useState<number>(0);
  const [loopAprs, setLoopAprs] = useState<{ symbol: string; loopApr: number }[]>([]);

  const getData = useCallback(async () => {
    try {
      let highLoopApr = 0;
      let loopAprs: { symbol: string; loopApr: number }[] = [];
      for (const reserve of reserves) {
        const { rdntRewardsDepositApr = 0, rdntRewardsBorrowApr = 0 } = getRewardApr(reserve);
        const loopApr = getLoopApr(reserve, rdntRewardsDepositApr, rdntRewardsBorrowApr);

        if (highLoopApr < loopApr) {
          highLoopApr = loopApr;
        }

        loopAprs = [...loopAprs, { symbol: reserve.symbol, loopApr }];
      }
      setHighLoopApr(highLoopApr);
      setLoopAprs(loopAprs);
    } catch (error) {
      console.log('useMFDstats: Error => ', error);
    }
  }, [setHighLoopApr, setLoopAprs, getRewardApr, getLoopApr]);

  useEffect(() => {
    if (!isEmpty(reserves)) {
      getData();
      const intervalId = setInterval(getData, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [reserves, getData]);

  return (
    <Context.Provider
      value={{
        highLoopApr,
        loopAprs,
        fetchLoopData: getData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useLoopApr = () => useContext(Context);
