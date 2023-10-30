import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { PERMISSION } from '@radiantcapital/contract-helpers';

import { usePermissions } from 'libs/use-permissions/usePermissions';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import Caption from 'components/basic/Caption';
import ScreenWrapper from 'components/wrappers/ScreenWrapper';
import ContentWrapper from 'components/wrappers/ContentWrapper';
import { isFeatureEnabled } from 'helpers/config/markets-and-network-config';
import messages from './messages';
import staticStyles from './style';

interface PermissionWarningProps {
  requiredPermission: PERMISSION;
  children: React.ReactElement;
}

/**
 * Is rendered when you're trying to perform an action you are not allowed to
 * @param requiredPermission holds the permission currently needed
 * @returns
 */
const PermissionWarning: React.FC<
  RouteComponentProps<{ id?: string; underlyingAsset?: string }> & PermissionWarningProps
> = ({ children, requiredPermission, match }) => {
  const intl = useIntl();
  const { currentMarketData } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();
  const { permissions } = usePermissions();

  if (
    !isFeatureEnabled.permissions(currentMarketData) ||
    !userId ||
    permissions.includes(requiredPermission)
  ) {
    return children;
  }

  return (
    <ScreenWrapper className="PermissionWarning">
      <ContentWrapper withBackButton={true} withFullHeight={true}>
        <Caption
          title={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description)}
        />
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
};

export default withRouter(PermissionWarning);
