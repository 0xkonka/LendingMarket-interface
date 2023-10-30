import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useThemeContext, DropdownWrapper, TokenIcon } from 'aave-ui-kit';
import { getAssetInfo } from 'helpers/config/assets-config';
import { InterestRate } from '@aave/protocol-js';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { loanActionLinkComposer } from 'helpers/loan-action-link-composer';

export default function AssetSelector({
  currencySymbol,
  type = 'deposit',
}: {
  currencySymbol: string;
  type?: 'deposit' | 'borrow';
}) {
  const history = useHistory();
  const { currentTheme, sm } = useThemeContext();
  const { reserves } = useDynamicPoolDataContext();

  const [visible, setVisible] = useState(false);
  const asset = getAssetInfo(currencySymbol);

  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, [setVisible]);

  const handleSetCurrentMarket = useCallback(
    (reserve: any) => {
      let link = '';
      switch (type) {
        case 'deposit':
          link = `/deposit/${reserve.underlyingAsset}-${reserve.id}`;
          break;
        case 'borrow':
          link = loanActionLinkComposer(
            'borrow',
            reserve.id,
            InterestRate.Stable,
            reserve.underlyingAsset
          );
          break;
      }

      history.push(link);
      setVisible(false);
    },
    [type, history, setVisible]
  );

  return (
    <DropdownWrapper
      withArrow={true}
      className="AssetSelector"
      horizontalPosition={sm ? 'center' : 'left'}
      verticalPosition={'bottom'}
      visible={visible}
      setVisible={setVisible}
      buttonComponent={
        <button className="AssetSelector__button" onClick={toggleVisible} type="button">
          <TokenIcon
            tokenSymbol={currencySymbol}
            tokenFullName={asset.formattedSymbol || currencySymbol}
            height={20}
            width={20}
          />
        </button>
      }
    >
      <div className="AssetSelector__content">
        {reserves.map((item) => {
          const isSelected = currencySymbol === item.symbol;

          return (
            <button
              onClick={() => handleSetCurrentMarket(item)}
              className={classNames('AssetSelector__reserve', {
                AssetSelector__reserveSelected: isSelected,
              })}
              type="button"
              disabled={isSelected}
              key={item.symbol}
            >
              <TokenIcon
                tokenSymbol={item.symbol}
                tokenFullName={item.name}
                height={20}
                width={20}
              />
            </button>
          );
        })}
      </div>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/screen-size';
          @import 'src/_mixins/variables';

          .AssetSelector {
            .DropdownWrapper__icon {
              top: 24px;
              border-color: ${currentTheme.text.main};
            }

            &__button {
              border-radius: 4px;
              position: relative;
              width: 130px;
              z-index: 2;
              gap: 6px;
              font-size: 16px;
              font-weight: 600;
              color: ${currentTheme.text.offset1};
              border: 1px solid ${currentTheme.text.offset3};
              border-radius: 10px;
              padding: 16px;
              padding-right: 30px;
            }

            &__content {
              width: 130px;
              position: relative;
              background: ${currentTheme.interface.mainTable};
              border: 1px solid ${currentTheme.text.offset3};
              border-radius: 10px;
              padding: 10px 0;
            }

            &__reserve {
              display: flex;
              padding: 12px 16px;
              width: 100%;
              &:hover {
                background: ${currentTheme.interface.divider};
              }
            }

            &__reserveSelected {
              background: ${currentTheme.interface.divider};
            }
          }
        `}
      </style>
    </DropdownWrapper>
  );
}
