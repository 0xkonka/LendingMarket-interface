import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import TableCol from '../TableCol';
import AMPLWarning from 'components/AMPLWarning';
import { getAssetInfo, TokenIcon } from 'helpers/config/assets-config';
import staticStyles from './style';

interface TableItemProps {
  inline?: boolean;
  tokenSymbol: string;
  color?: string;
  textOverride?: string;
  children: ReactNode;
  maxWidthOverride?: number;
  className?: string;
}

export default function TableItem({
  tokenSymbol,
  color,
  inline = false,
  children,
  textOverride,
  maxWidthOverride,
  className,
  ...rest
}: TableItemProps) {
  const { currentTheme, isCurrentThemeDark, lg } = useThemeContext();
  const asset = getAssetInfo(tokenSymbol);

  return (
    <div
      className={classNames(
        'TableItem',
        {
          TableItem__withInfo: tokenSymbol === 'AMPL',
          TableItem__regular: !inline,
          TableItem__textOverride: textOverride,
        },
        className
      )}
      {...rest}
    >
      <span className="TableItem__assetColor" style={{ backgroundColor: color }} />

      <TableCol
        className="TableItem__inner"
        maxWidth={lg ? 250 : maxWidthOverride ? maxWidthOverride : 90 /*160*/}
      >
        <TokenIcon
          tokenSymbol={tokenSymbol}
          tokenFullName={asset.shortSymbol || asset.formattedName || textOverride}
          height={26}
          width={26}
          className="TableItem__token"
          tooltipId={tokenSymbol}
        />
      </TableCol>

      {children}

      {tokenSymbol === 'AMPL' && <AMPLWarning />}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableItem {
          background: ${currentTheme.interface.mainTable};
          border: ${isCurrentThemeDark ? '1px solid #111620' : ''};

          &:hover {
            box-shadow: 0 0 9px 0 ${currentTheme.brand.main};
            z-index: 1;
          }

          &:active {
            border-color: ${currentTheme.interface.hover};
          }
        }
      `}</style>
    </div>
  );
}
