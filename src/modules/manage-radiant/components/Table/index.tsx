import { useIntl } from 'react-intl';
import Countdown from 'react-countdown';
import { useThemeContext } from 'aave-ui-kit';

import GradientLine from 'components/basic/GradientLine';
import CompactNumber from 'components/basic/CompactNumber';
import ExitIcon from 'icons/Exit';
import { Dispatch, SetStateAction } from 'react';
import messages from './messages';

interface TableProps {
  title: string;
  value?: string;
  action?: string;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  table?: {
    amount: string;
    expiryDate: Date;
    unlockTime: string;
    penalty?: string;
    multiplier?: number;
  }[];
  onUnlockConfirmed?: () => void;
  onExitVestTableModal?: (record: {
    amount: string;
    expiryDate: Date;
    unlockTime: string;
    penalty?: string;
    multiplier?: number;
  }) => void;
  setUnlockTime?: Dispatch<SetStateAction<string>>;
  setUnlockPenalty?: Dispatch<SetStateAction<string>>;
}

export function Table({
  action = 'Vesting',
  table = [],
  setOpenModal,
  setUnlockTime,
  setUnlockPenalty,
  onUnlockConfirmed = () => {},
}: TableProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  if (!table.length) {
    return null;
  }

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return 'Unlocked';
    } else {
      if (days > 0) return <>{days} days</>;
      if (hours > 0) return <>{hours} hours</>;
      if (minutes > 0) return <>{minutes} minutes</>;
      return <>{seconds} seconds</>;
    }
  };

  const handleOpenModal = (unlockTime: string, penaltyValue?: string) => {
    if (setUnlockTime && setUnlockPenalty && setOpenModal) {
      setUnlockTime(unlockTime);
      penaltyValue && setUnlockPenalty(penaltyValue);
      setOpenModal(true);
    }
  };

  return (
    <>
      <div className="Table">
        <div className="Table__header">
          <div className="Table__header-column">{intl.formatMessage(messages.amount)}</div>
          <div className="Table__header-column">{intl.formatMessage(messages.unlockable)}:</div>
          {action === 'Vesting' && (
            <div className="Table__header-column penalty-column">
              {intl.formatMessage(messages.penalty)}
            </div>
          )}
        </div>

        <GradientLine size={2} />

        <div className={'Table__body ' + (action === 'Vesting' ? 'vesting' : '')}>
          {table.map((record) => (
            <div className="Table__row" key={record.expiryDate.toLocaleString('en-GB')}>
              <div className="Table__column">
                {record?.multiplier && (
                  <span className="Table__multiplier">{record?.multiplier}x</span>
                )}{' '}
                <b>
                  {intl.formatNumber(parseFloat(record.amount), {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </b>{' '}
                {action === 'Vesting' ? 'RDNT' : 'dLP'}
              </div>

              <div className="Table__column">
                <Countdown
                  date={new Date(record.expiryDate)}
                  renderer={renderer}
                  onComplete={() => onUnlockConfirmed()}
                />
              </div>

              {action === 'Vesting' && (
                <div className="Table__column penalty-column">
                  <p className="penalty">
                    <CompactNumber
                      value={Number(record.penalty)}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  </p>
                  <button onClick={() => handleOpenModal(record.unlockTime, record.penalty)}>
                    <ExitIcon />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .Table {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            width: 100%;

            .GradientLine {
              margin: 10px 0;
            }

            &__header {
              display: flex;
              justify-content: space-between;
              padding: 0px 24px;
            }

            &__header-column {
              font-size: 12px;
              font-weight: 600;
              flex: 1;
              color: ${currentTheme.text.main};
            }

            &__body {
              display: flex;
              flex-direction: column;
              gap: 12px;
              max-height: 60px;
              overflow-y: scroll;

              ::-webkit-scrollbar {
                width: 5px;
              }

              ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px #e2e2e2;
                border-radius: 4px;
              }

              ::-webkit-scrollbar-thumb {
                background: ${currentTheme.brand.main};
                border-radius: 2px;
              }

              ::-webkit-scrollbar-thumb:hover {
                background: ${currentTheme.brand.main};
              }
            }

            &__row {
              display: flex;
              justify-content: space-between;
              padding: 0 24px;
            }

            &__column {
              display: flex;
              align-items: center;
              font-size: 12px;
              flex: 1;
              gap: 8px;
              color: ${currentTheme.text.offset2};
            }

            &__multiplier {
              font-size: 12px;
              font-weight: 600;
              text-align: center;
              padding: 4px;
              width: 32px;
              color: ${currentTheme.text.offset1};
              background: ${currentTheme.interface.divider};
              border-radius: 5px;
            }

            .Table__header {
              margin-top: 15px;
            }

            .penalty-column {
              display: flex;
              align-items: center;
              flex: 1;
            }

            .penalty {
              font-size: 12px;
              font-weight: 600;
              color: ${currentTheme.text.negative};
            }

            .vesting {
              height: 100%;
              max-height: 240px;
              overflow-y: scroll;
            }
          }
        `}
      </style>
    </>
  );
}
