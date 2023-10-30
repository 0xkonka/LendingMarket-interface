import { useCallback } from 'react';
import { Range } from 'react-range';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';
import { calculateHealthFactorFromBalancesBigUnits, valueToBigNumber } from '@aave/protocol-js';

import {
  useStaticPoolDataContext,
  useDynamicPoolDataContext,
  UserSummary,
} from 'libs/pool-data-provider';
import ValuePercent from '../ValuePercent';
import messages from './messages';
import classNames from 'classnames';

export enum Action {
  DEPOSIT = 0,
  WITHDRAW = 1,
  REPAY = 2,
  BORROW = 3,
}

interface RiskBarProps {
  value: number;
  action: Action;
  onChange: (amount: string) => void;
  maxAmount: string;
  currencySymbol: string;
  isReverse?: boolean;
}

export default function RiskBar({
  value,
  action,
  onChange,
  maxAmount,
  currencySymbol,
}: RiskBarProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { reserves, user } = useDynamicPoolDataContext();

  const reserveETHPrice = reserves.find(
    (reserve) => reserve.symbol === currencySymbol
  )?.priceInMarketReferenceCurrency;

  const isReverse = action === Action.DEPOSIT || action === Action.REPAY;

  const handleChange = useCallback(
    (value: number[]) => {
      onChange(value[0].toString());
    },
    [onChange]
  );

  if (!user) {
    return null;
  }

  const newHealthFactor = calcNewHealthFactor(
    action,
    valueToBigNumber(value),
    user,
    reserveETHPrice,
    marketRefPriceInUsd
  );

  return (
    <div className="RiskBar">
      <div className="RiskBar__top-inner">
        <span className="RiskBar__title">
          {intl.formatMessage(isReverse ? messages.riskier : messages.safer)}
        </span>
        {Number(newHealthFactor) > 0 && newHealthFactor.lt(valueToBigNumber('1000')) && (
          <div className="RiskBar__newHF">
            <p>{intl.formatMessage(messages.newHF)}</p>
            <ValuePercent value={newHealthFactor} color="dark" percentSymbol={false} />
          </div>
        )}
        <span className="RiskBar__title">
          {intl.formatMessage(isReverse ? messages.safer : messages.riskier)}
        </span>
      </div>

      <div
        className={classNames('RiskBar__range-inner', isReverse && 'RiskBar__range-inner-reserve')}
      >
        <Range
          step={Number(maxAmount) / 100 || 1}
          min={0}
          max={Number(maxAmount) || 1}
          values={[value]}
          onChange={(values) => handleChange(values)}
          renderTrack={({ props, children }) => (
            <div className="RiskBar__track" {...props}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => <div className="RiskBar__thumb" {...props} />}
        />
      </div>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .RiskBar {
          margin: 10px 0;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;

          &__top-inner {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 8px;
            width: 100%;
          }

          &__title {
            font-size: $fontSizeXSmall;
            color: ${currentTheme.text.offset1};
          }

          &__newHF {
            display: flex;
            align-items: center;
            color: ${currentTheme.textDarkBlue.hex};

            p,
            .ValuePercent .ValuePercent__value {
              font-size: $fontSizeSmall;
            }
            .ValuePercent {
              margin-left: 5px;
            }
          }

          &__range-inner {
            width: 100%;
            border-radius: 10px;
            background-image: linear-gradient(to left, #ff59a4, #ffc64e 55%, #3cecd1 100%);
          }

          &__range-inner-reserve {
            background-image: linear-gradient(
              to right,
              #ff59a4,
              #ffc64e 55%,
              #3cecd1 100%
            ) !important;
          }

          .RiskBar__track {
            height: 5px;
            width: calc(100% - 14px);
            margin: 0 auto;
            border-radius: 10px;
          }

          .RiskBar__thumb {
            width: 18px;
            height: 18px;
            border-radius: 28px;
            border: 2px solid ${currentTheme.text.offset2};
            outline: none !important;
            background: ${currentTheme.interface.mainTable};
          }
        }
      `}</style>
    </div>
  );
}

function calcNewHealthFactor(
  action: Action,
  value: BigNumber,
  user: UserSummary,
  reserveETHPrice: string | undefined,
  marketRefPriceInUsd: string
): BigNumber {
  const amountInUSD = valueToBigNumber(value)
    .multipliedBy(reserveETHPrice || '0')
    .multipliedBy(marketRefPriceInUsd);

  switch (action) {
    case Action.BORROW:
      return calculateHealthFactorFromBalancesBigUnits(
        valueToBigNumber(user.totalCollateralUSD),
        valueToBigNumber(user.totalBorrowsUSD).plus(amountInUSD),
        user.currentLiquidationThreshold
      );

    case Action.DEPOSIT:
      return calculateHealthFactorFromBalancesBigUnits(
        valueToBigNumber(user.totalCollateralUSD).plus(amountInUSD),
        valueToBigNumber(user.totalBorrowsUSD),
        user.currentLiquidationThreshold
      );

    case Action.REPAY:
      return calculateHealthFactorFromBalancesBigUnits(
        valueToBigNumber(user.totalCollateralUSD),
        valueToBigNumber(user.totalBorrowsUSD).minus(amountInUSD),
        user.currentLiquidationThreshold
      );

    case Action.WITHDRAW:
      return calculateHealthFactorFromBalancesBigUnits(
        valueToBigNumber(user.totalCollateralUSD).minus(amountInUSD),
        valueToBigNumber(user.totalBorrowsUSD),
        user.currentLiquidationThreshold
      );

    default:
      return valueToBigNumber(0);
  }
}
