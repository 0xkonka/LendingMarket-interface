import { useIntl } from 'react-intl';
import { useCallback, useEffect, useState } from 'react';
import { TokenIcon, useThemeContext } from 'aave-ui-kit';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';

import { MigrationStepSelectorProps } from '../../screens/MigrationMain';
import messages from './messages';
import staticStyles from './style';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useMigrationInfo } from 'libs/migration-provider/hooks/use-migration-info';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import BaseOutlineButton from 'components/BaseOutlineButton';
import BaseButton from 'components/BaseButton';
import CompactNumber from 'components/basic/CompactNumber';
import { AaveProtocolDataProviderContract } from 'libs/aave-protocol-js/AaveProtocolDataProvider/AaveProtocolDataProviderContract';
import TextWithTooltip from 'components/TextWithTooltip';

export default function MigrationClaim({ goNextStep }: MigrationStepSelectorProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { user } = useDynamicPoolDataContext();
  const { migrationChainId, currentV1Address } = useMigrationInfo();
  const { library: provider } = useWeb3React<providers.Web3Provider>();

  const [isMainButtonDisabled, setIsMainButtonDisabled] = useState(true);
  const [isClaimingLoading, setIsClaimingLoading] = useState(false);
  const [claimableRewards, setClaimableRewards] = useState<
    { symbol: string; token: string; amount: number }[]
  >([]);

  const queryClaimableRewards = useCallback(async () => {
    if (!user) {
      return null;
    }

    try {
      const dataProviderContract = new AaveProtocolDataProviderContract(
        getProvider(migrationChainId),
        currentV1Address.aaveProtocolDataProvider
      );
      const multiFeeDistribution = new MultiFeeDistributionService(
        getProvider(migrationChainId),
        currentV1Address.rdntToken,
        currentV1Address.multiFeeDistribution
      );

      const [reservesTokens, rewards] = await Promise.all([
        dataProviderContract.getAllReservesTokens(),
        multiFeeDistribution.claimableRewards(user.id),
      ]);

      const claimableRewards: { symbol: string; token: string; amount: number }[] = [];
      const rdntTokenReward = rewards.find(
        (reward) => reward.token.toLowerCase() === currentV1Address.rdntToken.toLowerCase()
      );
      claimableRewards.push({
        symbol: 'RDNT',
        token: currentV1Address.rdntToken,
        amount: rdntTokenReward?.amount || 0,
      });

      for (const reservesToken of reservesTokens) {
        const tokenReward = rewards.find(
          (reward) => reward.token.toLowerCase() === reservesToken.address.toLowerCase()
        );

        claimableRewards.push({
          symbol: reservesToken.symbol,
          token: tokenReward?.token || '',
          amount: tokenReward?.amount || 0,
        });
      }

      // Filter out "DAOT" symbol
      const filteredClaimableRewards = claimableRewards.filter((item) => item.symbol !== 'DAOT');

      setClaimableRewards(filteredClaimableRewards);
    } catch (error) {
      console.log('queryClaimableRewards => error ', error);
    }
  }, [user, migrationChainId, currentV1Address]);

  useEffect(() => {
    queryClaimableRewards();
  }, []);

  const claimFees = useCallback(async () => {
    if (!user) {
      return null;
    }
    setIsClaimingLoading(true);
    try {
      const multiFeeDistribution = new MultiFeeDistributionService(
        getProvider(migrationChainId),
        currentV1Address.rdntToken,
        currentV1Address.multiFeeDistribution
      );

      const txn = await multiFeeDistribution.getReward(
        user.id,
        claimableRewards.map(({ token }) => token)
      );

      await sendEthTransaction(txn, provider, () => {}, null, {
        onConfirmation: () => {
          setIsMainButtonDisabled(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
    setIsClaimingLoading(false);
  }, [migrationChainId, currentV1Address, user, claimableRewards]);

  return (
    <>
      <div className="MigrationClaim">
        <h5 className="MigrationLabel">{intl.formatMessage(messages.stepLabel)}</h5>
        <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
        <p className="MigrationDescription">{intl.formatMessage(messages.description)}</p>

        <div className="MigrationTable" style={{ minHeight: '559px' }}>
          {claimableRewards.map((item, index) => (
            <div key={index} className="MigrationTableItemRow">
              <div className="MigrationTableItemLabel">
                <TokenIcon
                  tokenSymbol={item.symbol}
                  width={24}
                  height={24}
                  tokenFullName={item.symbol}
                />
                {item.symbol === 'RDNT' && (
                  <TextWithTooltip text={''} iconSize={12} id={'title'}>
                    <p className="RdntToolTip">
                      Note: this step only migrates your RDNT from protocol fees. You will need to
                      visit https://v1.radiant.capital/#/manage-radiant to claim any vested or
                      unvested RDNT rewards.
                    </p>
                  </TextWithTooltip>
                )}
              </div>
              <div className="MigrationTableItemNumbers">
                <span
                  className={classNames(
                    'MigrationTableItemValue',
                    Number(item.amount) > 1 && 'GreenApplied'
                  )}
                >
                  <CompactNumber
                    value={item.amount}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                </span>
                {/* <span className="MigrationTableItemQuantity">{item.amount}</span> */}
              </div>
            </div>
          ))}
        </div>

        <BaseOutlineButton
          isLoading={isClaimingLoading}
          action={() => {
            claimFees();
            setIsClaimingLoading(true);
            setTimeout(() => setIsClaimingLoading(false), 1000);
          }}
          text={intl.formatMessage(messages.secondaryButton)}
        ></BaseOutlineButton>

        <div className="MigrationButtonField">
          <label className="MigrationCheckboxContainer">
            <input
              className="MigrationCheckbox"
              type="checkbox"
              checked={!isMainButtonDisabled}
              onChange={(event) => setIsMainButtonDisabled(!event.target.checked)}
            />
            <p className="MigrationDescription">{intl.formatMessage(messages.checkboxText)}</p>
          </label>
          <BaseButton
            disabled={isMainButtonDisabled}
            action={() => goNextStep()}
            text={intl.formatMessage(messages.primaryButton)}
            isArrowVisible={true}
          ></BaseButton>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .MigrationClaimTable {
            background: ${currentTheme.interface.mainTable};
          }

          .MigrationClaimTable,
          .MigrationClaimTableItemRow {
            border-color: ${currentTheme.interface.offset1};
          }
        `}
      </style>
    </>
  );
}
