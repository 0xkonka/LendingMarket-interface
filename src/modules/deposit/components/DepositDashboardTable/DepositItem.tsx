import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import TableItem from 'modules/dashboard/components/DashboardTable/TableItem';
import TableValueCol from 'modules/dashboard/components/DashboardTable/TableValueCol';
import TableAprCol from 'modules/dashboard/components/DashboardTable/TableAprCol';
import TableCol from 'modules/dashboard/components/DashboardTable/TableCol';
import TableButtonsWrapper from 'modules/dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from 'modules/dashboard/components/DashboardTable/TableButtonCol';
import CustomSwitch from 'components/basic/CustomSwitch';
import defaultMessages from 'defaultMessages';
import messages from './messages';
import staticStyles from './style';

import { DepositTableItem } from './types';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export default function DepositItem({
  reserve: { symbol, liquidityRate, id, underlyingAsset },
  uiColor,
  usageAsCollateralEnabledOnUser,
  usageAsCollateralEnabledOnThePool,
  underlyingBalance,
  underlyingBalanceUSD,
  onToggleSwitch,
  isActive,
  isFrozen,
  avg30DaysLiquidityRate,
  rdntRewardsDepositApr,
  grossDepositApr,
  index,
  aincentivesAPR,
  stableBorrowRateEnabled,
  borrowingEnabled,
  ...rest
}: DepositTableItem) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme, xl, lg } = useThemeContext();

  const handleClick = useCallback(() => {
    history.push(`/asset-detail/${underlyingAsset}-${id}`);
  }, [history, underlyingAsset, id]);

  return (
    <>
      <TableItem tokenSymbol={symbol} {...rest} className="DepositItem">
        <TableValueCol
          onClick={handleClick}
          value={Number(underlyingBalance)}
          subValue={Number(underlyingBalanceUSD)}
        />

        <TableAprCol
          onClick={handleClick}
          value={Number(liquidityRate)}
          thirtyDaysAverage={avg30DaysLiquidityRate}
          liquidityMiningValue={rdntRewardsDepositApr || 0}
          grossValue={grossDepositApr || 0}
          symbol={symbol}
          type="deposit"
        />

        <TableCol maxWidth={xl && !lg ? 140 : '100%'} onClick={handleClick}>
          <CustomSwitch
            value={usageAsCollateralEnabledOnUser && usageAsCollateralEnabledOnThePool}
            offLabel={intl.formatMessage(messages.offLabel)}
            onLabel={intl.formatMessage(messages.onLabel)}
            onColor={currentTheme.brand.main}
            offColor={currentTheme.text.offset4}
            onSwitch={onToggleSwitch}
            disabled={!usageAsCollateralEnabledOnThePool}
            className="CustomSwitch__deposit"
          />
        </TableCol>

        <TableButtonsWrapper>
          <TableButtonCol
            disabled={!isActive || isFrozen}
            title={intl.formatMessage(defaultMessages.deposit)}
            linkTo={`/asset-detail/${underlyingAsset}-${id}-Deposit`}
          />

          <TableButtonCol
            disabled={!isActive}
            title={intl.formatMessage(defaultMessages.withdraw)}
            linkTo={`/asset-detail/${underlyingAsset}-${id}-Withdraw`}
            withoutBorder={true}
          />
        </TableButtonsWrapper>
      </TableItem>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
