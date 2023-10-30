import { useState, useMemo } from 'react';

import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import CardWrapper from 'components/wrappers/CardWrapper';
import LoadingSpinner from 'components/LoadingSpinner';
import MarketTable from './MarketTable';
import MarketTableItem from './MarketTableItem';
import MarketMobileCard from './MarketMobileCard';

interface MarketAssetsContentProps {
  marketData: any[];
  otherChain: string;
}

export default function MarketAssetsContent({ marketData, otherChain }: MarketAssetsContentProps) {
  const { networkConfig } = useStaticPoolDataContext();

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  const sortedData = useMemo(() => {
    const sortedDataValue = marketData;

    if (sortDesc) {
      if (sortName === 'currencySymbol') {
        sortedDataValue.sort((a, b) =>
          b.currencySymbol.toUpperCase() < a.currencySymbol.toUpperCase() ? -1 : 0
        );
      } else {
        // @ts-ignore
        sortedDataValue.sort((a, b) => a[sortName] - b[sortName]);
      }
    } else {
      if (sortName === 'currencySymbol') {
        sortedDataValue.sort((a, b) =>
          a.currencySymbol.toUpperCase() < b.currencySymbol.toUpperCase() ? -1 : 0
        );
      } else {
        // @ts-ignore
        sortedDataValue.sort((a, b) => b[sortName] - a[sortName]);
      }
    }
    return sortedDataValue;
  }, [sortDesc, sortName, marketData]);

  return (
    <div className="MarketAssetsContent">
      <CardWrapper header={<p>{networkConfig.name} assets</p>}>
        <div className="MarketAssetsContent__container">
          <LoadingSpinner loading={sortedData.length === 0} />

          <div className="MarketAssetsContent__desktop">
            <MarketTable
              sortName={sortName}
              setSortName={setSortName}
              sortDesc={sortDesc}
              setSortDesc={setSortDesc}
              otherChain={otherChain}
            >
              {sortedData.map((item, index) => (
                <MarketTableItem {...item} isPriceInUSD={true} key={index} />
              ))}
            </MarketTable>
          </div>

          <div className="MarketAssetsContent__mobile">
            {sortedData.map((item, index) => (
              <MarketMobileCard {...item} key={index} />
            ))}
          </div>
        </div>
      </CardWrapper>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .MarketAssetsContent {
          &__container {
            width: 100%;
            position: relative;
          }

          &__desktop {
            @include respond-to(sm) {
              display: none;
            }
          }

          &__mobile {
            display: none;
            @include respond-to(sm) {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }
          }
        }
      `}</style>
    </div>
  );
}
