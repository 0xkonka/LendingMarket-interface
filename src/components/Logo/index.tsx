import { useThemeContext } from 'aave-ui-kit';

import Link from 'components/basic/Link';
import goToTop from 'helpers/goToTop';
import classNames from 'classnames';
import Radiant from 'icons/Radiant';

interface LogoProps {
  size?: number;
  hasText?: boolean;
  className?: string;
}

export default function Logo({ size = 125, hasText = true, className }: LogoProps) {
  const { currentTheme } = useThemeContext();

  return (
    <Link to="/markets" onClick={() => goToTop()}>
      <Radiant
        color={currentTheme.text.main}
        hasText={hasText}
        className={classNames('Logo', className)}
      />

      <style jsx global>
        {`
          .Logo {
            display: flex;
            width: ${size}px;
          }

          .Menu__header,
          .MobileContent__logo {
            width: 125px;
          }
        `}
      </style>
    </Link>
  );
}
