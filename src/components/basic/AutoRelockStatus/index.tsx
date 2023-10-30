import { useThemeContext } from 'aave-ui-kit';

import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';

interface AutoRelockStatusProps {
  fontSize?: number;
}

function AutoRelockStatus({ fontSize = 12 }: AutoRelockStatusProps) {
  const { currentTheme } = useThemeContext();
  const { lpRelockStatus } = useUserMFDStats();

  return (
    <div className="AutoRelockStatus">
      <p>{lpRelockStatus ? 'Enabled' : 'Disabled'}</p>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';
        @import 'src/_mixins/variables';

        .AutoRelockStatus {
          p {
            font-weight: 600;
            font-family: 'PP Mori';
            font-style: normal;
            font-size: ${fontSize};
            line-height: 17px;
            color: ${lpRelockStatus ? currentTheme.brand.main : currentTheme.text.offset2};
          }
        }
      `}</style>
    </div>
  );
}

export default AutoRelockStatus;
