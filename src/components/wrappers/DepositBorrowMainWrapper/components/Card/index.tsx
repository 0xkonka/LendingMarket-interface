import { useThemeContext } from 'aave-ui-kit';

import { getAssetInfo, TokenIcon } from 'helpers/config/assets-config';
import Link from 'components/basic/Link';
import Value from 'components/basic/Value';
import Row from 'components/basic/Row';
import staticStyles from './style';

interface CardProps {
  link: string;
  symbol: string;
  id: string;
  value: string;
  underlyingAsset: string;
}

export default function Card({ link, symbol, id, value, underlyingAsset }: CardProps) {
  const { currentTheme, xl, sm } = useThemeContext();

  const asset = getAssetInfo(symbol);

  const iconSize = xl && !sm ? 20 : sm ? 24 : 25;

  return (
    <Link className="Card ButtonLink" to={link} color="dark">
      <Row className="Card__content">
        <TokenIcon
          tokenSymbol={symbol}
          height={iconSize}
          width={iconSize}
          tokenFullName={asset.shortSymbol || asset.formattedName}
        />
        <Value
          value={value}
          maximumValueDecimals={2}
          tooltipId={`${underlyingAsset}-${id}`}
          maximumSubValueDecimals={2}
          className="Card__value"
        />
      </Row>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Card {
          &:hover {
            .TokenIcon .TokenIcon__name {
              b {
                color: ${currentTheme.primary.hex};
              }
            }
          }
          &__content {
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </Link>
  );
}
