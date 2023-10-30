import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { PERMISSION } from '@radiantcapital/contract-helpers';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import PermissionWarning from 'ui-config/branding/PermissionWarning';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import NoDataPanel from 'components/NoDataPanel';
import Borrow1ClickLoopForm from 'components/Borrow1ClickLoopForm';
import LoopCurrencyWrapper from '../../components/LoopCurrencyWrapper';
import messages from './messages';
import staticStyles from './style';

function LoopMain() {
  const intl = useIntl();
  const { location } = useHistory();
  const { reserves, user } = useDynamicPoolDataContext();

  const [reserveId, setReserveId] = useState<string>('');

  const stableReserves = useMemo(
    () => reserves.filter(({ borrowingEnabled, isActive }) => borrowingEnabled && isActive),
    [reserves]
  );

  useEffect(() => {
    if (!!reserveId || stableReserves.length === 0) {
      return undefined;
    }

    const query = queryString.parse(location.search);
    const selectedSymbol = query.symbol ? query.symbol : 'USDT';

    const usdtReserve = stableReserves.find((item) => item.symbol === selectedSymbol);
    if (!!usdtReserve) {
      setReserveId(usdtReserve.id);
    } else {
      setReserveId(stableReserves[0]?.id);
    }
  }, [stableReserves]);

  const poolReserve = useMemo(
    () => reserves.find((res) => res.id === reserveId),
    [reserves, reserveId]
  );

  const userReserve = useMemo(
    () => user?.userReservesData.find((userReserve) => userReserve.reserve.id === reserveId),
    [user, reserveId]
  );

  const currencySymbol = poolReserve?.symbol || '';

  return (
    <>
      <div className="LoopMain">
        <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
          {!!poolReserve ? (
            <LoopCurrencyWrapper
              currencySymbol={currencySymbol}
              poolReserve={poolReserve}
              user={user}
              userReserve={userReserve}
            >
              <Borrow1ClickLoopForm
                stableReserves={stableReserves}
                currencySymbol={currencySymbol}
                user={user}
                poolReserve={poolReserve}
                setReserveId={setReserveId}
                className="LoopMain__1-click-loop-form"
              />
            </LoopCurrencyWrapper>
          ) : (
            <NoDataPanel title={intl.formatMessage(messages.noDataText)} />
          )}
        </PermissionWarning>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}

export default LoopMain;
