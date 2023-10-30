import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import Link from 'components/basic/Link';
import DotStatus from '../DotStatus';
import messages from './messages';
import staticStyles from './style';
import LinkIcon from 'images/PurpureLinkIcon';

interface TxBottomStatusLineProps {
  title: string;
  confirmed?: boolean;
  submitted?: boolean;
  failed?: boolean;
  error?: boolean;
  txHash?: string;
}

export default function TxBottomStatusLine({
  title,
  confirmed,
  submitted,
  failed,
  error,
  txHash,
}: TxBottomStatusLineProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();

  const txReceiptUrl = txHash && networkConfig.explorerLinkBuilder({ tx: txHash });

  return (
    <div className="TxBottomStatusLine">
      <p className="TxBottomStatusLine__title">{title}</p>

      <div className="TxBottomStatusLine__status-inner">
        <DotStatus confirmed={confirmed} submitted={submitted} failed={failed} error={error} />
      </div>

      <div className="TxBottomStatusLine__linkInner">
        {!!txReceiptUrl && (
          <Link
            className="TxBottomStatusLine__link"
            to={txReceiptUrl}
            absolute={true}
            inNewWindow={true}
            color="dark"
          >
            <span>{intl.formatMessage(messages.explorer)}</span>
            <LinkIcon />
          </Link>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';
        .TxBottomStatusLine {
          color: ${currentTheme.textDarkBlue.hex};
          &:after {
            background: ${currentTheme.textDarkBlue.hex};
          }
          &__title {
            @include respond-to(sm) {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      `}</style>
    </div>
  );
}
