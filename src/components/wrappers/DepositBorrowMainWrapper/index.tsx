import { ReactNode, useState, useMemo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { isAssetStable } from 'helpers/config/assets-config';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import AssetsFilterPanel from 'components/AssetsFilterPanel';
import Borrow1ClickLoopForm from 'components/Borrow1ClickLoopForm';
import CardWrapper from '../CardWrapper';
import messages from './messages';
import staticStyles from './style';

interface DepositBorrowMainWrapperProps {
  children: ReactNode;
  items: ReactNode;
  contentTitle: string;
  itemsTitle: string;
  isShowRightPanel?: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  showOnlyStableCoins: boolean;
  setShowOnlyStableCoins: (value: boolean) => void;
  totalValue: string | number;
}

export default function DepositBorrowMainWrapper({
  children,
  items,
  contentTitle,
  itemsTitle,
  isShowRightPanel,
  searchValue,
  setSearchValue,
  showOnlyStableCoins,
  setShowOnlyStableCoins,
  totalValue,
}: DepositBorrowMainWrapperProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { reserves, user } = useDynamicPoolDataContext();

  const [reserveId, setReserveId] = useState<string>('');

  const stableReserves = useMemo(
    () =>
      reserves.filter(
        ({ symbol, borrowingEnabled, isActive }) =>
          borrowingEnabled && isActive && isAssetStable(symbol)
      ),
    [reserves]
  );

  useEffect(() => {
    if (!!reserveId || stableReserves.length === 0) {
      return undefined;
    }

    const usdtReverse = stableReserves.find((item) => item.symbol === 'USDT');
    if (!!usdtReverse) {
      setReserveId(usdtReverse.id);
    } else {
      setReserveId(stableReserves[0]?.id);
    }
  }, [stableReserves]);

  const poolReserve = useMemo(
    () => reserves.find((res) => res.id === reserveId),
    [reserves, reserveId]
  );

  const currencySymbol = poolReserve?.symbol || '';

  return (
    <div className="DepositBorrowMainWrapper">
      <div className="DepositBorrowMainWrapper__left-inner">
        {!sm && (
          <CardWrapper header={<p>{contentTitle}</p>}>
            <AssetsFilterPanel
              optionTitleLeft={intl.formatMessage(messages.optionTitleLeft)}
              optionTitleRight={intl.formatMessage(messages.optionTitleRight)}
              switchValue={showOnlyStableCoins}
              switchOnToggle={setShowOnlyStableCoins}
              searchValue={searchValue}
              searchOnChange={setSearchValue}
              darkOnDarkMode={true}
            />

            <div className="DepositBorrowMainWrapper__content">{children}</div>
          </CardWrapper>
        )}

        {sm && <div className="DepositBorrowMainWrapper__mobile--content">{children}</div>}
      </div>

      {isShowRightPanel && (
        <div className="DepositBorrowMainWrapper__right-inner">
          {!!poolReserve ? (
            <Borrow1ClickLoopForm
              stableReserves={stableReserves}
              currencySymbol={currencySymbol}
              user={user}
              poolReserve={poolReserve}
              setReserveId={setReserveId}
            />
          ) : null}

          <CardWrapper header={<p>{itemsTitle}</p>}>
            <div className="DepositBorrowMainWrapper__items">{items}</div>
            <Row
              className="DepositBorrowMainWrapper__total"
              title={intl.formatMessage(messages.total)}
            >
              <Value
                value={totalValue}
                tokenIcon={true}
                withoutSymbol={true}
                symbol="USD"
                maximumValueDecimals={2}
              />
            </Row>
          </CardWrapper>
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DepositBorrowMainWrapper {
          &__caption {
            color: ${currentTheme.textDarkBlue.hex};
          }
          .DepositBorrowMainWrapper__changeMarket-inner {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
