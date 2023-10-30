import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import { BN_ZERO } from 'helpers/leverage';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
} from 'helpers/config/markets-and-network-config';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { GeistTokenContract } from 'libs/aave-protocol-js/GeistToken/GeistTokenContract';
import Value from 'components/basic/Value';
import CardWrapper from 'components/wrappers/CardWrapper';
import { LoadingContentSpinner } from 'components/LoadingContentSpinner';
import messages from './messages';

interface RdntStatsTableProps {
  statsRerender: Number;
}

export function RdntStatsTable({ statsRerender }: RdntStatsTableProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const [rdntStats, setRdntStats] = useState<
    { name: string; circulating: number; totalSupply: number; subLogo: string }[]
  >([]);

  const queryRdntStats = useCallback(async () => {
    let stats = [] as any;
    for (const market of availableMarkets) {
      const marketData = marketsData[market];
      const config = getNetworkConfig(marketData.chainId);

      try {
        const rdntTokenContract = new GeistTokenContract(
          getProvider(marketData.chainId),
          config.addresses.rdntToken
        );

        const [circulating = BN_ZERO, totalSupply = BN_ZERO] = await Promise.all([
          1000000000,
          ethers.utils.formatEther(await rdntTokenContract.totalSupply()),
        ]);

        stats = [
          ...stats,
          {
            name: config.name,
            circulating: Number(circulating),
            totalSupply: Number(totalSupply),
            subLogo: marketData.subLogo,
          },
        ];
      } catch (error) {
        console.log('error => ', error);
      }
    }
    setRdntStats(stats);
  }, []);

  useEffect(() => {
    queryRdntStats();
  }, [statsRerender]);

  return (
    <CardWrapper header={<p>{intl.formatMessage(messages.rdntTokenStats)}</p>} size="small">
      <div className="RdntStatsTable">
        {rdntStats.length === 0 ? (
          <LoadingContentSpinner />
        ) : (
          <div className="RdntStatsTable__tables">
            <table>
              <thead>
                <tr>
                  <th align="left">{intl.formatMessage(messages.network)}</th>
                  <th align="right">{intl.formatMessage(messages.supply)}</th>
                </tr>
              </thead>
              <tbody>
                {rdntStats
                  .filter((item) => item.name !== 'Local-T')
                  .map((item) => (
                    <tr key={item.name}>
                      <td className="RdntStatsTable__network">
                        <img className="RdntStatsTable__subLogo" src={item.subLogo} alt="" />
                        {item.name}
                      </td>
                      <td align="right">
                        <Value
                          value={item.totalSupply.toFixed(0)}
                          maximumValueDecimals={0}
                          className="feesUsd"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .RdntStatsTable {
            display: flex;
            flex-direction: column;
            gap: 20px;

            &__tables {
              display: flex;
              flex-direction: column;
              gap: 12px;

              tr {
                height: 35px;
              }

              th {
                color: ${currentTheme.text.main};
                font-weight: 600;
                font-size: 14px;
              }

              td {
                color: ${currentTheme.text.offset2};
              }
            }

            &__network {
              display: flex;
              align-items: center;
              font-size: 14px;
              gap: 8px;
            }

            &__subLogo {
              width: 20px;
            }
          }
        `}
      </style>
    </CardWrapper>
  );
}
