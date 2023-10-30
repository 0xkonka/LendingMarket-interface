import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { messages } from './messages';
import CompactNumber from 'components/basic/CompactNumber';
import { useThemeContext } from 'aave-ui-kit';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';

type ZapDurationSelectorProps = {
  selected: number;
  setSelected: (selected: number) => void;
  setMultiplier?: (multiplier: number) => void;
  disabled?: boolean;
  isVesting?: boolean;
  classname?: string;
};

export default function ZapDurationSelector({
  selected,
  setSelected,
  setMultiplier,
  disabled = false,
  isVesting = false,
  classname,
}: ZapDurationSelectorProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { lockDurations, getZapAPR } = useMFDStats();

  return (
    <div className={classNames('ZapDurationSelector', classname)}>
      <>
        {lockDurations
          .slice()
          .reverse()
          .map((lockDuration) => {
            const isOneMonthDisabled = isVesting && lockDuration.value === 0;
            return (
              <div
                key={lockDuration.value}
                className={classNames(
                  'ZapDurationSelector__tile',
                  selected === lockDuration.value && 'ZapDurationSelector__tile--selected',
                  isOneMonthDisabled && 'ZapDurationSelector__tile--disabled'
                )}
                onClick={() => {
                  if (!disabled && !isOneMonthDisabled) {
                    setSelected(lockDuration.value);
                    setMultiplier?.(lockDuration.multiplier);
                  }
                }}
              >
                {lockDuration === lockDurations.at(-1) && (
                  <div className="ZapDurationSelector__special-header">
                    {intl.formatMessage(messages.maximum)}
                  </div>
                )}
                <p>{lockDuration.lockDuration}</p>
                <div className="ZapDurationSelector__pill">
                  <span>
                    <CompactNumber
                      value={getZapAPR(lockDuration.multiplier) * 100}
                      maximumFractionDigits={2}
                      minimumFractionDigits={0}
                      showFullNum={false}
                    />
                    % APR
                  </span>
                </div>
              </div>
            );
          })}
      </>
      <>
        {isVesting && (
          <p className="ZapDurationSelector__option-unavailable">
            {intl.formatMessage(messages.optionUnavailable)}
          </p>
        )}
      </>
      <style jsx global>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .ZapDurationSelector {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          padding-top: 16px;
          gap: 8px;

          &__tile {
            display: flex;
            flex-direction: column;
            border-radius: 16px;
            background: ${currentTheme.palette.token2.hex};
            border: 1px solid ${currentTheme.palette.token4.hex};
            box-shadow: 0px 2px 12px rgba(3, 7, 40, 0.05);
            position: relative;
            justify-content: center;
            align-items: center;
            padding: 24px 16px;
            width: 100%;
            max-width: calc(50% - 8px);
            cursor: pointer;
            color: ${currentTheme.text2.default.hex};
            font-weight: $fontWeightSemiBold;
            gap: 8px;

            &:first-child {
              border-top-left-radius: 0px;
              border-top-right-radius: 0px;
            }

            &:hover {
              background: rgba(95, 0, 250, 0.03);
            }

            &--selected {
              background: rgba(95, 0, 250, 0.05);
              border-color: ${currentTheme.accent.default.hex};

              .ZapDurationSelector__pill {
                color: ${currentTheme.accent.default.hex};
                background: rgba(95, 0, 250, 0.1);
              }
            }
          }

          &__tile--disabled {
            cursor: not-allowed;
            background: ${currentTheme.palette.token1.hex};
            border: 1px solid transparent;
            box-shadow: unset;

            &:hover {
              background: ${currentTheme.palette.token1.hex};
            }
          }

          &__special-header {
            display: flex;
            justify-content: center;
            position: absolute;
            top: -20px;
            width: calc(100% + 2px);
            color: #ffffff;
            background: ${currentTheme.accent.default.hex};
            padding: 4px;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border: 1px solid ${currentTheme.accent.default.hex};
            font-size: 13px;
          }

          &__pill {
            display: flex;
            align-items: center;
            border-radius: 64px;
            padding: 4px 8px;
            background: ${currentTheme.palette.token3.hex};
            color: ${currentTheme.text2.default.hex};
            font-size: 14px;
            font-weight: $fontWeightSemiBold;
          }

          &__option-unavailable {
            margin-top: 4px;
            font-size: 13px;
            color: ${currentTheme.text2.subdued.hex};
          }
        }
      `}</style>
    </div>
  );
}
