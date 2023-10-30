import { ReactNode } from 'react';
import { useThemeContext } from 'aave-ui-kit';

import AnimationCircle from 'images/AnimationCircle';
import AaveGhost from 'images/radiant/RadiantTokenColorV2';
import staticStyles from './style';

interface InfoPanelProps {
  children: ReactNode;
}

export default function InfoPanel({ children }: InfoPanelProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="InfoPanel">
      <AnimationCircle className="InfoPanel__circle" />

      <div className="InfoPanel__content-inner">
        <AaveGhost className="InfoPanel__ghost" />
        <div className="InfoPanel__content">{children}</div>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .InfoPanel {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.purple.hex};
        }
      `}</style>
    </div>
  );
}
