import { useIntl } from 'react-intl';
import { useState, useEffect } from 'react';
import messages from './messages';
import { useThemeContext } from 'aave-ui-kit';

export default function AirdropStats() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  // Target date: January 28, 2024 at 00:00:00 UTC
  const targetDate: Date = new Date(Date.UTC(2024, 0, 28, 0, 0, 0));

  // State to hold the remaining time
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Calculate the remaining time
  const calculateRemainingTime = () => {
    const currentTime: number = Date.now(); // Get current time in UTC format
    const timeDifference: number = targetDate.getTime() - currentTime;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      setRemainingTime({
        days,
        hours,
        minutes,
      });

      // Calculate the time remaining until the next whole minute
      const nextMinute = 60000 - (currentTime % 60000);
      setTimeout(() => {
        calculateRemainingTime();
      }, nextMinute);
    } else {
      // Countdown has ended or the target date has passed
      setRemainingTime({
        days: 0,
        hours: 0,
        minutes: 0,
      });
    }
  };

  // Calculate remaining time when the component mounts
  useEffect(() => {
    calculateRemainingTime();
  }, []);

  return (
    <>
      <div className="AirdropStats">
        <div className="AirdropStats__content-column">
          <p>{intl.formatMessage(messages.stat1)}</p>

          <div className="AirdropStats__stat-container">
            <div className="AirdropStats__timer-content-row">
              <div className="AirdropStats__timer-content">
                <h1>{remainingTime.days}</h1>
                <span>{intl.formatMessage(messages.days)}</span>
              </div>
              <div className="AirdropStats__timer-content">
                <h1>{remainingTime.hours}</h1>
                <span>{intl.formatMessage(messages.hours)}</span>
              </div>
              <div className="AirdropStats__timer-content">
                <h1>{remainingTime.minutes}</h1>
                <span>{intl.formatMessage(messages.minutes)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .AirdropStats {
            display: flex;
            flex-direction: row;
            gap: 32px;

            &__content-column {
              display: flex;
              flex-direction: column;
              text-align: center;
              flex: 1;
              gap: 4px;
              color: ${currentTheme.text.main};

              p {
                font-size: $fontSizeMedium;
                font-weight: $fontWeightSemiBold;
              }

              h1 {
                font-family: 'Inter';
                font-weight: $fontWeightMedium;
                font-size: $fontSizeXXLarge;
                line-height: 1;
              }
            }

            &__stat-container {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            }

            &__divider {
              content: '';
              background: ${currentTheme.interface.tableBorder};
              height: 100%;
              width: 1px;
            }

            &__timer-content-row {
              display: flex;
              gap: 8px;

              span {
                font-size: $fontSizeSmall;
                font-weight: $fontWeightSemiBold;
                color: ${currentTheme.text.offset2};
              }
            }

            &__timer-content {
              display: flex;
              flex-direction: row;
              align-items: flex-end;
              gap: 4px;
            }
          }
        `}
      </style>
    </>
  );
}
