// @ts-nocheck
import React, { ReactElement, ReactNode, useContext, useMemo } from 'react';
import { API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import { ChainId } from '@radiantcapital/contract-helpers';
import { normalize } from '@aave/math-utils';
import { ReserveDataHumanized, UserReserveDataHumanized } from '@radiantcapital/contract-helpers';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { NetworkConfig } from 'helpers/config/types';
import { useCachedProtocolData } from 'libs/caching-server-data-provider/hooks/use-cached-protocol-data';
import { useApolloConfigContext } from 'libs/apollo-config';
import { ConnectionMode, useConnectionStatusContext } from 'libs/connection-status-provider';
import { assetsOrder } from 'ui-config/assets';
import { usePoolData } from '../hooks/use-pool-data';

/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '');
};

export interface UserReserveDataExtended extends UserReserveDataHumanized {
  reserve: ReserveDataHumanized;
}

export interface StaticPoolDataContextData {
  userId?: string;
  chainId: ChainId;
  networkConfig: NetworkConfig;
  isUserHasDeposits: boolean;
  rawReserves: ReserveDataHumanized[];
  rawUserReserves?: UserReserveDataExtended[];
  rawReservesWithBase: ReserveDataHumanized[];
  rawUserReservesWithBase?: UserReserveDataExtended[];
  marketRefCurrencyDecimals: number;
  marketRefPriceInUsd: string;
  WrappedBaseNetworkAssetAddress: string;
  refresh: () => Promise<void>;
}

const StaticPoolDataContext = React.createContext({} as StaticPoolDataContextData);

interface StaticPoolDataProviderProps {
  children: ReactNode;
  loader: ReactElement;
  errorPage: ReactElement;
}

export function StaticPoolDataProvider({
  children,
  loader,
  errorPage,
}: StaticPoolDataProviderProps) {
  const { currentAccount } = useUserWalletDataContext();
  const { chainId: apolloClientChainId } = useApolloConfigContext();
  const { currentMarketData, chainId, networkConfig } = useProtocolDataContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const RPC_ONLY_MODE = networkConfig.rpcOnly;

  const {
    error: cachedDataError,
    loading: cachedDataLoading,
    data: cachedData,
  } = useCachedProtocolData(
    currentMarketData.addresses.lendingPoolAddressProvider.toLowerCase(),
    currentAccount,
    preferredConnectionMode === ConnectionMode.rpc || chainId !== apolloClientChainId
  );

  const {
    error: rpcDataError,
    loading: rpcDataLoading,
    data: rpcData,
    refresh,
  } = usePoolData(
    currentMarketData.addresses.lendingPoolAddressProvider.toLowerCase(),
    chainId,
    networkConfig.addresses.uiPoolDataProvider,
    !isRPCActive,
    currentAccount
  );

  const activeData = useMemo(
    () => (isRPCActive && rpcData ? rpcData : cachedData),
    [isRPCActive, rpcData, cachedData]
  );

  const reserves = useMemo(
    () =>
      activeData.reserves?.reservesData.map(
        (reserve): ReserveDataHumanized => ({
          ...reserve,
        })
      ) || [],
    [activeData.reserves]
  );

  const reservesWithFixedUnderlying = useMemo(
    () =>
      reserves
        ?.map((reserve): ReserveDataHumanized => {
          if (reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
            return {
              ...reserve,
              symbol: networkConfig.baseAsset,
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
        ) || [],
    [reserves, networkConfig]
  );

  const userReserves: UserReserveDataExtended[] = [];
  const userReservesWithFixedUnderlying: UserReserveDataExtended[] = [];
  activeData.userReserves?.forEach((userReserve) => {
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
      if (reserve.symbol.toUpperCase() === `W${networkConfig.baseAsset}`) {
        const userReserveFixed: UserReserveDataExtended = {
          ...userReserve,
          underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          reserve: {
            ...reserve,
            symbol: networkConfig.baseAsset,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          },
        };
        userReservesWithFixedUnderlying.push(userReserveFixed);
      } else {
        userReservesWithFixedUnderlying.push(reserveWithBase);
      }
    }
  });

  const isUserHasDeposits = useMemo(
    () => userReserves.some((userReserve) => userReserve.scaledATokenBalance !== '0'),
    [userReserves]
  );

  if ((isRPCActive && rpcDataLoading && !rpcData) || (!isRPCActive && cachedDataLoading)) {
    return loader;
  }

  if (!activeData || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    // return errorPage;
  }

  if (!RPC_ONLY_MODE && isRPCActive && rpcData) {
    console.log('switched to RPC');
  }

  const {
    reserves: {
      baseCurrencyData: {
        marketReferenceCurrencyPriceInUsd: marketRefPriceInUsd = '0',
        marketReferenceCurrencyDecimals: marketRefCurrencyDecimals = 18,
      } = {},
    } = {},
  } = activeData;

  return (
    <StaticPoolDataContext.Provider
      value={{
        userId: currentAccount,
        chainId,
        networkConfig,
        refresh: isRPCActive ? refresh : async () => {},
        WrappedBaseNetworkAssetAddress: networkConfig.baseAssetWrappedAddress
          ? networkConfig.baseAssetWrappedAddress
          : '', // TO-DO: Replace all instances of this with the value from protocol-data-provider instead
        rawReserves: reservesWithFixedUnderlying,
        rawUserReserves: userReservesWithFixedUnderlying,
        rawReservesWithBase: reserves,
        rawUserReservesWithBase: userReserves,
        marketRefPriceInUsd: normalize(marketRefPriceInUsd, 8),
        marketRefCurrencyDecimals,
        isUserHasDeposits,
      }}
    >
      {children}
    </StaticPoolDataContext.Provider>
  );
}

export const useStaticPoolDataContext = () => useContext(StaticPoolDataContext);
