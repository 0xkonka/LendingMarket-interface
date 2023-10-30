import { ReactNode } from 'react';
import { TokenIcon, useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

import { networkConfigs } from 'ui-config/networks';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import TextWithTooltip from 'components/TextWithTooltip';
import CompactNumber from 'components/basic/CompactNumber';

interface StatsInfoItemProps {
  title?: string;
  value?: number;
  infoText?: string | ReactNode;
  color?: 'gradient' | 'positive' | 'negative' | 'yellow';
  children?: ReactNode;
  dollarPrefix?: boolean;
  showFullNum?: boolean;
  subValue?: number;
  decimals?: number;
  isPercent?: boolean;
  isLP?: boolean;
  tokenSymbol?: string;
  className?: string;
}

export default function StatsInfoItem({
  title,
  value,
  infoText,
  color,
  children,
  dollarPrefix,
  showFullNum,
  subValue,
  isPercent,
  tokenSymbol,
  className,
  decimals = 2,
  isLP = false,
}: StatsInfoItemProps) {
  const { currentTheme } = useThemeContext();
  const { chainId } = useProtocolDataContext();

  return (
    <div className={classNames('StatsInfoItem', className)}>
      {title && (
        <div className="StatsInfoItem__title">
          {title}

          {infoText && (
            <TextWithTooltip text={''} iconSize={12} id={title || 'title'}>
              {typeof infoText === 'string' ? (
                <p className="StatsInfoItem__modal-text">{infoText}</p>
              ) : (
                infoText
              )}
            </TextWithTooltip>
          )}
        </div>
      )}

      <div className="StatsInfoItem__main-value-container">
        {!!tokenSymbol && (
          <div className="StatsInfoItem__token-name">
            <TokenIcon tokenSymbol={tokenSymbol} height={25} width={25} />
            {isLP && (
              <TokenIcon
                tokenSymbol={networkConfigs[chainId].baseAsset}
                height={25}
                width={25}
                className="StatsInfoItem__native-token"
              />
            )}
          </div>
        )}

        <p
          className={classNames('StatsInfoItem__main-value', `StatsInfoItem__main-value-${color}`)}
        >
          {dollarPrefix && '$'}
          {value &&
            (value === Number(Infinity) ? (
              '∞'
            ) : (
              <CompactNumber
                value={value}
                maximumFractionDigits={decimals}
                minimumFractionDigits={decimals}
                showFullNum={false}
              />
            ))}
          {isPercent && '%'}
        </p>
      </div>

      {!!subValue && (
        <p className="StatsInfoItem__sub-value">
          $
          <CompactNumber
            value={subValue}
            maximumFractionDigits={2}
            minimumFractionDigits={2}
            showFullNum={false}
          />{' '}
          USD
        </p>
      )}

      {children}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .StatsInfoItem {
            display: flex;
            flex-direction: column;

            &__title {
              display: flex;
              align-items: center;
              font-size: 14px;
              font-weight: 600;
              line-height: 20px;
              color: ${currentTheme.text.offset3};
              gap: 4px;
              margin-bottom: 4px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            &__main-value-container {
              display: flex;
              align-items: center;
              gap: 4px;
              margin-bottom: 1px;
            }

            &__main-value {
              font-size: 25px;
              font-weight: 700;
              font-family: 'Inter';
              color: ${currentTheme.text.main};
            }

            &__main-value-gradient {
              background: ${currentTheme.gradient.main};
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
            }

            &__main-value-negative {
              color: ${currentTheme.text.negative};
            }

            &__main-value-positive {
              color: #30d158; // currentTheme.text.positive on aave-ui-kit;
            }

            &__main-value-yellow {
              color: ${currentTheme.note.main};
            }

            &__sub-value {
              font-family: 'Inter';
              font-size: 14px;
              font-weight: 400;
              color: ${currentTheme.text.offset2};
            }

            &__token-name {
              display: flex;
              align-items: center;
            }

            &__native-token {
              margin-left: -5px;
            }
          }
        `}
      </style>
    </div>
  );
}
