import { useIntl } from 'react-intl';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import messages from './messages';
import staticStyles from './style';
import { MigrationStepSelectorProps } from '../../screens/MigrationMain';
import Wallet from 'icons/Wallet';
import BaseButton from 'components/BaseButton';

const linkMediumArticle =
  'https://medium.com/@RadiantCapital/defis-most-profitable-protocol-part-two-7ab13b11c2c2';
const linkTerms = 'https://docs.radiant.capital/radiant/other-info/terms-of-service';

export default function MigrationStart({
  step,
  goNextStep,
  isWalletConnected,
}: MigrationStepSelectorProps) {
  const intl = useIntl();
  const { showSelectWalletModal } = useUserWalletDataContext();

  return (
    <>
      <div className="MigrationStart">
        <h5 className="MigrationLabel">{intl.formatMessage(messages.stepLabel)}</h5>
        <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
        <p className="MigrationDescription">
          {intl.formatMessage(messages.description1A)}
          &nbsp;
          <a
            className="MigrationTextLink"
            href={linkMediumArticle}
            target="_blank"
            rel="noreferrer"
          >
            {intl.formatMessage(messages.description1B)}
          </a>
          &nbsp;
          {intl.formatMessage(messages.description1C)}
        </p>
        <div className="MigrationButtonField">
          {isWalletConnected ? (
            <BaseButton
              action={() => goNextStep()}
              text={intl.formatMessage(messages.primaryButton)}
            ></BaseButton>
          ) : (
            <BaseButton
              action={() => showSelectWalletModal()}
              iconLeft={<Wallet width={18} height={18} />}
              text={intl.formatMessage(messages.connectWallet)}
            ></BaseButton>
          )}
          <small className="MigrationDisclaimer">
            {intl.formatMessage(messages.terms1A)}
            &nbsp;
            <a className="MigrationTextLink" href={linkTerms} target="_blank" rel="noreferrer">
              {intl.formatMessage(messages.terms1B)}
            </a>
            {intl.formatMessage(messages.terms1C)}
            &nbsp;
            <a className="MigrationTextLink" href={linkTerms} target="_blank" rel="noreferrer">
              {intl.formatMessage(messages.terms1D)}
              &nbsp;
            </a>
            {intl.formatMessage(messages.terms1E)}
            &nbsp;
            <a className="MigrationTextLink" href={linkTerms} target="_blank" rel="noreferrer">
              {intl.formatMessage(messages.terms1F)}.
            </a>
          </small>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
