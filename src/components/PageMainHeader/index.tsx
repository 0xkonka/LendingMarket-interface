import { useState } from 'react';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import PageConnectWalletHeader from './PageConnectWalletHeader';
import PageNetworkMismatchHeader from './PageNetworkMismatchHeader';
import PageEmissionHeader from './PageEmissionHeader';
import MARKET_HEADER_BACKGROUND from 'images/background/market-header.jpg';
import MARKET_HEADER_LEFT_BACKGROUND from 'images/background/market-header-left.png';
import MARKET_HEADER_RIGHT_BACKGROUND from 'images/background/market-header-right.png';

interface PageMainHeaderProps {
  onZapConfirmed?: () => void;
}

export default function PageMainHeader({ onZapConfirmed = () => {} }: PageMainHeaderProps) {
  const { currentAccount } = useUserWalletDataContext();
  const { chainId } = useProtocolDataContext();

  const [currentChainId, setCurrentChainId] = useState<number>(1);

  const { ethereum } = window as any;
  if (ethereum && ethereum.on) {
    const handleChainChanged = (_chainId: string) => {
      let chainId = parseInt(_chainId, 16);

      if (localStorage.getItem('currentProvider') === 'wallet-connect') {
        chainId = parseInt(localStorage.getItem('wallet-connect-chain-id') ?? chainId.toString());
      }

      setCurrentChainId(chainId);
    };

    ethereum.request({ method: 'eth_chainId' }).then(handleChainChanged);
    ethereum.on('chainChanged', handleChainChanged);
  }

  const headerContainerRender = () => {
    if (!currentAccount) {
      return <PageConnectWalletHeader />;
    }

    if (chainId !== currentChainId) {
      return <PageNetworkMismatchHeader neededChainId={chainId} />;
    }

    return <PageEmissionHeader onZapConfirmed={onZapConfirmed} />;
  };

  return (
    <div className="PageMainHeader">
      {headerContainerRender()}

      <img alt="main-left" src={MARKET_HEADER_LEFT_BACKGROUND} className="PageMainHeader__left" />

      <img
        alt="main-right"
        src={MARKET_HEADER_RIGHT_BACKGROUND}
        className="PageMainHeader__right"
      />

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .PageMainHeader {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: $maxDeskWidth;
            min-height: 280px;
            background-image: url(${MARKET_HEADER_BACKGROUND});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            border-radius: $surfaceBorderRadius;
            overflow: hidden;

            img {
              -webkit-user-drag: none;
              -khtml-user-drag: none;
              -moz-user-drag: none;
              -o-user-drag: none;
              user-drag: none;
              z-index: 0;
            }

            &__left {
              position: absolute;
              left: 0;
              bottom: 0;
              pointer-events: none;
            }

            &__right {
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        `}
      </style>
    </div>
  );
}
