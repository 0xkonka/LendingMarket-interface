import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { getAssetInfo, getAssetColor } from 'helpers/config/assets-config';
import Row from 'components/basic/Row';
import CompositionBar from '../CompositionBar';
import messages from './messages';
import staticStyles from './style';

interface CollateralCompositionBarProps {
  className?: string;
  isColumn?: boolean;
}

export default function CollateralCompositionBar({
  className,
  isColumn,
}: CollateralCompositionBarProps) {
  const intl = useIntl();
  const { user, reserves } = useDynamicPoolDataContext();

  if (!user) {
    return null;
  }

  const { userReservesData, totalCollateralMarketReferenceCurrency } = user;

  const collateralComposition = userReservesData
    .filter((userReserve) => {
      const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);
      return (
        userReserve.usageAsCollateralEnabledOnUser &&
        poolReserve &&
        poolReserve.usageAsCollateralEnabled &&
        userReserve.underlyingBalance !== '0'
      );
    })
    .map((userReserve) => ({
      title: getAssetInfo(userReserve.reserve.symbol).formattedName || '',
      color: getAssetColor(userReserve.reserve.symbol),
      value: userReserve.underlyingBalance,
      percentage: valueToBigNumber(userReserve.underlyingBalanceMarketReferenceCurrency)
        .div(totalCollateralMarketReferenceCurrency)
        .multipliedBy(100)
        .precision(20, BigNumber.ROUND_UP)
        .toNumber(),
    }));

  return (
    <Row
      className={classNames('CollateralCompositionBar', className)}
      title={intl.formatMessage(messages.collateralComposition)}
      isColumn={isColumn}
    >
      <CompositionBar dataset={collateralComposition} isCollateral={true} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
