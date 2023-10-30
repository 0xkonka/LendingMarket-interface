import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';

interface GradientLineProps {
  size?: number;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export default function GradientLine({
  size,
  direction = 'horizontal',
  className,
}: GradientLineProps) {
  const { currentTheme } = useThemeContext();

  return (
    <p className={classNames('GradientLine', `GradientLine__${direction}`, className)}>
      <style jsx={true}>{`
        .GradientLine {
          background-color: ${currentTheme.interface.divider};

          &__horizontal {
            width: 100%;
            height: ${size || 1}px;
          }

          &__vertical {
            width: ${size || 1}px;
          }
        }
      `}</style>
    </p>
  );
}
