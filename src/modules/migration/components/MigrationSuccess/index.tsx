import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import messages from './messages';
import staticStyles from './style';
import { MigrationStepSelectorProps } from '../../screens/MigrationMain';
import { useThemeContext } from 'aave-ui-kit';
import BaseButton from 'components/BaseButton';
import BaseOutlineButton from 'components/BaseOutlineButton';

// Images
import Checkmark from 'images/MigrationCompleteCheckmark';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function MigrationSuccess({ step, goNextStep }: MigrationStepSelectorProps) {
  const history = useHistory();
  const { currentTheme } = useThemeContext();
  const intl = useIntl();

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.height = '';
      document.body.style.overflowY = '';
    };
  }, []);

  const addTokenToMetamask = async () => {
    const tokenAddress = '0x3082CC23568eA640225c2467653dB90e9250AaA0';
    const tokenSymbol = 'RDNT';
    const tokenDecimals = 18;
    const tokenImage = `${window.location.origin}/tokenImage.png`;

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.error('Error adding token to MetaMask:', error);
    }
  };
  return (
    <>
      <div className="MigrationSuccess">
        <div className="MigrationSuccessContent">
          <Checkmark className="MigrationSuccessCheckmark" />
          <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
          <p className="MigrationDescription">{intl.formatMessage(messages.description)}</p>
          <div className="MigrationButtonField">
            <BaseOutlineButton
              action={addTokenToMetamask}
              text="Add v2 RDNT to MetaMask"
            ></BaseOutlineButton>
            <BaseButton
              action={() => history.push('/dashboard')}
              text={intl.formatMessage(messages.primaryButton)}
              style={{ marginTop: '16px' }}
            ></BaseButton>
          </div>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .MigrationSuccess {
            background: ${currentTheme.interface.mainTable};
          }
        `}
      </style>
    </>
  );
}
