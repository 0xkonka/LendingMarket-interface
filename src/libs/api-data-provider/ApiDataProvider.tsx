import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getApiVersion } from 'helpers/apiVersion';
import { POLLING_INTERVAL } from 'helpers/config/common';

const CALL_MINUTES_UNIT = 60;
const CALL_LIMIT = 3;

type ApiDataProviderContext = {
  circulatingSupply: number;
  dailyFees: { totalPlatformFees?: number };
  lendingPoolRewards: { poolAPRs?: Array<any>; tokenAddresses?: Array<Object> };
  pool2Info: {
    lpTokenPrice?: number;
    pool2RewardsPerSecond?: number;
    totalLpStaked?: number;
    totalLpStakedUSD?: number;
    apr?: number;
  };
  stakingApr: number;
  lockingApr: number;
  totalPlatformFees: number;
  tokenPrices: [
    {
      symbol?: string;
      rToken?: string;
      price?: number;
    }
  ];
  lockingAPRPerToken: Array<any>;
  platformStats: {
    platformFeesPerSecondUSD?: number;
    penaltyFeesPerSecondUSD?: number;
    totalRevenuePerSecondUSD?: number;
  };
  tokenStats: {
    supplyLocked?: number;
    supplyLockedUSD?: number;
    totalStaked?: number;
    totalStakedUSD?: number;
    circulatingSupply?: number;
    marketCapUSD?: number;
  };
};

const Context = React.createContext<ApiDataProviderContext>({} as ApiDataProviderContext);

// https://vitejs.dev/guide/features.html#glob-import
// it should work but doesn't
// const chainConfigs = import.meta.glob('../../data/*.json');
const chainConfigs = {
  5: () => import('../../data/5.json'),
  56: () => import('../../data/56.json'),
  97: () => import('../../data/97.json'),
  31337: () => import('../../data/31337.json'),
  42161: () => import('../../data/42161.json'),
  43113: () => import('../../data/43113.json'),
};

export const ApiDataProvider: React.FC = ({ children }) => {
  const { chainId } = useProtocolDataContext();
  const [circulatingSupply, setCirculatingSupply] = useState<number>(0);
  const [dailyFees, setDailyFees] = useState<{ totalPlatformFees?: number }>({});
  const [lendingPoolRewards, setLendingPoolRewards] = useState<{
    poolAPRs?: Array<any>;
    tokenAddresses?: Array<Object>;
  }>({});
  const [pool2Info, setPool2Info] = useState<{
    lpTokenPrice?: number;
    pool2RewardsPerSecond?: number;
    totalLpStaked?: number;
    totalLpStakedUSD?: number;
    apr?: number;
  }>({});
  const [stakingApr, setStakingApr] = useState<number>(0);
  const [lockingApr, setLockingApr] = useState<number>(0);
  const [totalPlatformFees, setTotalPlatformFees] = useState<number>(0);
  const [tokenPrices, setTokenPrices] = useState<any>([]);
  const [lockingAPRPerToken, setLockingAPRPerToken] = useState<any>([]);
  const [platformStats, setPlatformStats] = useState<{
    platformFeesPerSecondUSD?: number;
    penaltyFeesPerSecondUSD?: number;
    totalRevenuePerSecondUSD?: number;
  }>({
    platformFeesPerSecondUSD: 0,
    penaltyFeesPerSecondUSD: 0,
    totalRevenuePerSecondUSD: 0,
  });
  const [tokenStats, setTokenStats] = useState<{
    supplyLocked?: number;
    supplyLockedUSD?: number;
    totalStaked?: number;
    totalStakedUSD?: number;
    circulatingSupply?: number;
    marketCapUSD?: number;
  }>({});

  const getData = useCallback(async () => {
    try {
      let callCounter = 0;
      let response: any;
      const currentDate = new Date();

      while (!response?.ok && callCounter < CALL_LIMIT) {
        const callDate = currentDate.setMinutes(
          currentDate.getMinutes() - CALL_MINUTES_UNIT * callCounter
        );
        const apiVersion = getApiVersion(new Date(callDate).getTime(), CALL_MINUTES_UNIT * 60);
        let { default: staticData } = await chainConfigs[chainId as keyof typeof chainConfigs]();

        // TODO: revert when we use API
        if (false) {
          response = await fetch(
            `https://${
              import.meta.env.VITE_SUBDOMAIN
            }.radiant.capital/${chainId}.json?v=${apiVersion}`
          );
        }
        response = staticData;
        callCounter++;
      }

      // TODO: revert when we use API
      // if (!response?.ok) {
      //   return null;
      // }

      const {
        circulatingSupply,
        dailyFees = {},
        lendingPoolRewards = {},
        pool2Info = {},
        tokenStakingRewards = {},
        tokenStats = {},
      } = response;

      setCirculatingSupply(circulatingSupply);
      setDailyFees(dailyFees?.data || {});
      setLendingPoolRewards(lendingPoolRewards?.data || {});
      setPool2Info(pool2Info?.data || {});
      setTokenPrices(tokenStakingRewards?.data?.rewardTokens);
      setStakingApr(tokenStakingRewards?.data?.stakingAPR);
      setLockingApr(tokenStakingRewards?.data?.lockingAPR);
      setLockingAPRPerToken(tokenStakingRewards?.data?.lockingAPRPerToken);
      setPlatformStats({
        platformFeesPerSecondUSD: tokenStakingRewards?.data?.platformFeesPerSecondUSD,
        penaltyFeesPerSecondUSD: tokenStakingRewards?.data?.penaltyFeesPerSecondUSD,
        totalRevenuePerSecondUSD: tokenStakingRewards?.data?.totalRevenuePerSecondUSD,
      });
      setTotalPlatformFees(tokenStakingRewards?.data?.totalPlatformFees);
      setTokenStats(tokenStats?.data || {});
    } catch (error) {
      console.log('ApiDataProviderContext: Error => ', error);
    }
  }, [
    chainId,
    setCirculatingSupply,
    setDailyFees,
    setLendingPoolRewards,
    setPool2Info,
    setTokenPrices,
    setStakingApr,
    setLockingApr,
    setLockingAPRPerToken,
    setPlatformStats,
    setTotalPlatformFees,
    setTokenStats,
  ]);

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, POLLING_INTERVAL * 10);
    return () => clearInterval(intervalId);
  }, [getData]);

  return (
    <Context.Provider
      value={{
        circulatingSupply,
        dailyFees,
        lendingPoolRewards,
        pool2Info,
        stakingApr,
        lockingApr,
        totalPlatformFees,
        tokenPrices,
        lockingAPRPerToken,
        platformStats,
        tokenStats,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useApiDataProviderContext = () => useContext(Context);
