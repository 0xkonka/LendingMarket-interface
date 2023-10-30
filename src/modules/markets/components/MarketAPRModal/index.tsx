import { useEffect, useState } from 'react';
import { Asset, useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { assetsOrder } from 'ui-config/assets';
import { useMFDStats } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import CardWrapper from 'components/wrappers/CardWrapper';
import { getAssetInfo, TokenIcon } from 'helpers/config/assets-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import APRComparisonModal from 'components/basic/APRComparisonModal';
import Close from 'icons/Close';
import messages from './messages';

interface MarketAPRModalProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

export default function MarketAPRModal({ openModal, setOpenModal }: MarketAPRModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { lpLockingApr, lockingAPRPerToken } = useMFDStats();
  const { currentMarketData } = useProtocolDataContext();

  const [lockedAssets, setLockedAssets] = useState<(Asset & { apr?: number })[]>([]);

  const toPercent = (value: number) => {
    return value * 100 >= 10 ? Math.round(value * 100) : parseFloat((value * 100).toFixed(2));
  };

  useEffect(() => {
    const assets: (Asset & { apr?: number })[] = [];

    Object.entries(lockingAPRPerToken).forEach(([tokenSymbol, apr]) => {
      const asset: Asset & { apr?: number } = getAssetInfo(tokenSymbol);
      asset.apr = apr as number;
      assets.push(asset);
    });

    assets.sort(
      ({ symbol: a }, { symbol: b }) =>
        assetsOrder.indexOf((a || '').toUpperCase()) - assetsOrder.indexOf((b || '').toUpperCase())
    );

    setLockedAssets(assets);
  }, [lpLockingApr, lockingAPRPerToken]);

  const closeButtonHandler = () => {
    setOpenModal(false);
  };

  return (
    <APRComparisonModal
      className="MarketAPRModal"
      onBackdropPress={closeButtonHandler}
      isVisible={openModal}
    >
      <CardWrapper
        header={
          <div className="MarketAPRModal__topContainer">
            <p></p>
            <p className="MarketAPRModal__title">{intl.formatMessage(messages.title)}</p>
            <button onClick={closeButtonHandler} className="MarketAPRModal__closeBtn">
              <Close color={currentTheme.text.main} />
            </button>
          </div>
        }
      >
        <div className="MarketAPRModal__container">
          <div className="MarketAPRModal__item-container">
            <p className="MarketAPRModal__label" />
            <img
              className="MarketAPRModal__chain-logo"
              src={currentMarketData.subLogo}
              alt="chain-logo"
            />
          </div>
          {lockedAssets.map((asset) => (
            <div key={asset.symbol} className="MarketAPRModal__item-container">
              <TokenIcon
                tokenSymbol={asset.symbol || ''}
                tokenFullName={asset.symbol}
                height={15}
                width={15}
                tooltipId={asset.symbol}
                className="MarketAPRModal__token-icon"
              />
              <p className="MarketAPRModal__usd">
                {new Intl.NumberFormat().format(toPercent((asset.apr && asset.apr * 25) || 0))}%
              </p>
            </div>
          ))}
        </div>
      </CardWrapper>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .MarketAPRModal {
            padding: 0 !important;

            &__topContainer {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            &__container {
              display: flex;
            }

            &__closeBtn {
            }

            &__title {
              text-align: center;
              font-weight: 600;
              margin-left: 28px;
            }

            &__container {
              display: flex;
              align-items: center;
              flex-flow: wrap;
              gap: 20px;
            }

            &__item-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
            }

            &__label {
              font-size: 12px;
              text-align: right;
              height: 17px;
              color: ${currentTheme.text.offset2};
            }

            &__chain-logo {
              height: 17px;
              white: 17px;
              object-fit: cover;
            }

            &__usd {
              font-family: 'Inter';
              font-weight: 600;
              font-size: 14px;
              color: ${currentTheme.text.main};
            }
          }
        `}
      </style>
    </APRComparisonModal>
  );
}
