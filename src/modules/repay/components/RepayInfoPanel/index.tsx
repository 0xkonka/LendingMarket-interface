import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import InfoPanel from 'components/InfoPanel';
import messages from './messages';

export default function RepayInfoPanel() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <InfoPanel>
      <p>
        {intl.formatMessage(messages.text, {
          increase: (
            <strong style={{ color: `${currentTheme.purple.hex}` }}>
              {intl.formatMessage(messages.increase)}
            </strong>
          ),
        })}
      </p>
    </InfoPanel>
  );
}
