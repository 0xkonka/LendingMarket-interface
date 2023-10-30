import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from 'aave-ui-kit';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import CircleCompositionBar, {
  CircleCompositionBarItem,
} from 'components/compositionBars/CircleCompositionBar';
import AssetInfoItem from '../AssetInfoItem';
import { isEmpty } from 'helpers/utility';
import { getAssetInfo, getAssetColor } from 'helpers/config/assets-config';
import messages from './messages';

export default function DepositComposition() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();

  const depositCompositionData: CircleCompositionBarItem[] = [];

  user?.userReservesData.forEach((userReserve) => {
    const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);

    if (!poolReserve) {
      throw new Error('data is inconsistent pool reserve is not available');
    }

    const symbolFormattedName = getAssetInfo(userReserve.reserve.symbol).formattedName;
    if (userReserve.underlyingBalance !== '0') {
      const percent = intl.formatNumber(
        valueToBigNumber(userReserve.underlyingBalanceMarketReferenceCurrency)
          .dividedBy(user?.totalLiquidityMarketReferenceCurrency)
          .multipliedBy(100)
          .toNumber(),
        { maximumFractionDigits: 2 }
      );

      depositCompositionData.push({
        label: `${symbolFormattedName}  ${percent}%`,
        value: Number(userReserve.underlyingBalanceMarketReferenceCurrency),
        color: getAssetColor(userReserve.reserve.symbol),
        percent,
        symbol: symbolFormattedName,
      });
    }
  });

  return (
    <div className="DepositComposition">
      <div className="DepositComposition__container">
        {isEmpty(depositCompositionData) ? (
          <p className="DepositComposition__no-data-container">
            {intl.formatMessage(messages.noDeposits)}
          </p>
        ) : (
          <div className="DepositComposition__chart-container">
            <CircleCompositionBar
              totalValue={Number(user?.totalLiquidityMarketReferenceCurrency || 0)}
              data={depositCompositionData}
            />

            <div className="DepositComposition__chart-info-container">
              <p className="DepositComposition__chart-header">
                {intl.formatMessage(messages.depositComposition)}
              </p>
              <div className="DepositComposition__chart-asset-container">
                {depositCompositionData
                  .filter((asset) => asset.percent !== '0')
                  .map((item) => (
                    <AssetInfoItem key={item.label} {...item} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .DepositComposition {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;

            @include respond-to(md) {
              flex-direction: column;
            }
          }

          .DepositComposition__container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: calc(100% - 2 * 24px);
            gap: 30px;

            @include respond-to(md) {
              flex-direction: column;
            }
          }

          .DepositComposition__chart-container {
            display: flex;
            gap: 30px;
          }

          .DepositComposition__no-data-container {
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${currentTheme.text.main};
            width: 100%;
            height: 200px;
          }

          .DepositComposition__chart-info-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .DepositComposition__chart-header {
            font-size: 18px;
            font-weight: 600;
            color: ${currentTheme.text.main};
          }

          .DepositComposition__chart-asset-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
        `}
      </style>
    </div>
  );
}
