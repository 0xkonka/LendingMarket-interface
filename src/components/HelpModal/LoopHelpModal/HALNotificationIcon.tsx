import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { CustomTooltip } from 'aave-ui-kit';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { CustomMarket } from 'ui-config/markets';
import { AdditionalItemProps } from '../../TextWithTooltip';
import messages from './messages';
import staticStyles from './style';
import bellGrayDark from './images/bellGrayDark.svg';
import bellGray from './images/bellGray.svg';
import bell from './images/bell.svg';

const marketToHALAaveVersionUrlParam = (market: CustomMarket): string | undefined => {
  return undefined;
};

export default function HALNotificationIcon({
  height,
  width,
  containerClassName,
  containerStyle,
  iconTheme,
}: AdditionalItemProps) {
  const intl = useIntl();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarket } = useProtocolDataContext();

  const supportedAaveVersion = marketToHALAaveVersionUrlParam(currentMarket);
  const urlString = React.useMemo(() => {
    const url = new URL('https://9000.hal.xyz/recipes/aave-track-your-health-factor');
    url.searchParams.set('user', currentAccount);

    const aaveVersionParam = supportedAaveVersion;
    if (aaveVersionParam !== undefined) {
      url.searchParams.set('aaveversion', aaveVersionParam);
    }

    return url.toString();
  }, [currentAccount, supportedAaveVersion]);

  const tooltipId = `${currentAccount}__healthFactor`;

  if (supportedAaveVersion === undefined) {
    return null;
  }

  return (
    <a
      href={urlString}
      target="_blank"
      rel="noreferrer"
      className={classNames(containerClassName, 'HALNotificationIcon')}
      style={containerStyle}
      data-tip={true}
      data-for={tooltipId}
    >
      <img
        src={iconTheme === 'dark' ? bellGrayDark : iconTheme === 'gray' ? bellGray : bell}
        alt="Notify Me"
        height={height + 2}
        width={width + 2}
      />

      <CustomTooltip
        tooltipId={tooltipId}
        text={intl.formatMessage(messages.notificationIconTooltipText)}
      />

      <style jsx={true}>{staticStyles}</style>
    </a>
  );
}
