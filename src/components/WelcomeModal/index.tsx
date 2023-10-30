import { useCallback, useEffect, useState } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import ContainedButton from 'components/basic/ContainedButton';
import CheckBoxField from 'components/fields/CheckBoxField';
import RadiantModal from 'components/basic/RadiantModal';
import messages from './messages';

const OFFSET_DAYS = 30;

export default function WelcomeModal() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const [openWelcomeModal, setOpenWelcomeModal] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const hideWelcomeModal = localStorage.getItem('hideWelcomeModal');
    const hideWelcomeModalDate = hideWelcomeModal ? new Date(hideWelcomeModal) : new Date();

    setOpenWelcomeModal(hideWelcomeModalDate <= new Date());
  }, [setOpenWelcomeModal]);

  const agreeButtonHandler = useCallback(() => {
    let agreeDate = new Date();

    if (agree) {
      agreeDate.setDate(agreeDate.getDate() + OFFSET_DAYS);
    }

    localStorage.setItem('hideWelcomeModal', agreeDate.toString());
    setOpenWelcomeModal(false);
  }, [agree, setOpenWelcomeModal]);

  return (
    <RadiantModal
      onBackdropPress={() => {}}
      isVisible={openWelcomeModal}
      withCloseButton={false}
      className={'welcome-modal'}
      title={intl.formatMessage(messages.title)}
    >
      <p className="desc">
        {intl.formatMessage(messages.description1)}
        <br />
        <br />
        {intl.formatMessage(messages.description2, {
          network: (
            <a href="https://ipfs.io/" target="_blank" rel="noreferrer">
              {intl.formatMessage(messages.network)}
            </a>
          ),
        })}
        <br />
        <br />
        {intl.formatMessage(messages.description3, {
          termsOfService: (
            <a
              href="https://docs.radiant.capital/radiant/other-info/terms-of-service"
              target="_blank"
              rel="noreferrer"
            >
              {intl.formatMessage(messages.termsOfService)}
            </a>
          ),
        })}
      </p>

      <CheckBoxField
        value={agree}
        name="WelcomModal__checkbox"
        onChange={() => setAgree(!agree)}
        title={intl.formatMessage(messages.confirm)}
      />

      <ContainedButton fullWidth onClick={agreeButtonHandler}>
        {intl.formatMessage(messages.continue)}
      </ContainedButton>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';
          .welcome-modal {
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;
            max-width: 375px;

            .desc {
              font-size: 14px;
              color: ${currentTheme.text.main};

              a {
                color: ${currentTheme.brand.main};
              }
            }
          }
        `}
      </style>
    </RadiantModal>
  );
}
