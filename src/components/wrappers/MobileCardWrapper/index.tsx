import { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import goToTop from 'helpers/goToTop';
import { getAssetInfo, TokenIcon } from 'helpers/config/assets-config';
import GradientLine from 'components/basic/GradientLine';
import staticStyles from './style';

interface MobileCardWrapperProps {
  onClick?: () => void;
  disabled?: boolean;
  withGoToTop?: boolean;
  symbol: string;
  className?: string;
  subSymbolComponent?: ReactNode;
  children: ReactNode;
}

export default function MobileCardWrapper({
  symbol,
  onClick,
  disabled,
  withGoToTop,
  className,
  subSymbolComponent,
  children,
}: MobileCardWrapperProps) {
  const { currentTheme } = useThemeContext();

  const asset = getAssetInfo(symbol);

  return (
    <div
      className={classNames('MobileCardWrapper', className)}
      onClick={() => {
        !disabled && onClick && onClick();
        withGoToTop && goToTop();
      }}
    >
      <div className="MobileCardWrapper__symbol--inner">
        <TokenIcon tokenSymbol={symbol} height={24} width={24} tokenFullName={asset.name} />
        {subSymbolComponent}
      </div>

      <GradientLine size={1} />

      <div className="MobileCardWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MobileCardWrapper {
          background: ${currentTheme.interface.mainTable};
        }
      `}</style>
    </div>
  );
}
