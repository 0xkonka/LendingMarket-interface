import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  formatReserve,
  FormatReserveResponse,
  formatUserSummary,
  FormatUserSummaryResponse,
  normalize,
} from '@aave/math-utils';

import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import { useStaticPoolDataContext } from './static-pool-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import {
  useMfdLockedSupply,
  useMfdLockedSupplyWithMultiplier,
} from 'client/multifee-distribution-contract-queries';

export interface ComputedReserveData extends FormatReserveResponse {
  id: string;
  underlyingAsset: string;
  name: string;
  symbol: string;
  decimals: number;
  usageAsCollateralEnabled: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  isActive: boolean;
  isFrozen: boolean;
  aTokenAddress: string;
  stableDebtTokenAddress: string;
  variableDebtTokenAddress: string;
  priceInMarketReferenceCurrency: string;
  avg30DaysLiquidityRate?: string;
  avg30DaysVariableBorrowRate?: string;
  depositRewardsPerSec?: number;
  borrowRewardsPerSec?: number;
  rewardEligableDeposits?: string;
  rewardEligableBorrows?: string;
}

export interface UserSummary extends FormatUserSummaryResponse {
  id: string;
}

export interface DynamicPoolDataContextData {
  reserves: ComputedReserveData[];
  user?: UserSummary;
  lockedSupplyWithMultiplier: number;
  lockDurations: {
    value: number;
    label: string;
    lockDuration: string;
    multiplier: number;
  }[];
  totalLockedLP: number;
  lpLockingApr: number;
  lpLastDayTotal: number;
  lpMfdTotal: number;
  loading: boolean;
  assetApr: any;
  setAssetApr: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLpMfdTotal: React.Dispatch<React.SetStateAction<number>>;
  setLpLastDayTotal: React.Dispatch<React.SetStateAction<number>>;
  setLpLockingApr: React.Dispatch<React.SetStateAction<number>>;
  setLockDurations: React.Dispatch<
    React.SetStateAction<
      {
        value: number;
        label: string;
        lockDuration: string;
        multiplier: number;
      }[]
    >
  >;
}

const DynamicPoolDataContext = React.createContext({} as DynamicPoolDataContextData);

export function DynamicPoolDataProvider({ children }: PropsWithChildren<{}>) {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { rawReserves, rawUserReserves, userId, marketRefCurrencyDecimals, marketRefPriceInUsd } =
    useStaticPoolDataContext();
  const currentTimestamp = useCurrentTimestamp(60);
  const { data: lockedSupplyWithMultiplier = 0 } = useMfdLockedSupplyWithMultiplier(
    chainId,
    currentMarketData.addresses.rdntToken
  );
  const [lockDurations, setLockDurations] = useState<
    { value: number; label: string; lockDuration: string; multiplier: number }[]
  >([]);
  const { data: totalLockedLP = 0 } = useMfdLockedSupply(
    chainId,
    currentMarketData.addresses.rdntToken
  );
  const [lpLockingApr, setLpLockingApr] = useState<number>(0);
  const [lpLastDayTotal, setLpLastDayTotal] = useState<number>(0);
  const [lpMfdTotal, setLpMfdTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [assetApr, setAssetApr] = useState<any>({});

  const getData = useCallback(async () => {
    const multiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const lockDurations = await multiFeeDistributionService.getLockDurations();
    setLockDurations(lockDurations);
  }, [chainId, currentMarketData, setLockDurations]);

  useEffect(() => {
    getData();
  }, [getData]);

  const computedUserData = useMemo(() => {
    if (!userId || !rawUserReserves) {
      return undefined;
    }

    return formatUserSummary({
      currentTimestamp,
      marketRefPriceInUsd,
      marketRefCurrencyDecimals,
      rawUserReserves: rawUserReserves,
    });
  }, [currentTimestamp, userId, marketRefPriceInUsd, marketRefCurrencyDecimals, rawUserReserves]);

  const formattedPoolReserves: ComputedReserveData[] = useMemo(
    () =>
      rawReserves.map((reserve) => {
        const formattedReserve = formatReserve({
          reserve,
          currentTimestamp,
        });
        const fullReserve: ComputedReserveData = {
          ...reserve,
          ...formattedReserve,
          priceInMarketReferenceCurrency: normalize(
            reserve.priceInMarketReferenceCurrency,
            marketRefCurrencyDecimals
          ),
        };
        return fullReserve;
      }),
    [rawReserves, currentTimestamp, marketRefCurrencyDecimals]
  );

  const userSummary: UserSummary | undefined = useMemo(() => {
    let data: UserSummary | undefined = undefined;
    if (computedUserData && userId) {
      data = {
        id: userId,
        ...computedUserData,
      };
    }
    return data;
  }, [computedUserData, userId]);

  return (
    <DynamicPoolDataContext.Provider
      value={{
        user: userSummary,
        reserves: formattedPoolReserves,
        lockedSupplyWithMultiplier,
        lockDurations,
        totalLockedLP,
        lpLockingApr,
        lpLastDayTotal,
        lpMfdTotal,
        loading,
        assetApr,
        setAssetApr,
        setLoading,
        setLpMfdTotal,
        setLpLastDayTotal,
        setLpLockingApr,
        setLockDurations,
      }}
    >
      {children}
    </DynamicPoolDataContext.Provider>
  );
}

export const useDynamicPoolDataContext = () => useContext(DynamicPoolDataContext);
