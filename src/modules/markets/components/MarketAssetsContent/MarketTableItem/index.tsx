import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useThemeContext } from 'aave-ui-kit';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import TableItemWrapper from 'components/BasicTable/TableItemWrapper';
import TableColumn from 'components/BasicTable/TableColumn';
import NoData from 'components/basic/NoData';
import LiquidityMiningCard from 'components/liquidityMining/LiquidityMiningCard';
import GradientAPY from 'components/liquidityMining/GradientAPY';
import CompactNumber from 'components/basic/CompactNumber';
import OpenArrowIcon from 'icons/OpenArrow';
import MarketTableItemDetail from '../MarketTableItemDetail';
import { getAssetInfo, TokenIcon } from 'helpers/config/assets-config';
import messages from './messages';

export interface MarketTableItemProps {
  id: string;
  underlyingAsset: string;
  currencySymbol: string;
  totalLiquidity: number;
  totalLiquidityInUSD: number;
  totalBorrows: number;
  totalBorrowsInUSD: number;
  depositAPY: number;
  avg30DaysLiquidityRate: number;
  variableBorrowRate: number;
  avg30DaysVariableRate: number;
  borrowingEnabled?: boolean;
  isFreezed?: boolean;
  isPriceInUSD?: boolean;
  rdntRewardsDepositApr?: number;
  rdntRewardsBorrowApr?: number;
  grossDepositApr?: number;
  grossBorrowApr?: number;
  loopApr?: number;
}

export default function MarketTableItem({
  id,
  underlyingAsset,
  currencySymbol,
  totalLiquidity,
  totalLiquidityInUSD,
  totalBorrows,
  totalBorrowsInUSD,
  depositAPY,
  avg30DaysLiquidityRate,
  variableBorrowRate,
  avg30DaysVariableRate,
  borrowingEnabled,
  isFreezed,
  isPriceInUSD,
  rdntRewardsDepositApr,
  rdntRewardsBorrowApr,
  grossDepositApr,
  grossBorrowApr,
  loopApr,
}: MarketTableItemProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [open, setOpen] = useState(false);

  const asset = getAssetInfo(currencySymbol);

  const handleClick = useCallback(() => {
    history.push(`/asset-detail/${underlyingAsset}-${id}-Borrow`);
  }, [history, underlyingAsset, id]);

  return (
    <>
      <TableItemWrapper
        withGoToTop={false}
        className={classNames('MarketTableItem', {
          MarketTableItem__open: open,
        })}
      >
        <TableColumn className="MarketTableItem__coin-column" onClick={handleClick}>
          <TokenIcon
            tokenSymbol={currencySymbol}
            height={20}
            width={20}
            tokenFullName={asset.name}
          />
          <p className="MarketTableItem__coin-value">
            {intl.formatMessage(messages.deposits)}:{' '}
            <span>
              $
              <CompactNumber
                value={isPriceInUSD ? totalLiquidityInUSD : totalLiquidity}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
                showFullNum
              />
            </span>
          </p>
          <p className="MarketTableItem__coin-value">
            {intl.formatMessage(messages.borrows)}:{' '}
            <span>
              $
              <CompactNumber
                value={isPriceInUSD ? totalBorrowsInUSD : totalBorrows}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
                showFullNum
              />
            </span>
          </p>
        </TableColumn>

        {!isFreezed && (
          <>
            <TableColumn className="MarketTableItem__value-column" onClick={handleClick}>
              <LiquidityMiningCard
                value={depositAPY}
                thirtyDaysValue={avg30DaysLiquidityRate}
                liquidityMiningValue={rdntRewardsDepositApr}
                grossValue={grossDepositApr}
                symbol={currencySymbol}
                type="deposit"
              />
            </TableColumn>

            <TableColumn className="MarketTableItem__value-column" onClick={handleClick}>
              {borrowingEnabled && +variableBorrowRate >= 0 ? (
                <LiquidityMiningCard
                  value={variableBorrowRate}
                  thirtyDaysValue={avg30DaysVariableRate}
                  liquidityMiningValue={rdntRewardsBorrowApr}
                  grossValue={grossBorrowApr}
                  symbol={currencySymbol}
                  type="borrow-variable"
                />
              ) : (
                <NoData color="dark" />
              )}
            </TableColumn>
          </>
        )}

        <TableColumn className="MarketTableItem__value-column" onClick={handleClick}>
          <GradientAPY value={loopApr || 0} />
        </TableColumn>

        {/* <TableColumn className="MarketTableItem__value-column" onClick={handleClick}>
          <GradientAPY value={loopApr || 0} />
        </TableColumn> */}

        <div
          className={classNames('MarketTableItem__action-container', {
            MarketTableItem__actionSelected: open,
          })}
          onClick={() => setOpen((prev) => !prev)}
        >
          <OpenArrowIcon />
        </div>
      </TableItemWrapper>

      {open && <MarketTableItemDetail currencySymbol={currencySymbol} onLoop={handleClick} />}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .MarketTableItem {
            position: relative;

            &__open {
              border-radius: 10px 10px 0px 0px !important;
            }

            &__coin-column {
              gap: 8px;
              align-items: flex-start !important;
              min-width: 180px;

              @include respond-to(sm) {
                min-width: 120px;
              }
            }

            &__value-column {
              min-width: 90px;
            }

            &__coin-value {
              font-size: 12px;
              font-weight: 600;
              font-family: 'Inter';
              line-height: 14.52px;
              color: ${currentTheme.text.offset1};
              & span {
                font-weight: 400;
                color: ${currentTheme.text.main};
              }
            }

            &__primary-value {
              font-size: 14px;
              font-weight: 600;
              color: ${currentTheme.text.main};
            }

            &__secondary-value {
              font-size: 14px;
              font-weight: 600;
              color: ${currentTheme.brand.main};
            }

            &__action-container {
              position: absolute;
              top: 0;
              right: 0;
              width: 60px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 0px 10px 0px 0px;

              &:hover {
                background: ${currentTheme.interface.hover};
              }
            }

            &__actionSelected {
              background: ${isCurrentThemeDark
                ? 'rgb(71,81,103, 0.25)'
                : currentTheme.interface.hover};

              & svg {
                transform: rotate(-180deg);
              }
            }
          }
        `}
      </style>
    </>
  );
}
