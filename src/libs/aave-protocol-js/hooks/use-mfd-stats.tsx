import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
  useMemo,
} from 'react';
import { ethers } from 'ethers';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useLastDayTransferLazyQuery, useUsdTransferedsQuery } from 'libs/subgraph-provider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { ChainId } from '@radiantcapital/contract-helpers';

type MFDStatsProviderContext = {
  loading: boolean;
  lockingApr: number;
  lpLockingApr: number;
  lpLastDayTotal: number;
  lpMfdTotal: number;
  totalLockedLP: number;
  lockedSupplyWithMultiplier: number;
  otherChainLockApr: number;
  lockingAPRPerToken: any;
  lockDurations: { value: number; label: string; lockDuration: string; multiplier: number }[];
  distoParam: (chainId: number) => number;
  fetchMFDData: () => void;
  getZapAPR: (multiplier: number) => number;
  setOtherChainLockApr: Dispatch<SetStateAction<number>>;
};

const Context = React.createContext<MFDStatsProviderContext>({} as MFDStatsProviderContext);

export const MFDStatsProvider: React.FC = ({ children }) => {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { prices } = useRdntPrices();
  const [lockingApr, setLockingApr] = useState<number>(0);
  const [otherChainLockApr, setOtherChainLockApr] = useState<number>(0);

  const { data: usdTransferData } = useUsdTransferedsQuery();
  const {
    reserves,
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
  } = useDynamicPoolDataContext();

  const [getLastDayTransfer, { data: lastDayTransferData }] = useLastDayTransferLazyQuery();

  const distoParam = (chainId: number) => {
    if (chainId === 56) {
      return 0.0054 / 0.078;
    } else if (chainId === 42161) {
      return 0.00465 / 0.0794;
    } else return 1;
  };

  const calculateAverageApr = (value: number) => {
    return chainId === ChainId.mainnet ? value : value / 7;
  };

  const getData = useCallback(async () => {
    try {
      const { lpTokenPrice = 0 } = prices;
      if (lastDayTransferData && lastDayTransferData.newTransferAddeds.length > 0) {
        const lastDayTotalTransfer = parseFloat(
          ethers.utils.formatEther(lastDayTransferData.newTransferAddeds[0].totalTransferred)
        );
        const lastDayLpTransfer = parseFloat(
          ethers.utils.formatEther(lastDayTransferData.newTransferAddeds[0].lpUsdValue)
        );
        const totalTransfers = lastDayTransferData.totalTransferreds.filter(
          (transfer) => transfer.id === 'total'
        );
        const totalTransfer = parseFloat(
          ethers.utils.formatEther(totalTransfers[0].totalTransferred)
        );
        const lastDayLPUsd = calculateAverageApr(
          totalTransfer + lastDayLpTransfer - lastDayTotalTransfer
        );

        const lockDistoApr =
          totalLockedLP * lpTokenPrice > 0
            ? (distoParam(chainId) * (lastDayLPUsd * 365)) / (totalLockedLP * lpTokenPrice)
            : 0;

        setLpLockingApr(lockDistoApr);
        setLpLastDayTotal(lastDayLPUsd);
        const totalTransferPerAssets = lastDayTransferData.totalTransferreds.filter(
          (transfer) => transfer.id !== 'total' && transfer.id !== 'GLP' && transfer.id !== 'FRAX'
        );

        const lastUSDPerAsset = {} as any;
        let perAssetTotal = 0;

        reserves.forEach((reserve) => {
          const totalPerAsset = totalTransferPerAssets.filter(
            (item) => item.id.toLowerCase() === reserve.symbol.toLowerCase()
          )[0];
          if (!!totalPerAsset) {
            const totalPerAssetValue = parseFloat(
              ethers.utils.formatEther(totalPerAsset.totalTransferred)
            );
            const newTransfer = lastDayTransferData.newTransferAddeds[0];
            const lastAssetTotal = newTransfer.assetTotals?.filter(
              (assetTotal) => assetTotal.symbol === totalPerAsset.id
            )[0];
            const lastTotalPerAsset = lastAssetTotal?.totalTransferred
              ? parseFloat(ethers.utils.formatEther(lastAssetTotal.totalTransferred))
              : 0;
            const lastLPUSDPerAsset = totalPerAssetValue - lastTotalPerAsset;
            perAssetTotal += lastLPUSDPerAsset;
            lastUSDPerAsset[reserve.symbol] = lastLPUSDPerAsset;
          }
        });
        const getAprPerAsset = (usdPerAsset: number) => {
          return (usdPerAsset * lpLockingApr) / perAssetTotal;
        };

        const aprPerAsset = {} as any;

        Object.keys(lastUSDPerAsset).forEach((symbol) => {
          aprPerAsset[symbol] = getAprPerAsset(lastUSDPerAsset[symbol] ?? 0);
        });
        setAssetApr(aprPerAsset);
      }
      if (usdTransferData) {
        setLpMfdTotal(
          parseFloat(
            ethers.utils.formatEther(usdTransferData.usdTransfereds[0].totalLpUsdTransfered)
          )
        );
      }
    } catch (error) {
      console.log('useMFDstats: Error => ', error);
      setLoading(false);
    }
  }, [
    lastDayTransferData,
    prices,
    chainId,
    currentMarketData,
    usdTransferData,
    reserves,
    totalLockedLP,
    setLoading,
    setLpLockingApr,
    setLockingApr,
    setLpLastDayTotal,
    setLockDurations,
  ]);

  useEffect(() => {
    const period = chainId === 1 ? 86400 : 7 * 86400;
    const lastTimeStamp = Math.floor(Date.now() / 1000 - period);

    // On newer versions of @apollo/client, this causes errors because the query
    // is cancelled while it is running.
    getLastDayTransfer({
      variables: {
        lastTimeStamp: lastTimeStamp,
      },
    });
    const intervalId = setInterval(getLastDayTransfer, 60000);
    return () => clearInterval(intervalId);
  }, [prices, chainId, currentMarketData]);

  useEffect(() => {
    if (lastDayTransferData) {
      getData();
    }
  }, [prices, chainId, currentMarketData, lastDayTransferData, reserves]);

  const getZapAPR = useCallback(
    (multiplier: number) => {
      const apr = lpLockingApr * multiplier;
      return apr;
    },
    [lpLockingApr]
  );

  const lockingAPRPerToken = useMemo(() => {
    const aprPerToken = {} as any;
    reserves.forEach((reserve) => {
      aprPerToken[reserve.symbol] = assetApr[reserve.symbol];
    });
    return aprPerToken;
  }, [assetApr, reserves]);

  const value = useMemo(
    () => ({
      loading,
      lockDurations,
      lockingApr,
      lpLockingApr,
      lpLastDayTotal,
      lpMfdTotal,
      totalLockedLP,
      lockingAPRPerToken,
      lockedSupplyWithMultiplier,
      otherChainLockApr,
      distoParam,
      fetchMFDData: getData,
      getZapAPR,
      setOtherChainLockApr,
    }),
    [
      getData,
      getZapAPR,
      loading,
      lockDurations,
      lockedSupplyWithMultiplier,
      lockingAPRPerToken,
      lockingApr,
      lpLastDayTotal,
      lpLockingApr,
      lpMfdTotal,
      otherChainLockApr,
      totalLockedLP,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useMFDStats = () => useContext(Context);
