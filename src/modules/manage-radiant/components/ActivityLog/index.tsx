import { ethers } from 'ethers';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { UserHistoryQuery } from 'libs/subgraph-provider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserRank } from 'libs/aave-protocol-js/hooks/use-user-rank';
import CardWrapper from 'components/wrappers/CardWrapper';
import { LoadingContentSpinner } from 'components/LoadingContentSpinner';
import OutLinkIcon from 'icons/OutLink';
import NoWalletContent from 'components/NoWalletContent';
import Timestamp from 'components/basic/Timestamp';
import CompactNumber from 'components/basic/CompactNumber';
import messages from './messages';

interface ActivityLogProps {
  data: UserHistoryQuery | undefined;
}

export function ActivityLog({ data }: ActivityLogProps) {
  const intl = useIntl();
  const { user } = useDynamicPoolDataContext();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { loading } = useUserRank();
  const { networkConfig } = useProtocolDataContext();

  return (
    <CardWrapper header={<p>Activity log</p>} size="small" className="ActivityLog">
      {!user ? (
        <NoWalletContent padding={24} />
      ) : loading ? (
        <LoadingContentSpinner />
      ) : (
        <div className="ActivityLog__tables">
          <div className="ActivityLog__tables__header">
            <div className="ActivityLog__items__timestamp">
              {intl.formatMessage(messages.timestamp)}
            </div>
            <div className="ActivityLog__items__event">{intl.formatMessage(messages.event)}</div>
          </div>
          <div className="ActivityLog__tables__content">
            {data &&
              data.userTransactions.map((item, index) => {
                return (
                  <div
                    className={classNames(
                      'ActivityLog__items__row',
                      `ActivityLog__items__row__${index % 2 === 0 ? '' : 'odd'}`
                    )}
                    key={index}
                  >
                    <div className="ActivityLog__items__timestamp">
                      <Timestamp unixTimestamp={item.timestamp} />
                      <a
                        href={networkConfig.explorerLink + 'tx/' + item.id.split(':')[2]}
                        target="_blank"
                        rel="noreferrer"
                        className="ActivityLog__items__timestamp__outlink"
                      >
                        <OutLinkIcon width={12} height={12} color={currentTheme.text.offset1} />
                      </a>
                    </div>
                    <div className="ActivityLog__items__event">
                      {item.__typename === 'Relocked' ? (
                        <div className="ActivityLog__items__event__row">
                          {intl.formatMessage(messages.relocked)}{' '}
                          <b>
                            <CompactNumber
                              value={ethers.utils.formatEther(item.amount)}
                              maximumFractionDigits={5}
                              minimumFractionDigits={5}
                              showFullNum
                            />{' '}
                            dLP
                          </b>
                        </div>
                      ) : item.__typename === 'Disqualified' ? (
                        <div className="ActivityLog__items__event__row">
                          {/* <b>
                              <CompactNumber
                                value={ethers.utils.formatEther(item.rewardsRemoved)}
                                maximumFractionDigits={5}
                                minimumFractionDigits={5}
                                showFullNum
                              />{' '}
                              dLP
                            </b>{' '} */}
                          {intl.formatMessage(messages.diqualified)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ActivityLog {
            height: 100% !important;

            .CardWrapper__children {
              display: flex;
              flex-direction: column;
              padding: 0px;
            }

            &__tables {
              display: flex;
              flex-direction: column;

              &__header {
                display: flex;
                border-bottom: 1px solid ${currentTheme.interface.divider};
                font-weight: 600;
                font-size: 12px;
                padding: 8px 29px;
                color: ${currentTheme.text.offset1};

                .ActivityLog__items__timestamp {
                  flex-basis: 35%;
                }
              }

              &__content {
                padding: 7px 0;
                overflow-x: hidden;
                overflow-y: auto;
                max-height: 370px;

                /* width */
                &::-webkit-scrollbar {
                  width: 5px;
                }

                /* Track */
                &::-webkit-scrollbar-track {
                  box-shadow: inset 0 0 3px grey;
                  border-radius: 2px;
                }

                /* Handle */
                &::-webkit-scrollbar-thumb {
                  background: #9199a5;
                  border-radius: 2px;
                }

                /* Handle on hover */
                &::-webkit-scrollbar-thumb:hover {
                  background: #787c83;
                }

                .ActivityLog__items__row__odd {
                  background-color: ${isCurrentThemeDark
                    ? 'rgba(71,81,103, 0.25)'
                    : 'rgba(234, 239, 245, 0.25)'};
                }
                .ActivityLog__items {
                  &__row {
                    display: flex;
                    padding: 0 29px;
                    font-weight: 600;
                    font-size: 12px;
                    height: 50px;
                    color: ${currentTheme.text.offset2};
                  }

                  &__timestamp {
                    flex-basis: 35%;
                    display: flex;
                    align-items: center;

                    &__outlink {
                      padding-left: 20px;
                      display: flex;
                      align-items: center;
                    }
                  }

                  &__event {
                    flex-basis: 65%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    &__row {
                      display: inline;
                      b {
                        color: ${currentTheme.text.main};
                      }
                    }
                  }
                }
              }
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}
