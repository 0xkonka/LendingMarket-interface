import React, { useContext, useMemo, useCallback, useEffect, useState } from 'react';
import { API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import {
  ReserveDataHumanized,
  UserReserveDataHumanized,
  ChainId,
} from '@radiantcapital/contract-helpers';
import BigNumber from 'bignumber.js';
import { valueToBigNumber } from '@aave/protocol-js';

import {
  formatReserve,
  FormatReserveResponse,
  formatUserSummary,
  FormatUserSummaryResponse,
  normalize,
} from '@aave/math-utils';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getNetworkConfig, getProvider } from 'helpers/config/markets-and-network-config';
import { RadiantV1AddressesProps, arbitrumMainV1, arbitrumGoerliV1 } from 'ui-config/migration';
import { usePoolData } from 'libs/pool-data-provider/hooks/use-pool-data';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useCachedProtocolData } from 'libs/caching-server-data-provider/hooks/use-cached-protocol-data';
import { ConnectionMode, useConnectionStatusContext } from 'libs/connection-status-provider';
import { useApolloConfigContext } from 'libs/apollo-config';
import { assetsOrder } from 'ui-config/assets';
import { useCurrentTimestamp } from 'libs/pool-data-provider/hooks/use-current-timestamp';
import { GeistTokenContract } from 'libs/aave-protocol-js/GeistToken/GeistTokenContract';

type MigrationInfoContext = {
  migrationChainId: ChainId;
  currentV1Address: RadiantV1AddressesProps;
  arbitrumMainV1: RadiantV1AddressesProps;
  reserves: ComputedReserveData[];
  user?: UserSummary;
  v1Balance: BigNumber;
};

export interface UserReserveDataExtended extends UserReserveDataHumanized {
  reserve: ReserveDataHumanized;
}

export interface UserSummary extends FormatUserSummaryResponse {
  id: string;
}

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

const Context = React.createContext<MigrationInfoContext>({} as MigrationInfoContext);

export const MigrationInfoProvider: React.FC = ({ children }) => {
  const { chainId } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const config = useMemo(() => getNetworkConfig(chainId), [chainId]);
  const { chainId: apolloClientChainId } = useApolloConfigContext();
  const [v1Balance, setV1Balance] = useState<BigNumber>(valueToBigNumber(0));

  const migrationChainId: ChainId = useMemo(
    () => (config.isTestnet ? ChainId.arbitrum_goerli : ChainId.arbitrum_one),
    [config]
  );

  const mainMigrationChainId = ChainId.arbitrum_one;

  const currentV1Address: RadiantV1AddressesProps = useMemo(
    () => (config.isTestnet ? arbitrumGoerliV1 : arbitrumMainV1),
    [config]
  );
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();

  const { data: cachedData } = useCachedProtocolData(
    arbitrumMainV1.lendingPoolAddressProvider.toLowerCase(),
    currentAccount,
    preferredConnectionMode === ConnectionMode.rpc || chainId !== apolloClientChainId
  );

  const { data: rpcData } = usePoolData(
    arbitrumMainV1.lendingPoolAddressProvider.toLowerCase(),
    chainId,
    arbitrumMainV1.uiPoolDataProvider ?? '',
    !isRPCActive,
    currentAccount
  );

  const fetchMigration = useCallback(async () => {
    if (currentAccount && mainMigrationChainId) {
      const v1Contract = new GeistTokenContract(
        getProvider(mainMigrationChainId),
        arbitrumMainV1.rdntToken
      );
      console.log('V1 ', arbitrumMainV1.rdntToken);
      const v1Info = await v1Contract.getInfo(currentAccount);
      setV1Balance(v1Info.walletBalance);
    }
  }, [currentAccount, mainMigrationChainId]);

  useEffect(() => {
    // Fetch balance initially
    fetchMigration();

    // Set up interval to fetch balance every 5 seconds (5000ms)
    const interval = setInterval(() => {
      fetchMigration();
    }, 3000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, [fetchMigration]);

  const activeData = useMemo(
    () => (isRPCActive && rpcData ? rpcData : cachedData),
    [isRPCActive, rpcData, cachedData]
  );
  const reserves: ReserveDataHumanized[] | undefined = useMemo(
    () =>
      activeData?.reserves?.reservesData.map((reserve) => ({
        ...reserve,
      })),
    [activeData?.reserves]
  );

  const reservesWithFixedUnderlying: ReserveDataHumanized[] | undefined = useMemo(
    () =>
      reserves
        ?.map((reserve) => {
          if (reserve.symbol.toUpperCase() === `W${config.baseAsset}`) {
            return {
              ...reserve,
              symbol: config.baseAsset,
              underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
            };
          }
          if (
            reserve.underlyingAsset.toLowerCase() ===
            '0x50379f632ca68d36e50cfbc8f78fe16bd1499d1e'.toLowerCase()
          ) {
            reserve.symbol = 'GUNIDAIUSDC';
          }
          if (
            reserve.underlyingAsset.toLowerCase() ===
            '0xd2eec91055f07fe24c9ccb25828ecfefd4be0c41'.toLowerCase()
          ) {
            reserve.symbol = 'GUNIUSDCUSDT';
          }
          return reserve;
        })
        .sort(
          ({ symbol: a }, { symbol: b }) =>
            assetsOrder.indexOf(a.toUpperCase()) - assetsOrder.indexOf(b.toUpperCase())
        ),
    [reserves, config]
  );

  const rawReserves = reservesWithFixedUnderlying ?? [];

  const currentTimestamp = useCurrentTimestamp(60);
  const marketRefCurrencyDecimals =
    activeData?.reserves?.baseCurrencyData?.marketReferenceCurrencyDecimals ?? 18;
  const marketReferenceCurrencyPriceInUsd =
    activeData?.reserves?.baseCurrencyData?.marketReferenceCurrencyPriceInUsd ?? '0';
  const marketRefPriceInUsd = normalize(marketReferenceCurrencyPriceInUsd, 8);
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

  const userReserves: UserReserveDataExtended[] = [];
  const rawUserReserves: UserReserveDataExtended[] = [];
  activeData?.userReserves?.forEach((userReserve) => {
    const reserve = reserves?.find(
      (reserve) =>
        reserve.underlyingAsset.toLowerCase() === userReserve.underlyingAsset.toLowerCase()
    );
    if (reserve) {
      const reserveWithBase: UserReserveDataExtended = {
        ...userReserve,
        reserve,
      };
      userReserves.push(reserveWithBase);
      if (reserve.symbol.toUpperCase() === `W${config.baseAsset}`) {
        const userReserveFixed: UserReserveDataExtended = {
          ...userReserve,
          underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          reserve: {
            ...reserve,
            symbol: config.baseAsset,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          },
        };
        rawUserReserves.push(userReserveFixed);
      } else {
        rawUserReserves.push(reserveWithBase);
      }
    }
  });

  const computedUserData = useMemo(() => {
    if (!currentAccount || !rawUserReserves) {
      return undefined;
    }

    return formatUserSummary({
      currentTimestamp,
      marketRefPriceInUsd,
      marketRefCurrencyDecimals,
      rawUserReserves: rawUserReserves,
    });
  }, [
    currentTimestamp,
    currentAccount,
    marketRefPriceInUsd,
    marketRefCurrencyDecimals,
    rawUserReserves,
  ]);

  const userSummary: UserSummary | undefined = useMemo(() => {
    let data: UserSummary | undefined = undefined;
    if (computedUserData && currentAccount) {
      data = {
        id: currentAccount,
        ...computedUserData,
      };
    }
    return data;
  }, [computedUserData, currentAccount]);

  return (
    <Context.Provider
      value={{
        migrationChainId,
        currentV1Address,
        arbitrumMainV1,
        reserves: formattedPoolReserves,
        user: userSummary,
        v1Balance,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMigrationInfo = () => useContext(Context);
