import { useIntl } from 'react-intl';
import { useState, useCallback, useEffect } from 'react';
import { TokenIcon } from 'aave-ui-kit';

import messages from './messages';
import staticStyles from './style';
import { MigrationStepSelectorProps, getMaximumTableDecimals } from '../../screens/MigrationMain';
import CompactNumber from 'components/basic/CompactNumber';
import BaseOutlineButton from 'components/BaseOutlineButton';
import BaseButton from 'components/BaseButton';
import { useMigrationInfo } from 'libs/migration-provider/hooks/use-migration-info';
import useRdntLendingPoolRewards from 'libs/aave-protocol-js/hooks/use-rdnt-lending-pool-rewards';

export default function MigrationWithdraw({ step, goNextStep }: MigrationStepSelectorProps) {
  const intl = useIntl();
  const { getRewardApr } = useRdntLendingPoolRewards();
  const [isMainButtonDisabled, setIsMainButtonDisabled] = useState(true);
  const { user, reserves } = useMigrationInfo();
  const [data, setData] = useState<any[]>([]);

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
          depositApr: rdntRewardsDepositApr > 0 ? rdntRewardsDepositApr : grossDepositApr,
          depositBalance: userReserve?.underlyingBalance ? userReserve?.underlyingBalance : '0',
          depositUSD: userReserve?.underlyingBalanceUSD ? userReserve?.underlyingBalanceUSD : '0',
        };
      });
    setData(depositData);
  }, [reserves, setData, getRewardApr]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="MigrationWithdraw">
        <h5 className="MigrationLabel">{intl.formatMessage(messages.stepLabel)}</h5>
        <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
        <p className="MigrationDescription">{intl.formatMessage(messages.description)}</p>

        <div className="MigrationTable">
          {data.map((item, index) => (
            <div key={index} className="MigrationTableItemRow">
              <div className="MigrationTableItemLabel">
                <TokenIcon
                  tokenSymbol={item.currencySymbol}
                  tokenFullName={item.currencySymbol}
                  width={24}
                  height={24}
                />
              </div>
              <div className="MigrationTableItemNumbers">
                {Number(item.depositUSD) > 1 ? (
                  <>
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
                  </>
                ) : (
                  <div className="MigrationWithdrawPill">
                    <div className="MigrationWithdrawPillCheck">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 6.5L7.5 12L5 9.5"
                          stroke="#05A82E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <span>{intl.formatMessage(messages.pill)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <BaseOutlineButton
          action={() => window.open('https://v1.radiant.capital/#/dashboard', '_blank')}
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
    </>
  );
}
