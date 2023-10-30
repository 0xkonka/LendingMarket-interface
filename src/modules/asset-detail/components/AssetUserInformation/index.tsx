import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';
import { TokenIcon, useThemeContext } from 'aave-ui-kit';
import { ComputedUserReserve } from '@aave/math-utils';

import {
  ComputedReserveData,
  UserSummary,
  useDynamicPoolDataContext,
} from 'libs/pool-data-provider';
import { toggleUseAsCollateral } from 'helpers/toggle-use-as-collateral';
import CardWrapper from 'components/wrappers/CardWrapper';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import ValuePercent from 'components/basic/ValuePercent';
import CustomSwitch from 'components/basic/CustomSwitch';
import HealthFactor from 'components/HealthFactor';
import CollateralHelpModal from 'components/HelpModal/CollateralHelpModal';
import CompactNumber from 'components/basic/CompactNumber';
import MaxLTVHelpModal from 'components/HelpModal/MaxLTVHelpModal';
import LiquidationThresholdHelpModal from 'components/HelpModal/LiquidationThresholdHelpModal';
import LiquidationBonusHelpModal from 'components/HelpModal/LiquidationBonusHelpModal';
import messages from './messages';

interface AssetUserInformationProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  symbol: string;
  walletBalance: BigNumber;
}

export default function AssetUserInformation({
  user,
  userReserve,
  poolReserve,
  symbol,
  walletBalance,
}: AssetUserInformationProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { user: { userReservesData = [] } = {} } = useDynamicPoolDataContext();

  const totalBorrows = valueToBigNumber(userReserve?.totalBorrows || '0').toNumber();
  const totalBorrowsUSD = valueToBigNumber(userReserve?.totalBorrowsUSD || '0').toNumber();
  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0').toNumber();

  const availableBorrowsMarketReferenceCurrency = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  );
  const availableBorrows = availableBorrowsMarketReferenceCurrency.gt(0)
    ? BigNumber.min(
        availableBorrowsMarketReferenceCurrency
          .div(poolReserve.priceInMarketReferenceCurrency)
          .multipliedBy(user && user.totalBorrowsMarketReferenceCurrency !== '0' ? '0.99' : '1'),
        poolReserve.availableLiquidity
      ).toNumber()
    : 0;

  return (
    <div className="AssetUserInformation">
      <CardWrapper
        header={<p>Your deposited assets</p>}
        className="AssetUserInformation__card-container"
      >
        {userReservesData.length > 0 && (
          <table className="AssetUserInformation__asset-container">
            <thead>
              <tr>
                <th align="left">Assets</th>
                <th align="center">Balance</th>
                <th align="right">Value</th>
              </tr>
            </thead>
            <tbody>
              {userReservesData.map((item) => (
                <tr key={item.reserve.symbol}>
                  <td>
                    <TokenIcon
                      width={25}
                      height={25}
                      tokenSymbol={item.reserve.symbol}
                      tokenFullName={item.reserve.symbol}
                      className="AssetUserInformation__asset-token"
                    />
                  </td>
                  <td align="center">
                    <p className="AssetUserInformation__asset-balance">
                      <CompactNumber
                        value={item.underlyingBalance}
                        maximumFractionDigits={2}
                        minimumFractionDigits={2}
                      />
                    </p>
                  </td>
                  <td align="right">
                    <p className="AssetUserInformation__asset-value">
                      $
                      <CompactNumber
                        value={item.underlyingBalanceUSD}
                        maximumFractionDigits={2}
                        minimumFractionDigits={2}
                      />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardWrapper>

      <CardWrapper header={<p>Overview</p>} className="AssetUserInformation__card-container">
        <div className="AssetUserInformation__info-container">
          <Row title={intl.formatMessage(messages.yourWalletBalance)}>
            <Value
              value={walletBalance.toString()}
              symbol={symbol}
              minimumValueDecimals={2}
              maximumValueDecimals={2}
            />
          </Row>

          <Row title={intl.formatMessage(messages.youAlreadyDeposited)}>
            <Value
              value={underlyingBalance}
              symbol={symbol}
              minimumValueDecimals={2}
              maximumValueDecimals={2}
            />
          </Row>

          <Row title={intl.formatMessage(messages.borrowed)}>
            {poolReserve.borrowingEnabled ? (
              <Value
                value={totalBorrows || 0}
                subValue={totalBorrowsUSD || 0}
                symbol={symbol}
                subSymbol="USD"
                minimumValueDecimals={2}
                maximumValueDecimals={2}
              />
            ) : (
              <span className="AssetUserInformation__noData">—</span>
            )}
          </Row>

          <Row title={intl.formatMessage(messages.availableToYou)}>
            {poolReserve.borrowingEnabled ? (
              <Value
                value={availableBorrows}
                symbol={symbol}
                minimumValueDecimals={2}
                maximumValueDecimals={2}
              />
            ) : (
              <span className="AssetUserInformation__noData">—</span>
            )}
          </Row>

          <HealthFactor value={user?.healthFactor || '-1'} withHALLink={true} />

          <Row title={intl.formatMessage(messages.loanToValue)}>
            <ValuePercent value={user?.currentLoanToValue || 0} />
          </Row>
        </div>
      </CardWrapper>

      <CardWrapper header={<p>Other stats</p>} className="AssetUserInformation__card-container">
        <div className="AssetUserInformation__info-container">
          {!!underlyingBalance && (
            <div className="AssetUserInformation__row">
              <CollateralHelpModal text={intl.formatMessage(messages.collateral)} />
              <CustomSwitch
                value={
                  userReserve?.usageAsCollateralEnabledOnUser &&
                  poolReserve.usageAsCollateralEnabled
                }
                offLabel={intl.formatMessage(messages.depositOffLabel)}
                onLabel={intl.formatMessage(messages.depositOnLabel)}
                onColor={currentTheme.darkGreen.hex}
                offColor={currentTheme.red.hex}
                onSwitch={() =>
                  toggleUseAsCollateral(
                    history,
                    poolReserve.id,
                    !userReserve?.usageAsCollateralEnabledOnUser,
                    poolReserve.underlyingAsset
                  )
                }
                disabled={!poolReserve.usageAsCollateralEnabled}
              />
            </div>
          )}

          <Row title={<MaxLTVHelpModal text="Max LTV" />}>
            <ValuePercent value={poolReserve?.baseLTVasCollateral || 0} />
          </Row>

          <Row title={<LiquidationThresholdHelpModal text="Liquidation threshold" />}>
            <ValuePercent
              value={
                Number(poolReserve.reserveLiquidationBonus) > 0
                  ? poolReserve.reserveLiquidationThreshold
                  : 0
              }
            />
          </Row>

          <Row title={<LiquidationBonusHelpModal text="Liquidation penalty" />}>
            <ValuePercent value={poolReserve.reserveLiquidationBonus} />
          </Row>
        </div>
      </CardWrapper>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .AssetUserInformation {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
            width: 100%;

            &__card-container {
              height: 100%;
              .CardWrapper__header {
                background-color: ${isCurrentThemeDark
                  ? '#111620'
                  : currentTheme.interface.tableBorder};
                border-radius: 10px 10px 0px 0px;
              }
            }

            &__asset-container {
              width: 100%;
              & th {
                font-size: 12px;
                font-weight: 400;
                color: ${currentTheme.text.offset1};
              }

              & tr {
                height: 35px;
              }
            }

            &__asset-token {
              & b {
                font-size: 12px;
                font-weight: 400;
                color: ${currentTheme.text.main};
              }
            }

            &__asset-balance {
              font-size: 12px;
              color: ${currentTheme.text.offset1};
            }

            &__asset-value {
              font-size: 12px;
              color: ${currentTheme.text.main};
            }

            &__title {
              font-weight: 600;
              font-size: 16px;
              color: ${currentTheme.text.main};
              color: ${currentTheme.text.offset1};
            }

            &__info-container {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }

            &__row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            }

            &__noData {
              font-size: 12px;
              color: ${currentTheme.text.offset2};
            }
          }
        `}
      </style>
    </div>
  );
}
