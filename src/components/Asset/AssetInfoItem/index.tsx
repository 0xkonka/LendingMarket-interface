import { useThemeContext } from 'aave-ui-kit';

import { CircleCompositionBarItem } from 'components/compositionBars/CircleCompositionBar';

export default function AssetInfoItem({ color, percent, symbol }: CircleCompositionBarItem) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  return (
    <p className="AssetInfoItem">
      <span>{symbol}</span>
      <span className="AssetInfoItem__value">{percent}%</span>
      <style jsx={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .AssetInfoItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 10px;
          font-size: 14px;
          font-weight: 600;
          color: ${currentTheme.text.offset2};
          border-left: 4px solid
            ${(symbol === 'ETH' || symbol === 'WETH') && isCurrentThemeDark
              ? currentTheme.textDarkBlue.hex
              : color};
        }

        .AssetInfoItem span {
          margin-right: 10px;
        }

        .AssetInfoItem__value {
          font-family: 'Inter';
          font-size: 14px;
          font-weight: 600;
          color: ${currentTheme.text.main};
        }
      `}</style>
    </p>
  );
}
