import { useThemeContext } from 'aave-ui-kit';
import { PERMISSION } from '@radiantcapital/contract-helpers';
import { useIntl } from 'react-intl';

import PermissionWarning from 'ui-config/branding/PermissionWarning';
import BridgeForm from '../../components/BridgeForm';
import messages from './messages';

function Bridge() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <>
      <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
        <div className="BridgeMain">
          <div className="BridgeMain__TopContent">
            <p className="BridgeMain__TopContent__title">{intl.formatMessage(messages.title)}</p>
            <p className="BridgeMain__TopContent__subtitle">
              {intl.formatMessage(messages.firstDescription)}
              <br />
              <br />
              {intl.formatMessage(messages.secondDescription)}
            </p>
          </div>
          <BridgeForm />
        </div>
      </PermissionWarning>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BridgeMain {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 44px 24px 180px 24px;
            z-index: 0;

            &__TopContent {
              max-width: 373px;
              font-family: 'PP Mori';
              font-style: normal;

              &__title {
                font-weight: 600;
                font-size: 20px;
                line-height: 28px;
                color: ${currentTheme.text.main};
                padding-bottom: 13px;
              }

              &__subtitle {
                font-weight: 400;
                font-size: 12px;
                line-height: 17px;
                color: ${currentTheme.text.offset2};
                padding-bottom: 33px;
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default Bridge;
