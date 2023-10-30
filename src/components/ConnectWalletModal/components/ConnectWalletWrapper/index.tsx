import { ReactNode, ReactNodeArray } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import RadiantModal from 'components/basic/RadiantModal';
import messages from './messages';
import staticStyles from './style';

interface ConnectWalletWrapperProps {
  children: ReactNode | ReactNodeArray;
  className?: string;
  isVisible: boolean;
  onBackdropPress: () => void;
}

export default function ConnectWalletWrapper({
  children,
  className,
  isVisible,
  onBackdropPress,
}: ConnectWalletWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <RadiantModal
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}
      withCloseButton={true}
      className={classNames('ConnectWalletWrapper', className)}
    >
      <div className="ConnectWalletWrapper__inner">
        <div className="ConnectWalletWrapper__caption-inner">
          <h2>{intl.formatMessage(messages.caption)}</h2>
        </div>
        {children}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ConnectWalletWrapper {
          color: ${currentTheme.text.main};
          h2 {
            color: ${currentTheme.text.main};
          }
        }
      `}</style>
    </RadiantModal>
  );
}
