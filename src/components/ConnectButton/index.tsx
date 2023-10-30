import { useIntl } from 'react-intl';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useMenuContext } from 'libs/menu';
import GradientButton from 'components/basic/GradientButton';
import messages from './messages';

interface ConnectButtonProps {
  className?: string;
  isLongName?: boolean;
  size?: string;
  fullWidth?: boolean;
}

export default function ConnectButton({
  className,
  isLongName = true,
  size = 'medium',
  fullWidth = false,
}: ConnectButtonProps) {
  const intl = useIntl();
  const { showSelectWalletModal } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <GradientButton
      type="button"
      size={size}
      className={className}
      onClick={() => {
        showSelectWalletModal();
        closeMobileMenu();
      }}
      fullWidth={fullWidth}
    >
      {intl.formatMessage(isLongName ? messages.connectWallet : messages.connect)}
    </GradientButton>
  );
}
