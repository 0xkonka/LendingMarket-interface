import { useState, useCallback, useEffect } from 'react';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import TimeSelector from 'components/basic/TimeSelector';
import TextWithTooltip from 'components/TextWithTooltip';
import { useThemeContext } from 'aave-ui-kit';
import GradientLine from 'components/basic/GradientLine';

interface SetDefaultRelockTypeProps {
  aprLabels?: number[];
  onMainTxConfirmed: () => void;
}

function SetDefaultRelockType({ aprLabels, onMainTxConfirmed }: SetDefaultRelockTypeProps) {
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { currentTheme } = useThemeContext();
  const { user } = useDynamicPoolDataContext();
  const { lockDurations } = useMFDStats();
  const { defaultLockIndex, fetchUserMFDStatsData } = useUserMFDStats();

  const [selectedDuration, setSelectedDuration] = useState(defaultLockIndex);
  const [listenForDurationChange, setListenForDurationChange] = useState(false);

  const tooltipData = [
    { month: '12 months', multipler: '25x' },
    { month: '6 months', multipler: '10x' },
    { month: '3 months', multipler: '4x' },
    { month: '1 month', multipler: '1x' },
  ];

  useEffect(() => {
    setSelectedDuration(defaultLockIndex);
  }, [defaultLockIndex]);

  useEffect(() => {
    if (listenForDurationChange && selectedDuration !== defaultLockIndex) {
      setDefaultLockTypeHandler();
    } else {
      setListenForDurationChange(true);
    }
  }, [selectedDuration]);

  const setDefaultLockTypeHandler = useCallback(async () => {
    if (!user) {
      return null;
    }

    const lpFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.stakingToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const actionTx = await lpFeeDistributionService.setDefaultRelockTypeIndex(
      selectedDuration,
      user.id
    );
    return sendEthTransaction(actionTx, provider, () => {}, null, {
      onConfirmation: () => {
        fetchUserMFDStatsData();
        onMainTxConfirmed();
      },
      onError: () => {
        setSelectedDuration(defaultLockIndex);
      },
    });
  }, [user, chainId, currentMarketData, provider, selectedDuration]);

  return (
    <div className="ManageRadiant__setDefaultRelockType">
      <div className="ManageRadiant__setDefaultRelockType__label">
        <div className="ManageRadiant__setDefaultRelockType__label__tooltip">
          Default lock length
          <TextWithTooltip
            text={''}
            iconSize={12}
            id={'title'}
            className="ManageRadiant__setDefaultRelockType__tooltip"
          >
            <div className="ManageRadiant__setDefaultRelockType__tooltip__content">
              <p className="Tooltip__content_top">
                Longer locks receive a greater share of platform fees
              </p>
              <GradientLine size={1} />
              <div className="Tooltip__content__bottom">
                {tooltipData.map((item) => (
                  <div className="Tooltip__content__bottom__row" key={item.month}>
                    <p className="Tooltip__content__bottom__row__month">{item.month}</p>
                    <p className="Tooltip__content__bottom__row__multipler">{item.multipler}</p>
                  </div>
                ))}
              </div>
            </div>
          </TextWithTooltip>
        </div>
        <span>
          Longer lock durations increase your share of platform fees, resulting in a higher APR.
          <br />
          <br />
          Changes made to default duration will trigger a signature request with your web3 wallet.
        </span>
      </div>

      <TimeSelector
        values={lockDurations}
        selectedValue={selectedDuration}
        setSelectedValue={setSelectedDuration}
        aprLabels={aprLabels}
      />

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .ManageRadiant__setDefaultRelockType {
          display: flex;
          flex-direction: column;
          gap: 20px;

          &__label {
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-size: 14px;
            font-weight: 600;
            color: ${currentTheme.text.main};

            &__tooltip {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              gap: 7px;
            }

            & span {
              font-size: 12px;
              font-weight: normal;
              color: ${currentTheme.text.offset2};
            }
          }
        }

        .ManageRadiant__setDefaultRelockType__tooltip__content {
          display: flex;
          flex-direction: column;
          gap: 16px;

          .Tooltip__content_top {
            font-family: 'PP Mori';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 17px;
            text-align: center;
            color: ${currentTheme.text.offset2};
          }

          .Tooltip__content__bottom__row {
            display: flex;
            justify-content: space-between;
            padding-bottom: 3px;

            &__month {
              font-family: 'PP Mori';
              font-style: normal;
              font-weight: 400;
              font-size: 11px;
              line-height: 15px;
              display: flex;
              color: #0f172a;
            }

            &__multipler {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 700;
              font-size: 11px;
              line-height: 13px;
              color: #0f172a;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default SetDefaultRelockType;
