import { ReactNode } from 'react';
import { useThemeContext } from 'aave-ui-kit';

interface InfoRowItemProps {
  title?: string | ReactNode;
  value?: any;
}

export default function InfoRowItem({ title, value }: InfoRowItemProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="InfoRowItem">
      <div className="InfoRowItem__title">{title}</div>
      <div className="InfoRowItem__value">{value}</div>

      <style jsx={true} global={true}>{`
        .InfoRowItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          &__title {
            font-size: 12px;
            color: ${currentTheme.text.offset2};
          }

          &__value {
            font-size: 12px;
            font-weight: 600;
            color: ${currentTheme.text.offset2};
          }
        }
      `}</style>
    </div>
  );
}
