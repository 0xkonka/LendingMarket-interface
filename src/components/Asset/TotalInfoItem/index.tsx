import { useThemeContext } from 'aave-ui-kit';

export default function TotalInfoItem({
  color,
  percent,
  title,
}: {
  color: string;
  percent: string;
  title: string;
}) {
  const { currentTheme } = useThemeContext();

  return (
    <p className="TotalInfoItem">
      <span>{title}</span> {percent}%
      <style jsx={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TotalInfoItem {
          font-family: 'Inter';
          display: flex;
          flex-direction: column;
          padding: 0 10px;
          font-size: 25px;
          font-weight: 700;
          color: ${currentTheme.text.main};
          border-left: 4px solid ${color};

          & span {
            font-family: 'PP Mori';
            font-size: 14px;
            font-weight: 600;
            color: ${currentTheme.text.offset2};
          }
        }
      `}</style>
    </p>
  );
}
