import { ReactNode } from 'react';
import classNames from 'classnames';

interface BasicTableProps {
  children: ReactNode;
  headerColumns?: ReactNode;
  className?: string;
}

export default function BasicTable({ children, headerColumns, className }: BasicTableProps) {
  return (
    <div className={classNames('BasicTable', className)}>
      {!!headerColumns ? <div className="BasicTable__header">{headerColumns}</div> : null}

      {children}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BasicTable {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
            min-height: 180px;

            &__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 24px;
            }
          }
        `}
      </style>
    </div>
  );
}
