import { useIntl } from 'react-intl';
import { useCallback, useEffect, useState } from 'react';
import { TokenIcon, useThemeContext } from 'aave-ui-kit';

import { MigrationStepSelectorProps, getMaximumTableDecimals } from '../../screens/MigrationMain';
import BaseOutlineButton from 'components/BaseOutlineButton';
import messages from './messages';
import staticStyles from './style';
import BaseButton from 'components/BaseButton';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';
import CompactNumber from 'components/basic/CompactNumber';

export default function MigrationDeposit({ step, goNextStep }: MigrationStepSelectorProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const { getRewardApr } = useRdntLendingPoolRewards();
  const { user, reserves } = useDynamicPoolDataContext();

  const [data, setData] = useState<any[]>([]);
  const [isMainButtonDisabled, setIsMainButtonDisabled] = useState(true);

  const getData = useCallback(() => {
    const depositData = reserves
      .filter((res) => res.isActive && !res.isFrozen)
      .map((reserve) => {
        const userReserve = user?.userReservesData.filter(
          (userRes) => userRes.reserve.symbol === reserve.symbol
        )[0];

        const { rdntRewardsDepositApr = 0, grossDepositApr = 0 } = getRewardApr(reserve);
        return {
          id: reserve.id,
          underlyingAsset: reserve.underlyingAsset,
          currencySymbol: reserve.symbol,
          rdntRewardsDepositApr: rdntRewardsDepositApr,
          grossDepositApr: grossDepositApr,
          depositBalance: userReserve?.underlyingBalance ? userReserve?.underlyingBalance : '0',
          depositUSD: userReserve?.underlyingBalanceUSD ? userReserve?.underlyingBalanceUSD : '0',
          depositAPY: reserve.borrowingEnabled ? Number(reserve.supplyAPY) : -1,
        };
      });

    // Filter out "GLP" & "FRAX" symbols as they're unsupported
    const filteredDepositData = depositData.filter(
      (item) => item.currencySymbol !== 'GLP' && item.currencySymbol !== 'FRAX'
    );
    setData(filteredDepositData);
  }, [reserves, setData, getRewardApr]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="MigrationDeposit">
        <h5 className="MigrationLabel">{intl.formatMessage(messages.stepLabel)}</h5>
        <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
        <p className="MigrationDescription">{intl.formatMessage(messages.description)}</p>

        <div className="MigrationTable">
          {data.map((item, index) => (
            <div key={index} className="MigrationTableItemRow">
              <div className="MigrationTableItemLabel">
                <TokenIcon
                  tokenSymbol={item.currencySymbol}
                  width={24}
                  height={24}
                  tokenFullName={item.currencySymbol}
                />
              </div>
              <div className="MigrationDepositPillContainer">
                <span className="MigrationDepositDepositApr">
                  <CompactNumber
                    value={(item.depositAPY * 100).toFixed(2)}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                  %&nbsp;&nbsp;+
                </span>
                <div className="MigrationDepositPill">
                  <span>
                    <CompactNumber
                      value={(item.rdntRewardsDepositApr * 100).toFixed(2)}
                      maximumFractionDigits={2}
                      minimumFractionDigits={0}
                      showFullNum={false}
                    />
                    % APR
                  </span>
                </div>
              </div>
              <div className="MigrationTableItemNumbers">
                <span className="MigrationTableItemValue">
                  $
                  <CompactNumber
                    value={item.depositUSD}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={true}
                  />
                </span>
                <span className="MigrationTableItemQuantity">
                  <CompactNumber
                    value={item.depositBalance}
                    maximumFractionDigits={getMaximumTableDecimals(item.currencySymbol)}
                    minimumFractionDigits={0}
                    showFullNum={true}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
        <BaseOutlineButton
          action={() => window.open('#/markets', '_blank')}
          isArrowVisible={true}
          text={intl.formatMessage(messages.secondaryButton1)}
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
          .MigrationDepositDepositApr {
            color: ${isCurrentThemeDark ? currentTheme.text.offset1 : currentTheme.text.main};
          }
        `}
      </style>
    </>
  );
}
