import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import OutlineButton from 'components/basic/OutlineButton';
import { useMenuContext } from 'libs/menu';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import messages from './messages';

export default function NoWalletContent({
  align = 'center',
  padding = 0,
}: {
  align?: 'center' | 'flex-start' | 'flex-end';
  padding?: number;
}) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { showSelectWalletModal } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <div className="NoWalletContent">
      <OutlineButton
        color="third"
        size="small"
        className="NoWalletContent__connect"
        onClick={() => {
          showSelectWalletModal();
          closeMobileMenu();
        }}
      >
        {intl.formatMessage(messages.connectYourWallet)}
      </OutlineButton>
      <style jsx={true}>
        {`
          .NoWalletContent {
            display: flex;
            justify-content: ${align};
            width: 100%;
            padding: ${padding};

            &__connect {
              font-size: 14px;
              color: ${currentTheme.text.main};
            }
          }
        `}
      </style>
    </div>
  );
}
