import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import WarningArea from 'components/WarningArea';
import Link from 'components/basic/Link';
import messages from './messages';
import staticStyles from './style';
import WarningIcon from 'images/WarningIcon';
import LinkIcon from 'images/BlueLinkIcon';

interface LedgerChecklistProps {
  className?: string;
}

const checks = [
  messages.firstCheck,
  messages.secondCheck,
  messages.thirdCheck,
  messages.fourthCheck,
];

export default function LedgerChecklist({ className }: LedgerChecklistProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const link = () => (
    <Link
      to="https://support.ledger.com/hc/en-us/articles/115005165269"
      color="secondary"
      absolute={true}
      inNewWindow={true}
    >
      <span>{intl.formatMessage(messages.more)}</span>
      <LinkIcon />
    </Link>
  );

  return (
    <WarningArea className={classNames('LedgerChecklist', className)}>
      <div className="LedgerChecklist__topInfo">
        <div className="LedgerChecklist__title">
          <WarningIcon />
          <strong>{intl.formatMessage(messages.cantConnect)}</strong>
        </div>

        {link()}
      </div>

      <ul className="LedgerChecklist__checkList">
        {checks.map((message, index) => (
          <li key={index}>{intl.formatMessage(message)}</li>
        ))}
      </ul>

      <div className="LedgerChecklist__mobile-link">{link()}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LedgerChecklist {
          &__checkList {
            li {
              &:before {
                color: ${currentTheme.secondary.hex};
                border: 1px solid ${currentTheme.secondary.hex};
              }
            }
          }
        }
      `}</style>
    </WarningArea>
  );
}
