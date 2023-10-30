import { useIntl } from 'react-intl';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useMenuContext } from 'libs/menu';
import OutlineButton from 'components/basic/OutlineButton';
import messages from './messages';

export default function PageConnectWalletHeader() {
  const intl = useIntl();
  const { showSelectWalletModal } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <div className="PageConnectWalletHeader">
      <h3 className="PageConnectWalletHeader__title">{intl.formatMessage(messages.title)}</h3>

      <OutlineButton
        color="fourth"
        onClick={() => {
          showSelectWalletModal();
          closeMobileMenu();
        }}
        className="PageConnectWalletHeader__button"
      >
        {intl.formatMessage(messages.button)}
      </OutlineButton>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .PageConnectWalletHeader {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
            height: 100%;
            gap: 27px;

            &__title {
              font-weight: 800;
              font-size: 35px;
              line-height: 1;
              text-align: center;
              color: #ffffff;
            }

            &__button {
              font-size: 18px;
              width: 217px;

              &:hover {
                opacity: 1 !important;
                color: #0f172a;
                background: #ffffff;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
