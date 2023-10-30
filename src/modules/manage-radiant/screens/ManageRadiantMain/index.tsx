import { useEffect, useState } from 'react';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { GeistTokenContract } from 'libs/aave-protocol-js/GeistToken/GeistTokenContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import PageMainHeader from 'components/PageMainHeader';
import MarketChain from 'components/MarketChain';
import ManageRadiantMainTop from '../../components/ManageRadiantMainTop';
import ContentLocking from '../../components/ContentLocking';
import ContentItemVesting from '../../components/ContentItemVesting';
import { ClaimableRewardsTable } from '../../components/ClaimableRewardsTable';
import { Disqualifications } from '../../components/Disqualifications';
import { RdntStatsTable } from '../../components/RdntStatsTable';
import { ContentProtocolManagement } from '../../components/ContentProtocolManagement';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useUserHistoryLazyQuery } from 'libs/subgraph-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { ActivityLog } from 'modules/manage-radiant/components/ActivityLog';
import ZapLPModal from 'components/ZapLPModal';
import { useMfdLockedBalances } from 'client/multifee-distribution-contract-queries';
import BannerClaimArbAirdrop from 'components/BannerClaimArbAirdrop';

export function ManageRadiantMain() {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const [loadUserHistory, { data }] = useUserHistoryLazyQuery();

  const [openZapModal, setOpenZapModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<{
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  }>({
    walletBalance: valueToBigNumber(0),
    currencySymbol: 'RDNT',
    totalSupply: valueToBigNumber(0),
  });
  const [stakingTokenInfo, setStakingTokenInfo] = useState<{
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  }>({
    walletBalance: valueToBigNumber(0),
    currencySymbol: 'RDNT',
    totalSupply: valueToBigNumber(0),
  });
  const [hideLockRdnt, setHideLockRdnt] = useState<boolean>(true);
  const [locked, setLocked] = useState<BigNumber>(valueToBigNumber(0));
  const [unlockable, setUnlockable] = useState<BigNumber>(valueToBigNumber(0));
  const [lpLocked, setLpLocked] = useState<BigNumber>(valueToBigNumber(0));
  const [lpUnlockable, setLpUnlockable] = useState<BigNumber>(valueToBigNumber(0));
  const [penalty, setPenalty] = useState<BigNumber>(valueToBigNumber(0));
  const [staked, setStaked] = useState<BigNumber>(valueToBigNumber(0));
  const [earned, setEarned] = useState<BigNumber>(valueToBigNumber(0));
  const { data: lockedTable = [] } = useMfdLockedBalances(
    chainId,
    currentMarketData.addresses.rdntToken
  );
  const { data: lpLockedTable = [] } = useMfdLockedBalances(
    chainId,
    currentMarketData.addresses.stakingToken
  );
  const [earnedTable, setEarnedTable] = useState<
    { amount: string; expiryDate: Date; unlockTime: string; penalty: string }[]
  >([]);
  // TODO: This is a major code smell
  const [statsRerender, setStatsRerender] = useState<Number>(0);

  useEffect(() => {
    (async () => {
      if (!user) {
        return;
      }

      setLoading(true);
      try {
        const multiFeeDistributionService = new MultiFeeDistributionService(
          getProvider(chainId),
          currentMarketData.addresses.rdntToken,
          currentMarketData.addresses.multiFeeDistribution
        );
        const lpMultiFeeDistributionService = new MultiFeeDistributionService(
          getProvider(chainId),
          currentMarketData.addresses.stakingToken,
          currentMarketData.addresses.multiFeeDistribution
        );

        const geistTokenContract = new GeistTokenContract(
          getProvider(chainId),
          currentMarketData.addresses.rdntToken
        );

        const geistStakingTokenContract = new GeistTokenContract(
          getProvider(chainId),
          currentMarketData.addresses.stakingToken
        );

        const [
          lpLockingRewardRatio,
          earnedTable,
          feeBalances,
          lpFeeBalances,
          rdntInfo,
          stakingTokenInfo,
        ] = await Promise.all([
          100,
          multiFeeDistributionService.getEarnedBalances(user.id),
          multiFeeDistributionService.getBalances(user.id),
          lpMultiFeeDistributionService.getBalances(user.id),
          geistTokenContract.getInfo(user.id),
          geistStakingTokenContract.getInfo(user.id),
        ]);

        setHideLockRdnt(lpLockingRewardRatio >= 100);
        setEarnedTable(earnedTable);
        setLpLocked(lpFeeBalances[0]);
        setLpUnlockable(lpFeeBalances[1]);
        const [
          lockedBal,
          unlockableBal, //stakedBal,
          stakedBal,
          earnedBal, //withdrawableBal,
          ,
          penaltyBal,
        ] = feeBalances;
        setLocked(lockedBal);
        setStaked(stakedBal);
        setUnlockable(unlockableBal);
        setPenalty(penaltyBal);
        setEarned(earnedBal);
        setTokenInfo(rdntInfo);
        setStakingTokenInfo(stakingTokenInfo);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [statsRerender, data]);

  useEffect(() => {
    loadUserHistory({ variables: { id: currentAccount.toLowerCase() } });
  }, []);

  return (
    <div className="ManageRadiant">
      {openZapModal && <ZapLPModal setOpenModal={setOpenZapModal} />}

      <PageMainHeader
        onZapConfirmed={() => {
          setStatsRerender(Math.random());
        }}
      />

      <div className="ManageRadiant__container">
        <BannerClaimArbAirdrop openZapModal={setOpenZapModal} />

        <MarketChain />

        <ManageRadiantMainTop
          loading={loading}
          lpLocked={lpLocked}
          earned={earned}
          hideLockRdnt={hideLockRdnt}
          lpLockedTable={lpLockedTable}
          statsRerender={statsRerender}
        />

        <ClaimableRewardsTable
          statsRerender={statsRerender}
          setStatsRerender={setStatsRerender}
          hideLockRdnt={hideLockRdnt}
        />

        <div className="ManageRadiant__main-container">
          <ContentLocking
            locked={locked}
            lpLocked={lpLocked}
            unlockable={unlockable}
            lpUnlockable={lpUnlockable}
            lockedTable={lockedTable}
            lpLockedTable={lpLockedTable}
            rdntTokenInfo={tokenInfo}
            stakingTokenInfo={stakingTokenInfo}
            hideLockRdnt={hideLockRdnt}
            statsRerender={statsRerender}
            setStatsRerender={setStatsRerender}
          />

          <ContentItemVesting
            penalty={penalty}
            staked={staked}
            earned={earned}
            earnedTable={earnedTable}
            setStatsRerender={setStatsRerender}
          />
          <div className="ManageRadiant__main-container__row">
            <ActivityLog data={data} />
            <Disqualifications statsRerender={statsRerender} setStatsRerender={setStatsRerender} />
          </div>
        </div>

        {/* {currentAccount === '0x111CEEee040739fD91D29C34C33E6B3E112F2177' && ( */}
        <div className="ManageRadiant__admin-container">
          <ContentProtocolManagement statsRerender={statsRerender} />

          <div>
            <RdntStatsTable statsRerender={statsRerender} />
          </div>
        </div>
        {/* )} */}
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiant {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 32px 16px;

            &__container {
              padding-top: 16px;
              position: relative;
              display: flex;
              flex-direction: column;
              gap: 12px;
              max-width: $maxDeskWidth;
              width: 100%;
            }

            &__main-container {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 12px;
              width: 100%;

              &__row {
                display: grid;
                grid-template-rows: 1fr 1fr;
                gap: 12px;
              }

              @include respond-to(sm) {
                grid-template-columns: 1fr;
              }
            }

            &__admin-container {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 12px;
              width: 100%;

              @include respond-to(sm) {
                grid-template-columns: 1fr;
              }
            }
          }
        `}
      </style>
    </div>
  );
}

export default ManageRadiantMain;
