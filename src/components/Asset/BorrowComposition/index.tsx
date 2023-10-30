import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import CircleCompositionBar, {
  CircleCompositionBarItem,
} from 'components/compositionBars/CircleCompositionBar';
import GradientLine from 'components/basic/GradientLine';
import AssetInfoItem from '../AssetInfoItem';
import TotalInfoItem from '../TotalInfoItem';
import { isEmpty } from 'helpers/utility';
import { getAssetInfo, getAssetColor } from 'helpers/config/assets-config';
import messages from './messages';

export default function BorrowComposition() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const borrowCompositionData: CircleCompositionBarItem[] = [];

  user?.userReservesData.forEach((userReserve) => {
    const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);

    if (!poolReserve) {
      throw new Error('data is inconsistent pool reserve is not available');
    }

    const symbolFormattedName = getAssetInfo(userReserve.reserve.symbol).formattedName;
    if (userReserve.totalBorrows !== '0') {
      const percent = intl.formatNumber(
        valueToBigNumber(userReserve.totalBorrowsMarketReferenceCurrency)
          .dividedBy(maxBorrowAmount)
          .multipliedBy(100)
          .toNumber(),
        { maximumFractionDigits: 2 }
      );
      borrowCompositionData.push({
        label: `${symbolFormattedName}  ${percent}%`,
        value: Number(userReserve.totalBorrowsMarketReferenceCurrency),
        color: getAssetColor(userReserve.reserve.symbol),
        percent,
        symbol: symbolFormattedName,
      });
    }
  });

  const availableBorrowPower = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(user?.availableBorrowsMarketReferenceCurrency || '0').div(maxBorrowAmount);
  const availableBorrowPowerPercent = intl.formatNumber(Number(availableBorrowPower) * 100, {
    maximumFractionDigits: 2,
  });
  borrowCompositionData.push({
    value: valueToBigNumber(user?.availableBorrowsMarketReferenceCurrency || 0).toNumber(),
    label: `Borrowing Power Available: ${availableBorrowPowerPercent}%`,
    color: currentTheme.brand.main,
  });

  return (
    <div className="BorrowComposition">
      <div className="BorrowComposition__container">
        {!Number(availableBorrowPowerPercent) ? (
          <p className="BorrowComposition__no-data-container">
            {intl.formatMessage(messages.noBorrows)}
          </p>
        ) : (
          <div className="BorrowComposition__chart-container">
            {isEmpty(borrowCompositionData) ? (
              <p className="BorrowComposition__no-data">{intl.formatMessage(messages.noData)}</p>
            ) : (
              <CircleCompositionBar
                totalValue={Number(maxBorrowAmount || 0)}
                data={borrowCompositionData}
              />
            )}

            <div className="BorrowComposition__chart-info-container">
              <p className="BorrowComposition__chart-header">
                {intl.formatMessage(messages.borrowComposition)}
              </p>
              <div className="BorrowComposition__chart-asset-container">
                {borrowCompositionData
                  .filter((item) => !!item.symbol)
                  .filter((item) => item.percent !== '0')
                  .map((item) => (
                    <AssetInfoItem key={item.label} {...item} />
                  ))}
              </div>
              <GradientLine size={1} />
              <TotalInfoItem
                title={intl.formatMessage(messages.borrowAvailable)}
                percent={availableBorrowPowerPercent}
                color={currentTheme.brand.main}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BorrowComposition {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;

            @include respond-to(md) {
              flex-direction: column;
            }
          }

          .BorrowComposition__container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: calc(100% - 2 * 24px);
            gap: 30px;

            @include respond-to(md) {
              flex-direction: column;
            }
          }

          .BorrowComposition__chart-container {
            display: flex;
            gap: 30px;
          }

          .BorrowComposition__no-data-container {
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${currentTheme.text.main};
            width: 100%;
            height: 200px;
          }

          .BorrowComposition__chart-info-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .BorrowComposition__chart-header {
            font-size: 18px;
            font-weight: 600;
            color: ${currentTheme.text.main};
          }

          .BorrowComposition__chart-asset-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
        `}
      </style>
    </div>
  );
}
