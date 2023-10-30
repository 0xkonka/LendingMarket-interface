import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ReservesDataHumanized,
  UserReserveDataHumanized,
  ChainId,
  ReserveDataHumanized,
} from '@radiantcapital/contract-helpers';

import { POLLING_INTERVAL } from 'helpers/config/common';
import { usePolling } from 'libs/hooks/use-polling';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { ChefIncentivesService } from 'libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';

export interface ReserveDataHumanized2 extends ReserveDataHumanized {
  depositRewardsPerSec?: number;
  borrowRewardsPerSec?: number;
  rewardEligableDeposits?: string;
  rewardEligableBorrows?: string;
}

export interface PoolDataResponse {
  loading: boolean;
  error: boolean;
  data: {
    reserves?: ReservesDataHumanized;
    userReserves?: UserReserveDataHumanized[];
  };
  refresh: () => Promise<any>;
}

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function usePoolData(
  lendingPoolAddressProvider: string,
  chainId: ChainId,
  poolDataProviderAddress: string,
  skip: boolean,
  userAddress?: string
): PoolDataResponse {
  const currentAccount: string | undefined = userAddress ? userAddress.toLowerCase() : undefined;
  const [loadingReserves, setLoadingReserves] = useState<boolean>(false);
  const [errorReserves, setErrorReserves] = useState<boolean>(false);
  const [loadingUserReserves, setLoadingUserReserves] = useState<boolean>(false);
  const [errorUserReserves, setErrorUserReserves] = useState<boolean>(false);
  const [reserves, setReserves] = useState<ReservesDataHumanized | undefined>(undefined);
  const [userReserves, setUserReserves] = useState<UserReserveDataHumanized[] | undefined>(
    undefined
  );
  const { currentMarketData } = useProtocolDataContext();

  // Fetch and format reserve incentive data from UiIncentiveDataProvider contract
  const fetchReserves = useCallback(async () => {
    const provider = getProvider(chainId);
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: poolDataProviderAddress,
      provider,
    });

    const chefChefIncentivesService = new ChefIncentivesService(
      provider,
      currentMarketData.addresses.chefIncentivesController
    );

    try {
      setLoadingReserves(true);
      const [totalApsValue, globalRewardsPerSecValue, reservesResponse]: [
        any,
        any,
        ReservesDataHumanized
      ] = await Promise.all([
        chefChefIncentivesService.totalAllocPoint(),
        chefChefIncentivesService.rewardsPerSecond(),
        poolDataProviderContract.getReservesHumanized(lendingPoolAddressProvider),
      ]);
      const totalAps = totalApsValue.toNumber();
      const globalRewardsPerSec = parseFloat(ethers.utils.formatEther(globalRewardsPerSecValue));
      reservesResponse.reservesData.forEach((r) => (r.stableBorrowRateEnabled = false));

      const data = reservesResponse.reservesData;
      for (let index = 0; index < data.length; index++) {
        const reserve: ReserveDataHumanized2 = data[index];

        const [aTokenPoolInfo, debtTokenPoolInfo] = await Promise.all([
          chefChefIncentivesService.poolInfo(reserve.aTokenAddress),
          chefChefIncentivesService.poolInfo(reserve.variableDebtTokenAddress),
        ]);
        reserve.depositRewardsPerSec =
          totalAps > 0
            ? (aTokenPoolInfo.allocPoint.toNumber() / totalAps) * globalRewardsPerSec
            : 0;
        reserve.borrowRewardsPerSec =
          totalAps > 0
            ? (debtTokenPoolInfo.allocPoint.toNumber() / totalAps) * globalRewardsPerSec
            : 0;
        reserve.rewardEligableDeposits = ethers.utils.formatUnits(
          aTokenPoolInfo.totalSupply,
          reserve.decimals
        );
        reserve.rewardEligableBorrows = ethers.utils.formatUnits(
          debtTokenPoolInfo.totalSupply,
          reserve.decimals
        );
      }

      setReserves(reservesResponse);
      setErrorReserves(false);
    } catch (e) {
      console.log('error => ', e);
      setErrorReserves(e.message);
    }
    setLoadingReserves(false);
  }, [
    chainId,
    poolDataProviderAddress,
    lendingPoolAddressProvider,
    currentMarketData,
    setReserves,
    setErrorReserves,
    setLoadingReserves,
  ]);

  // Fetch and format user incentive data from UiIncentiveDataProvider
  const fetchUserReserves = useCallback(async () => {
    if (!currentAccount) return;
    const provider = getProvider(chainId);
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: poolDataProviderAddress,
      provider,
    });

    try {
      setLoadingUserReserves(true);
      const userReservesResponse: UserReserveDataHumanized[] =
        await poolDataProviderContract.getUserReservesHumanized(
          lendingPoolAddressProvider,
          currentAccount
        );

      setUserReserves(userReservesResponse);
      setErrorUserReserves(false);
    } catch (e) {
      console.log('e', e);
      setErrorUserReserves(e.message);
    }
    setLoadingUserReserves(false);
  }, [
    chainId,
    poolDataProviderAddress,
    lendingPoolAddressProvider,
    setUserReserves,
    setErrorUserReserves,
    setLoadingUserReserves,
  ]);

  usePolling(fetchReserves, POLLING_INTERVAL, skip, [skip, poolDataProviderAddress, chainId]);
  usePolling(fetchUserReserves, POLLING_INTERVAL, skip, [
    skip,
    poolDataProviderAddress,
    chainId,
    currentAccount,
  ]);

  const loading = loadingReserves || loadingUserReserves;
  const error = errorReserves || errorUserReserves;
  return {
    loading,
    error,
    data: { reserves, userReserves },
    refresh: () => {
      return Promise.all([fetchUserReserves(), fetchReserves()]);
    },
  };
}
