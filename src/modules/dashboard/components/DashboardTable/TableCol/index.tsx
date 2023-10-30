import { ReactNode } from 'react';
import classNames from 'classnames';

import staticStyles from './style';

interface TableColProps {
  children?: ReactNode;
  className?: string;
  maxWidth?: number | string;
  minWidth?: number;
  onClick?: () => void;
}

export default function TableCol({
  children,
  className,
  maxWidth,
  minWidth,
  onClick = () => {},
}: TableColProps) {
  return (
    <div
      className={classNames('TableCol', className)}
      style={{ maxWidth, minWidth }}
      onClick={onClick}
    >
      {children}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
