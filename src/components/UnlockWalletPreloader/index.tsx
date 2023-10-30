import { useIntl } from 'react-intl';

import { UnlockWalletPreloaderProps } from 'libs/web3-data-provider';
import Preloader from 'components/basic/Preloader';
import messages from './messages';

export function UnlockWalletPreloader({ currentProviderName }: UnlockWalletPreloaderProps) {
  const intl = useIntl();
  const isLedger = currentProviderName === 'ledger';
  return (
    <Preloader
      subCaption={isLedger ? intl.formatMessage(messages.ledgerHelpCaption) : ''}
      subDescription={isLedger ? intl.formatMessage(messages.ledgerHelpDescription) : ''}
      withBackground={true}
    />
  );
}
