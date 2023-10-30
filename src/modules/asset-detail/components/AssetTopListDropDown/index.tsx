import { useCallback } from 'react';
import { getAssetInfo, TokenIcon, useThemeContext } from 'aave-ui-kit';
import { useHistory } from 'react-router-dom';

interface AssetTopListProps {
  assetList?: any[];
  selectedSymbol: string;
  symbolTokenName: Record<string, string>;
}

export default function AssetTopListDropDown({
  assetList,
  selectedSymbol,
  symbolTokenName,
}: AssetTopListProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const history = useHistory();
  const handleClick = useCallback(
    (asset) => {
      history.push(`/asset-detail/${asset.underlyingAsset}-${asset.id}`);
    },
    [history]
  );

  return (
    <div className="AssetTopListDropDown">
      {assetList &&
        assetList
          .filter((asset) => asset.symbol !== selectedSymbol)
          .map((asset) => (
            <div
              className="AssetTopListDropDown__item"
              onClick={() => {
                handleClick(asset);
              }}
            >
              <TokenIcon width={25} height={25} tokenSymbol={asset.symbol} />
              <p className="AssetTopListDropDown__item__symbol">
                {getAssetInfo(asset.symbol).symbolFormatted || asset.symbol}
              </p>
              <p className="AssetTopListDropDown__item__tokenName">
                {symbolTokenName[asset.symbol]}
              </p>
            </div>
          ))}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .AssetTopListDropDown {
            width: 100%;
            z-index: 9;

            &__item {
              height: 45px;
              padding: 10px 24px;
              display: flex;
              align-items: center;

              font-family: 'PP Mori';
              font-style: normal;
              font-weight: 600;
              font-size: 12px;
              line-height: 17px;

              &__symbol {
                color: ${currentTheme.text.main};
                margin-left: 39px;
                width: 110px;
              }

              &__tokenName {
                color: ${currentTheme.text.offset3};
              }
            }

            &__item:hover {
              cursor: pointer;
              background-color: ${isCurrentThemeDark ? 'rgb(71,81,103, 0.25)' : '#f2f4f7'};
            }
          }
        `}
      </style>
    </div>
  );
}
