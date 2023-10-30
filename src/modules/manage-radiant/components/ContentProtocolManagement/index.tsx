import { useState, useEffect, useCallback } from 'react';
import { utils } from 'ethers';
import { useThemeContext } from 'aave-ui-kit';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { GeistTokenContract } from 'libs/aave-protocol-js/GeistToken/GeistTokenContract';
import { RadiantOFTContract } from 'libs/aave-protocol-js/RadiantOFT/RadiantOFTContract';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { ChefIncentivesService } from 'libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useChainInfo } from 'libs/aave-protocol-js/hooks/use-chain-info';
import CardWrapper from 'components/wrappers/CardWrapper';
import humanizeDuration from 'humanize-duration';

interface ContentProtocolManagementProps {
  statsRerender: Number;
}

export function ContentProtocolManagement({ statsRerender }: ContentProtocolManagementProps) {
  const { currentTheme } = useThemeContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { prices } = useRdntPrices();
  const { chainTime, blockNum } = useChainInfo();

  const [rewardsReserve, setRewardsReserve] = useState(0);
  const [dqReserve, setDqReserve] = useState(0);
  const [rewardsPerSecond, setRewardsPerSecond] = useState(0);
  const [runway, setRunway] = useState('0');
  const [starfleetTreasuryBalance, setStarfleetTreasuryBalance] = useState(0);

  const getData = useCallback(async () => {
    const chefIncentivesService = new ChefIncentivesService(
      getProvider(chainId),
      currentMarketData.addresses.chefIncentivesController
    );
    const rdntTokenContract = new GeistTokenContract(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken
    );
    const multiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );
    const radiantOFT = new RadiantOFTContract(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken
    );

    const [rewardsReserveValue, rewardsPerSecondValue, dqReserveValue, starfleetTreasuryAddress] =
      await Promise.all([
        rdntTokenContract.getBalance(chefIncentivesService.chefIncentivesControllerAddr),
        chefIncentivesService.rewardsPerSecond(),
        currentMarketData.addresses.bountyManager
          ? rdntTokenContract.getBalance(currentMarketData.addresses.bountyManager)
          : null,
        multiFeeDistributionService.getStarfleetTreasury(),
      ]);

    const starfleetTreasuryBalance = await radiantOFT.balanceOf(starfleetTreasuryAddress);
    setStarfleetTreasuryBalance(parseFloat(utils.formatUnits(starfleetTreasuryBalance)));

    const rewardsReserve = parseFloat(utils.formatUnits(rewardsReserveValue));
    const dqReserve = dqReserveValue ? parseFloat(utils.formatUnits(dqReserveValue)) : 0;
    const rewardsPerSecond = parseFloat(utils.formatUnits(rewardsPerSecondValue));
    const millisecondsRemaining = (rewardsReserve / rewardsPerSecond) * 1000;
    const runway = humanizeDuration(millisecondsRemaining, {
      maxDecimalPoints: 0,
      largest: 2,
    });
    setRunway(runway);
    setRewardsReserve(rewardsReserve);
    setDqReserve(dqReserve);
    setRewardsPerSecond(rewardsPerSecond);
  }, [
    chainId,
    currentMarketData,
    setRunway,
    setRewardsReserve,
    setRewardsPerSecond,
    setStarfleetTreasuryBalance,
    prices,
  ]);

  useEffect(() => {
    getData();
  }, [statsRerender, prices]);

  return (
    <CardWrapper header={<p>Protocol Stats</p>} size="small">
      <div className="ManageRadiantContentProtocolManagement">
        <p className="ManageRadiantContentProtocolManagement__label">
          Rewards Reserve:{' '}
          <span>{rewardsReserve.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          Reward Rate: <span>{rewardsPerSecond.toLocaleString()}</span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          Emission Runway: <span>{runway}</span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          Bounty Reserve:{' '}
          <span>{dqReserve.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          Starfleet Treasury:{' '}
          <span>
            {starfleetTreasuryBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          Chain Time: <span>{new Date(chainTime).toLocaleString()}</span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          Block: <span>{blockNum}</span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          Price:{' '}
          <span>
            {prices?.tokenPrice?.toLocaleString(undefined, { maximumFractionDigits: 3 }) || 0}
          </span>
        </p>
        <p className="ManageRadiantContentProtocolManagement__label">
          dLP Price:{' '}
          <span>
            {prices?.lpTokenPrice?.toLocaleString(undefined, { maximumFractionDigits: 3 }) || 0}
          </span>
        </p>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiantContentProtocolManagement {
            display: flex;
            flex-direction: column;
            gap: 10px;

            &__title {
              font-size: 20px;
              font-weight: 600;
              color: ${currentTheme.text.main};
            }

            &__label {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              color: ${currentTheme.text.offset2};

              span {
                font-weight: 600;
              }
            }

            &__inner {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
              margin: 10px 0;
            }

            &__description {
              font-size: 14px;
              width: 100%;
              text-align: left;
              word-break: break-word;
              color: ${currentTheme.text.offset2};
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}

export default ContentProtocolManagement;
