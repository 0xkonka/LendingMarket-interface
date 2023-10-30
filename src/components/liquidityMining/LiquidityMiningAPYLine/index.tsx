import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

import { TokenIcon } from 'helpers/config/assets-config';
import ValuePercent from 'components/basic/ValuePercent';
import messages from './messages';

interface LiquidityMiningAPYLineProps {
  symbol?: string;
  value: string | number;
  grossValue: string | number;
  tooltipId?: string;
  noBorder?: boolean;
}

export default function LiquidityMiningAPYLine({
  symbol,
  value,
  grossValue,
  tooltipId,
  noBorder = false,
}: LiquidityMiningAPYLineProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div className="LiquidityMiningAPYLineBorder">
      <div
        className={classNames('LiquidityMiningAPYLine', {
          LiquidityMiningAPYLine__withTooltip: tooltipId,
          LiquidityMiningAPYLine__noBorder: noBorder,
        })}
        data-tip={true}
        data-for={tooltipId}
      >
        <TokenIcon tokenSymbol={`rdnt`} width={16} height={16} />
        <ValuePercent value={value ? value : grossValue} maximumDecimals={2} minimumDecimals={2} />
        <p className="LiquidityMiningAPYLine__title">{intl.formatMessage(messages.apr)}</p>
      </div>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        @import 'src/_mixins/variables';

        .LiquidityMiningAPYLineBorder {
          background-image: -webkit-gradient(
            linear,
            0% 100%,
            0% 0%,
            color-stop(0.33, rgb(95, 0, 250)),
            color-stop(0.67, rgb(0, 255, 170))
          );
          margin-top: 3px;
          padding: 1px;
          border-radius: $borderRadius;
        }

        .LiquidityMiningAPYLine {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 3px;
          padding: 6px;
          background-color: ${isCurrentThemeDark ? '#0a0c10' : '#fff'};

          &__noBorder {
            border: none;
            box-shadow: none;
          }

          &__notEligable {
            border-color: ${currentTheme.text.negative};
          }

          .ValuePercent {
            font-family: 'Inter';
            font-weight: 500;
          }

          .ValuePercent .ValuePercent__value,
          &__title {
            font-family: 'Inter';
            font-size: 14px;
            font-weight: 500;
            color: ${currentTheme.text.main} !important;
          }
        }
      `}</style>
    </div>
  );
}
