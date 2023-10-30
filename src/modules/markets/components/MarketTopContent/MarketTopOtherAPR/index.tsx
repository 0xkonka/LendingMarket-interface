import { useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import StatsInfoItem from 'components/StatsInfoItem';

import { useLastDayTransferQuery } from 'libs/subgraph-provider';
import { useMfdLockedSupply } from 'client/multifee-distribution-contract-queries';
import { ChainId } from '@radiantcapital/contract-helpers';

interface MarketTopOtherAPRProps {
  otherChain: string;
}

export default function MarketTopOtherAPR({ otherChain }: MarketTopOtherAPRProps) {
  const { prices, otherChainPrices } = useRdntPrices();
  const { currentMarketData, otherChainId, otherChainMarketData } = useProtocolDataContext();
  const { otherChainLockApr, setOtherChainLockApr, distoParam } = useMFDStats();
  const { data: otherChainTotalLockedLP = 0 } = useMfdLockedSupply(
    otherChainId,
    otherChainMarketData.addresses.stakingToken
  );

  const period = otherChainId === 1 ? 86400 : 7 * 86400;
  const lastTimeStamp = Math.floor(Date.now() / 1000 - period);

  const { data: lastDayTransferData } = useLastDayTransferQuery({
    variables: {
      lastTimeStamp: lastTimeStamp,
    },
  });

  const calculateAverageApr = (value: number) => {
    return otherChainId === ChainId.mainnet ? value : value / 7;
  };

  const getData = useCallback(() => {
    if (lastDayTransferData && otherChainMarketData) {
      try {
        const lastDayTotalTransfer =
          lastDayTransferData.newTransferAddeds.length > 0
            ? parseFloat(
                ethers.utils.formatEther(lastDayTransferData.newTransferAddeds[0].totalTransferred)
              )
            : 0;
        const lastDayLpTransfer =
          lastDayTransferData.newTransferAddeds.length > 0
            ? parseFloat(
                ethers.utils.formatEther(lastDayTransferData.newTransferAddeds[0].lpUsdValue)
              )
            : 0;

        const totalTransfers = lastDayTransferData.totalTransferreds.filter(
          (transfer) => transfer.id === 'total'
        );
        const totalTransfer = parseFloat(
          ethers.utils.formatEther(totalTransfers[0].totalTransferred)
        );
        const lastDayLPUsd = calculateAverageApr(
          totalTransfer + lastDayLpTransfer - lastDayTotalTransfer
        );

        const { lpTokenPrice: otherChainLpTokenPrice = 0 } = otherChainPrices;

        const otherChainApr =
          otherChainTotalLockedLP * otherChainLpTokenPrice > 0
            ? (distoParam(otherChainId) * (lastDayLPUsd * 365)) /
              (otherChainTotalLockedLP * otherChainLpTokenPrice)
            : 0;
        // TODO: Make this not set this globally, it should either be fully local or fully global
        setOtherChainLockApr(otherChainApr);
      } catch (error) {
        console.log(error);
      }
    }
  }, [otherChainId, otherChainTotalLockedLP, lastDayTransferData]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (lastDayTransferData) {
      getData();
    }
  }, [prices, otherChainId, currentMarketData, lastDayTransferData]);

  return (
    <div className="MarketTopOtherAPR">
      <StatsInfoItem
        className="MarketTopOtherAPR__otherChainApr"
        title={'Other chains'}
        value={25 * otherChainLockApr * 100}
        isPercent
        tokenSymbol={otherChainId === ChainId.bsc ? 'BNB' : 'ARETH'}
      />

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .MarketTopOtherAPR {
          &__otherChainApr {
            .StatsInfoItem__main-value-container p {
              font-weight: 500;
              font-size: 16px;
              line-height: 30px;
            }
          }
        }
      `}</style>
    </div>
  );
}
