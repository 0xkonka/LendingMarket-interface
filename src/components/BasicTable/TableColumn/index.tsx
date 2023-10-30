import { ReactNode } from 'react';
import classNames from 'classnames';

import staticStyles from './style';

interface TableColumnProps {
  children?: ReactNode;
  className?: string;
  maxWidth?: number;
  minWidth?: number;
  onClick?: () => void;
}

export default function TableColumn({
  children,
  className,
  maxWidth,
  minWidth,
  onClick,
}: TableColumnProps) {
  return (
    <div
      className={classNames('TableColumn', className)}
      style={{ maxWidth, minWidth }}
      onClick={onClick}
    >
      {children}
      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
