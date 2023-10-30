import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import CustomSwitch from 'components/basic/CustomSwitch';
import MobileCardWrapper from 'components/wrappers/MobileCardWrapper';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import LiquidityMiningCard from 'components/liquidityMining/LiquidityMiningCard';
import NoData from 'components/basic/NoData';
import ContainedButton from 'components/basic/ContainedButton';
import OutlineButton from 'components/basic/OutlineButton';
import CollateralHelpModal from 'components/HelpModal/CollateralHelpModal';
import AMPLWarning from 'components/AMPLWarning';
import defaultMessages from 'defaultMessages';
import messages from './messages';
import { DepositTableItem } from './types';

export default function DepositMobileCard({
  reserve: { symbol, liquidityRate, id, underlyingAsset },
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
  borrowingEnabled,
  aincentivesAPR,
}: DepositTableItem) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <>
      <MobileCardWrapper symbol={symbol} className="DepositMobileCard">
        <Row title={intl.formatMessage(messages.secondTableColumnTitle)} withMargin={true}>
          <Value
            value={Number(underlyingBalance)}
            subValue={Number(underlyingBalanceUSD)}
            subSymbol="USD"
            maximumSubValueDecimals={2}
            maximumValueDecimals={2}
            minimumValueDecimals={2}
          />
        </Row>

        <Row title={intl.formatMessage(messages.apyRowTitle)} withMargin={true}>
          {borrowingEnabled || aincentivesAPR !== '0' ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={borrowingEnabled ? Number(liquidityRate) : 0}
              thirtyDaysValue={avg30DaysLiquidityRate}
              liquidityMiningValue={rdntRewardsDepositApr || 0}
              grossValue={grossDepositApr}
              type="deposit"
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>

        <Row
          title={
            <CollateralHelpModal
              text={intl.formatMessage(messages.useAsCollateralRowTitle)}
              iconSize={12}
            />
          }
          withMargin={true}
          className="Row__center"
        >
          <CustomSwitch
            value={usageAsCollateralEnabledOnUser && usageAsCollateralEnabledOnThePool}
            offLabel={intl.formatMessage(messages.offLabel)}
            onLabel={intl.formatMessage(messages.onLabel)}
            onColor={currentTheme.green.hex}
            offColor={currentTheme.red.hex}
            onSwitch={onToggleSwitch}
            disabled={!usageAsCollateralEnabledOnThePool}
          />
        </Row>

        <Row
          title={intl.formatMessage(messages.depositMore)}
          withMargin={true}
          className="Row__center"
        >
          <ContainedButton
            href={`/deposit/${underlyingAsset}-${id}`}
            disabled={!isActive || isFrozen}
            size="small"
            className="DepositMobileCard__button"
          >
            {intl.formatMessage(defaultMessages.deposit)}
          </ContainedButton>
        </Row>

        <Row
          title={intl.formatMessage(messages.withdrawYourDeposit)}
          withMargin={false}
          className="Row__center"
        >
          <OutlineButton
            href={`/withdraw/${underlyingAsset}-${id}`}
            disabled={!isActive}
            size="small"
            className="DepositMobileCard__button"
            color="third"
          >
            {intl.formatMessage(defaultMessages.withdraw)}
          </OutlineButton>
        </Row>
      </MobileCardWrapper>

      {symbol === 'AMPL' && <AMPLWarning />}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';
        .DepositMobileCard {
          &__button {
            width: 100px;
            min-height: 24px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
