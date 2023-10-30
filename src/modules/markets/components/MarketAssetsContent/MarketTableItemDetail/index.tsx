import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import { valueToBigNumber } from '@aave/protocol-js';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import DepositFormCard from 'components/forms/DepositFormCard';
import BorrowFormCard from 'components/forms/BorrowFormCard';
import { isEmpty } from 'helpers/utility';
export interface MarketTableItemDetailProps {
  currencySymbol: string;
  onLoop: () => void;
}

const TABS = ['Deposit', 'Borrow', 'Loop'];

export default function MarketTableItemDetail({
  currencySymbol,
  onLoop,
}: MarketTableItemDetailProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { walletData } = useWalletBalanceProviderContext();

  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const poolReserve = reserves.find((reserve) => reserve.symbol === currencySymbol);

  const walletBalance = useMemo(() => {
    if (isEmpty(poolReserve)) {
      return valueToBigNumber(0);
    }

    return valueToBigNumber(walletData[poolReserve?.underlyingAsset || ''] || '0').dividedBy(
      valueToBigNumber(10).pow(poolReserve?.decimals || 18)
    );
  }, [poolReserve]);

  const tabHandler = (tab: string) => {
    if (tab === TABS[2]) {
      // history.push(`/loop/?symbol=${currencySymbol}`);
      onLoop();
      return;
    }
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="MarketTableItemDetail">
        <div className="MarketTableItemDetail__header">
          {TABS.map((tab) => (
            <p
              key={tab}
              className={classNames('MarketTableItemDetail__headerItem', {
                MarketTableItemDetail__headerSelected: tab === selectedTab,
                MarketTableItemDetail__headerDisabled: tab === TABS[2],
              })}
              onClick={() => tabHandler(tab)}
            >
              {tab}
            </p>
          ))}
        </div>
        <div className="MarketTableItemDetail__container">
          {selectedTab === TABS[0] && (
            <DepositFormCard
              currencySymbol={currencySymbol}
              poolReserve={poolReserve}
              walletBalance={walletBalance}
              user={user}
            />
          )}

          {selectedTab === TABS[1] && (
            <BorrowFormCard currencySymbol={currencySymbol} poolReserve={poolReserve} user={user} />
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .MarketTableItemDetail {
            border-radius: 0px 0px 10px 10px;
            border: ${isCurrentThemeDark ? '1px solid #0c1220' : '1px solid #ebe9f2'};
            background: ${currentTheme.interface.mainTable};

            &__header {
              display: flex;
            }

            &__headerItem {
              cursor: pointer;
              width: 143px;
              padding: 14px;
              text-align: center;
              color: ${currentTheme.text.offset1};
              font-weight: 600;
              background-color: ${isCurrentThemeDark
                ? 'rgb(71,81,103, 0.25); // this color should be added to aave-ui-kit'
                : '#f2f5f8; // this color should be added to aave-ui-kit'};
            }

            &__headerItem:hover {
              background-color: '#ebe9f2'; // this color should be added to aave-ui-kit
              color: ${currentTheme.text.main};
            }

            &__headerSelected {
              color: ${currentTheme.text.main};
              font-weight: 600;
              background-color: ${currentTheme.interface.mainTable};
              &:hover {
                color: ${currentTheme.text.main};
              }
            }

            &__headerDisabled {
              color: ${currentTheme.text.offset1};
              font-weight: 600;
              background-color: ${isCurrentThemeDark
                ? 'rgb(71,81,103, 0.25); // this color should be added to aave-ui-kit'
                : '#f2f5f8; // this color should be added to aave-ui-kit'};
              border-radius: 0px 0px 10px 0px;
              &:hover {
                color: ${currentTheme.text.main};
              }
            }

            &__container {
              padding: 18px 24px;
            }
          }
        `}
      </style>
    </>
  );
}
