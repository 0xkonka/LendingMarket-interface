import { useCallback } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useIntl } from 'react-intl';

import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import ToggleButton from 'components/basic/ToggleButton';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { getProvider } from 'helpers/config/markets-and-network-config';
import AutoRelockStatus from 'components/basic/AutoRelockStatus';
import messages from './messages';

interface AutoRelockProps {
  isLP: boolean;
  setStatsRerender: (value: Number) => void;
}

function AutoRelock({ isLP, setStatsRerender }: AutoRelockProps) {
  const intl = useIntl();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { currentTheme } = useThemeContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { lpRelockStatus, fetchUserMFDStatsData, defaultLockIndex } = useUserMFDStats();

  const relockButtonHandler = useCallback(async () => {
    if (!user) {
      return null;
    }

    const feeDistributionService = isLP
      ? new MultiFeeDistributionService(
          getProvider(chainId),
          currentMarketData.addresses.stakingToken,
          currentMarketData.addresses.multiFeeDistribution
        )
      : new MultiFeeDistributionService(
          getProvider(chainId),
          currentMarketData.addresses.rdntToken,
          currentMarketData.addresses.multiFeeDistribution
        );
    const actionTx = await feeDistributionService.setRelock(!lpRelockStatus, user.id);
    return sendEthTransaction(actionTx, provider, () => {}, null, {
      onConfirmation: () => {
        fetchUserMFDStatsData();
        setStatsRerender(Math.random());
      },
    });
  }, [user, chainId, currentMarketData, provider, lpRelockStatus, isLP, fetchUserMFDStatsData]);

  return (
    <div className="ManageRadiantAutoReLock">
      <span className="ManageRadiantAutoReLock__label">
        <div className="ManageRadiantAutoReLock__label__title">
          {intl.formatMessage(messages.autoRelock)}: {'  '}
          <AutoRelockStatus fontSize={14} />
        </div>

        <span>
          {intl.formatMessage(messages.autoRelockDescription, {
            duration: (
              <strong>
                {defaultLockIndex === 0
                  ? '1 month'
                  : defaultLockIndex === 1
                  ? '3 months'
                  : defaultLockIndex === 2
                  ? '6 months'
                  : '12 months'}
              </strong>
            ),
          })}
        </span>
      </span>

      <ToggleButton checked={!!lpRelockStatus} onChange={relockButtonHandler} />

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiantAutoReLock {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 50px;
            padding: 24px;

            .AutoRelockSettingsModal {
              position: absolute;
              right: 20px;
              top: 15px;
            }

            &__settingIcon {
              position: absolute;
              right: 20px;
              top: 15px;
            }

            &__label {
              display: flex;
              flex-direction: column;
              gap: 12px;
              font-size: 14px;
              font-weight: 600;
              color: ${currentTheme.text.main};

              &__title {
                display: flex;
                align-items: center;
                gap: 4px;
              }

              & span {
                font-size: 12px;
                font-weight: normal;
                color: ${currentTheme.text.offset2};
              }
            }
          }
        `}
      </style>
    </div>
  );
}

export default AutoRelock;
