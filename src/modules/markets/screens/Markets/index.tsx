import { useCallback, useEffect, useState } from 'react';
import { valueToBigNumber } from '@aave/protocol-js';
import { ChainId } from '@radiantcapital/contract-helpers';

import { marketsData } from 'ui-config/markets';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import BuyRDNTModal from 'components/BuyRDNTModal';
import ZapLPModal from 'components/ZapLPModal';
import MarketChain from 'components/MarketChain';
import PageMainHeader from 'components/PageMainHeader';
import MarketTopContent from '../../components/MarketTopContent';
import MarketAssetsContent from '../../components/MarketAssetsContent';
import { availableMarkets } from 'helpers/config/markets-and-network-config';
import { isEmpty } from 'helpers/utility';
import BannerClaimArbAirdrop from 'components/BannerClaimArbAirdrop';

export default function Markets() {
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { reserves } = useDynamicPoolDataContext();
  const { getRewardApr, getLoopApr } = useRdntLendingPoolRewards();
  useWalletBalanceProviderContext();

  const { currentMarketData } = useProtocolDataContext();
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openZapModal, setOpenZapModal] = useState(false);
  const [totalLockedInUsd, setTotalLockedInUsd] = useState(valueToBigNumber('0'));
  const [marketData, setMarketData] = useState<any[]>([]);
  const [otherChain, setOtherChain] = useState<string>('bnb');
  const { otherChainId, setOtherChainId } = useProtocolDataContext();

  useEffect(() => {
    for (const availableMarket of availableMarkets) {
      const marketData = marketsData[availableMarket];

      if (
        currentMarketData.chainId !== marketData.chainId &&
        currentMarketData.chainSymbol !== marketData.chainSymbol &&
        marketData.chainId !== ChainId.local &&
        marketData.chainId !== otherChainId &&
        (marketData.chainId === ChainId.arbitrum_goerli ||
          marketData.chainId === ChainId.bsc_testnet)
      ) {
        setOtherChain(marketData?.chainSymbol || '');
        setOtherChainId(marketData?.chainId);
      }
    }
  }, [currentMarketData]);

  const getMarketData = useCallback(() => {
    let totalLockedInUsd = valueToBigNumber('0');

    const marketData = reserves
      .filter((res) => res.isActive && !res.isFrozen)
      .map((reserve) => {
        totalLockedInUsd = totalLockedInUsd.plus(
          valueToBigNumber(reserve.totalLiquidity)
            .multipliedBy(reserve.priceInMarketReferenceCurrency)
            .multipliedBy(marketRefPriceInUsd)
        );

        const totalLiquidity = Number(reserve.totalLiquidity);
        const totalLiquidityInUSD = valueToBigNumber(reserve.totalLiquidity)
          .multipliedBy(reserve.priceInMarketReferenceCurrency)
          .multipliedBy(marketRefPriceInUsd)
          .toNumber();

        const totalBorrows = Number(reserve.totalDebt);
        const totalBorrowsInUSD = valueToBigNumber(reserve.totalDebt)
          .multipliedBy(reserve.priceInMarketReferenceCurrency)
          .multipliedBy(marketRefPriceInUsd)
          .toNumber();

        const {
          rdntRewardsDepositApr = 0,
          rdntRewardsBorrowApr = 0,
          grossDepositApr = 0,
          grossBorrowApr = 0,
        } = getRewardApr(reserve);

        const loopApr = getLoopApr(reserve, rdntRewardsDepositApr, rdntRewardsBorrowApr);

        return {
          id: reserve.id,
          underlyingAsset: reserve.underlyingAsset,
          currencySymbol: reserve.symbol,
          totalLiquidity,
          totalLiquidityInUSD,
          totalBorrows: reserve.borrowingEnabled ? totalBorrows : -1,
          totalBorrowsInUSD: reserve.borrowingEnabled ? totalBorrowsInUSD : -1,
          depositAPY: reserve.borrowingEnabled ? Number(reserve.supplyAPY) : -1,
          avg30DaysLiquidityRate: Number(reserve.avg30DaysLiquidityRate),
          variableBorrowRate: reserve.borrowingEnabled ? Number(reserve.variableBorrowAPY) : -1,
          avg30DaysVariableRate: Number(reserve.avg30DaysVariableBorrowRate),
          borrowingEnabled: reserve.borrowingEnabled,
          isFreezed: reserve.isFrozen,
          rdntRewardsDepositApr,
          rdntRewardsBorrowApr,
          grossDepositApr,
          grossBorrowApr,
          loopApr,
        };
      });

    setMarketData(marketData);
    setTotalLockedInUsd(totalLockedInUsd);
  }, [reserves, marketRefPriceInUsd, setMarketData, setTotalLockedInUsd, getRewardApr]);

  useEffect(() => {
    getMarketData();
  }, [getMarketData]);

  return (
    <div className="Markets">
      {openBuyModal && <BuyRDNTModal setOpenModal={setOpenBuyModal} />}
      {openZapModal && <ZapLPModal setOpenModal={setOpenZapModal} />}

      <PageMainHeader />

      <div className="Markets__container">
        <BannerClaimArbAirdrop openZapModal={setOpenZapModal} />

        <MarketChain />

        <MarketTopContent
          otherChain={otherChain}
          loading={isEmpty(marketData)}
          totalLockedInUsd={totalLockedInUsd}
          setOpenBuyModal={setOpenBuyModal}
          setOpenZapModal={setOpenZapModal}
        />

        <MarketAssetsContent otherChain={otherChain} marketData={marketData} />
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .Markets {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 16px;

          &__container {
            padding-top: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: $maxDeskWidth;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
