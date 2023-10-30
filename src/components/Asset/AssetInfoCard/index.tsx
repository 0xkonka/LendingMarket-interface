import { ReactNode } from 'react';
import { useThemeContext } from 'aave-ui-kit';

interface AssetInfoCardProps {
  children: ReactNode;
}

export default function AssetInfoCard({ children }: AssetInfoCardProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="AssetInfoCard">
      {children}

      <style jsx={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .AssetInfoCard {
            padding: 12px;
            background: ${currentTheme.interface.mainTable};
            border: 1px solid ${currentTheme.interface.divider};
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
}
