import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { valueToBigNumber, BigNumber, InterestRate } from '@aave/protocol-js';
import { TokenIcon, useThemeContext } from 'aave-ui-kit';
import { ComputedUserReserve } from '@aave/math-utils';

import { loanActionLinkComposer } from 'helpers/loan-action-link-composer';
import {
  ComputedReserveData,
  UserSummary,
  useDynamicPoolDataContext,
} from 'libs/pool-data-provider';
import { toggleUseAsCollateral } from 'helpers/toggle-use-as-collateral';
import CardWrapper from 'components/wrappers/CardWrapper';
import ContainedButton from 'components/basic/ContainedButton';
import OutlineButton from 'components/basic/OutlineButton';
import GradientLine from 'components/basic/GradientLine';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import ValuePercent from 'components/basic/ValuePercent';
import CustomSwitch from 'components/basic/CustomSwitch';
import HealthFactor from 'components/HealthFactor';
import CollateralHelpModal from 'components/HelpModal/CollateralHelpModal';
import messages from './messages';
import CompactNumber from 'components/basic/CompactNumber';

interface UserInformationProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  symbol: string;
  walletBalance: BigNumber;
}

export default function UserInformation({
  user,
  userReserve,
  poolReserve,
  symbol,
  walletBalance,
}: UserInformationProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();
  const { user: { userReservesData = [] } = {} } = useDynamicPoolDataContext();

  const totalBorrows = valueToBigNumber(userReserve?.totalBorrows || '0').toNumber();
  const totalBorrowsUSD = valueToBigNumber(userReserve?.totalBorrowsUSD || '0').toNumber();
  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0').toNumber();

  const repayLink = loanActionLinkComposer(
    'repay',
    poolReserve.id,
    InterestRate.Variable,
    poolReserve.underlyingAsset
  );

  const borrowLink = loanActionLinkComposer(
    'borrow',
    poolReserve.id,
    InterestRate.Stable,
    poolReserve.underlyingAsset
  );

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
    <CardWrapper
      header={<p>{intl.formatMessage(messages.yourInformation)}</p>}
      className="UserInformation"
    >
      {userReservesData.length > 0 && (
        <table className="UserInformation__asset-container">
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
                    className="UserInformation__asset-token"
                  />
                </td>
                <td align="center">
                  <p className="UserInformation__asset-balance">
                    <CompactNumber
                      value={item.underlyingBalance}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  </p>
                </td>
                <td align="right">
                  <p className="UserInformation__asset-value">
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
      <GradientLine size={1} />

      <div className="UserInformation__info-container">
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

        {!!underlyingBalance && (
          <div className="UserInformation__row">
            <CollateralHelpModal text={intl.formatMessage(messages.collateral)} />
            <CustomSwitch
              value={
                userReserve?.usageAsCollateralEnabledOnUser && poolReserve.usageAsCollateralEnabled
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
            <span className="UserInformation__noData">—</span>
          )}
        </Row>
        <HealthFactor value={user?.healthFactor || '-1'} withHALLink={true} />
        <Row title={intl.formatMessage(messages.loanToValue)}>
          <ValuePercent value={user?.currentLoanToValue || 0} />
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
            <span className="UserInformation__noData">—</span>
          )}
        </Row>
      </div>

      <GradientLine size={1} />

      <div className="UserInformation__action-container">
        <p className="UserInformation__title">Expanded pages</p>

        <div className="UserInformation__action-button-container">
          <ContainedButton
            size="small"
            fullWidth
            href={`/deposit/${poolReserve.underlyingAsset}-${poolReserve.id}`}
            disabled={poolReserve.isFrozen}
          >
            Deposit
          </ContainedButton>

          <OutlineButton
            href={`/withdraw/${poolReserve.underlyingAsset}-${poolReserve.id}`}
            disabled={!underlyingBalance}
            size="small"
            fullWidth
            color="third"
          >
            Withdraw
          </OutlineButton>

          <ContainedButton
            size="small"
            fullWidth
            href={`/loop/?symbol=${symbol}`}
            disabled={!availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen}
          >
            Loop
          </ContainedButton>

          <ContainedButton
            size="small"
            fullWidth
            href={borrowLink}
            disabled={!availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen}
          >
            Borrow
          </ContainedButton>

          <OutlineButton
            href={repayLink}
            disabled={!totalBorrows}
            size="small"
            fullWidth
            color="third"
          >
            Repay
          </OutlineButton>
        </div>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .UserInformation {
            .CardWrapper__children {
              display: flex;
              flex-direction: column;
              padding: 0;
            }

            &__asset-container {
              padding: 24px;

              & th {
                font-size: 12px;
                font-weight: 400;
                color: ${currentTheme.text.offset2};
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
              color: ${currentTheme.text.offset2};
            }

            &__asset-value {
              font-size: 12px;
              color: ${currentTheme.text.main};
            }

            &__title {
              font-weight: 600;
              font-size: 16px;
              color: ${currentTheme.text.main};
            }

            &__action-container {
              display: flex;
              flex-direction: column;
              gap: 20px;
              padding: 24px;
            }

            &__action-button-container {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 6px;
            }

            &__info-container {
              display: flex;
              flex-direction: column;
              gap: 12px;
              padding: 24px;
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
    </CardWrapper>
  );
}
