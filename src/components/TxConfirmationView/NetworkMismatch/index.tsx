import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import { ChainId } from '@radiantcapital/contract-helpers';

import { AvailableWeb3Connectors, useUserWalletDataContext } from 'libs/web3-data-provider';
import { getNetworkConfig } from 'helpers/config/markets-and-network-config';
import AccessMaticMarketHelpModal from 'components/HelpModal/AccessMaticMarketHelpModal';
import ContainedButton from 'components/basic/ContainedButton';
import switchNetwork from './switchNetwork';
import useIsNetworkAddable from './useIsNetworkAddable';
import messages from './messages';
import staticStyles from './style';

interface NetworkMismatchProps {
  neededChainId: ChainId;
  currentChainId: ChainId;
  currentProviderName: AvailableWeb3Connectors | undefined;
}

export const ADD_CONFIG: {
  [key: number]: {
    name: string;
    explorerUrls: string[];
    nativeCurrency: { name: string; symbol: string; decimals: number };
  };
} = {
  [ChainId.polygon]: {
    name: 'Polygon',
    explorerUrls: ['https://explorer.matic.network'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [ChainId.mumbai]: {
    name: 'Mumbai',
    explorerUrls: ['https://explorer-mumbai.maticvigil.com'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [ChainId.avalanche]: {
    name: 'Avalanche',
    explorerUrls: ['https://cchain.explorer.avax.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [ChainId.fuji]: {
    name: 'Avalanche Fuji',
    explorerUrls: ['https://cchain.explorer.avax-test.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [ChainId.arbitrum_one]: {
    name: 'Arbitrum',
    explorerUrls: ['https://arbiscan.io'],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.arbitrum_rinkeby]: {
    name: 'Arbitrum Rinkeby',
    explorerUrls: ['https://testnet.arbiscan.io'],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.arbitrum_goerli]: {
    name: 'Arbitrum Goerli',
    explorerUrls: ['https://goerli-rollup-explorer.arbitrum.io/'],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.bsc]: {
    name: 'Binance Smart Chain',
    explorerUrls: ['https://bscscan.com/'],
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  [ChainId.bsc_testnet]: {
    name: 'BSC Testnet',
    explorerUrls: ['https://testnet.bscscan.com/'],
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  [ChainId.goerli]: {
    name: 'Goerli Test Network',
    explorerUrls: ['https://goerli.etherscan.io'],
    nativeCurrency: {
      name: 'Goerli',
      symbol: 'GoerliETH',
      decimals: 18,
    },
  },
  [ChainId.local]: {
    name: 'local',
    explorerUrls: ['https://testnet.arbiscan.io'],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};

export default function NetworkMismatch({
  neededChainId,
  currentProviderName,
}: NetworkMismatchProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { handleNetworkChange } = useUserWalletDataContext();

  const config = ADD_CONFIG[neededChainId];
  const isAddable = useIsNetworkAddable(currentProviderName) && config;
  const { publicJsonRPCWSUrl, rpcUrl } = getNetworkConfig(neededChainId);

  const isManualNetworkUpdateNeeded = ['torus', 'portis'].includes(currentProviderName || '');
  const isNeededNetworkNotSupported =
    neededChainId === ChainId.polygon &&
    ['authereum', 'fortmatic', 'ledger'].includes(currentProviderName || '');

  const neededNetworkConfig = getNetworkConfig(neededChainId);

  return (
    <div className="NetworkMismatch">
      <div className={classNames('NetworkMismatch__top-inner NetworkMismatch__onlyText')}>
        <h4>
          {isNeededNetworkNotSupported
            ? intl.formatMessage(messages.networkIsNotSupportedCaption)
            : intl.formatMessage(messages.caption, {
                networkName: neededNetworkConfig.isFork
                  ? neededNetworkConfig.name + ' Fork'
                  : neededNetworkConfig.name,
              })}
        </h4>

        <div className="NetworkMismatch__textInner">
          <p>
            {intl.formatMessage(messages.networkIsNotSupportedDescription, {
              networkName: neededNetworkConfig.name,
              walletName: currentProviderName,
            })}
          </p>

          {config && (
            <ContainedButton
              fullWidth
              onClick={() =>
                switchNetwork({
                  neededChainId,
                  chainName: config.name,
                  nativeCurrency: config.nativeCurrency,
                  rpcUrls: [...rpcUrl, publicJsonRPCWSUrl],
                  blockExplorerUrls: config.explorerUrls,
                })
              }
            >
              {intl.formatMessage(messages.changeNetwork)}
            </ContainedButton>
          )}

          {isManualNetworkUpdateNeeded && (
            <ContainedButton fullWidth onClick={() => handleNetworkChange(neededChainId)}>
              {intl.formatMessage(messages.changeNetwork)}
            </ContainedButton>
          )}
        </div>
      </div>

      {!isAddable && (
        <div className="NetworkMismatch__bottom-inner">
          <div className="NetworkMismatch__bottom-text">
            {isAddable && (
              <div>
                {intl.formatMessage(messages.howToChange)}{' '}
                <AccessMaticMarketHelpModal
                  className="NetworkMismatch__bottomText"
                  text="Polygon POS"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .NetworkMismatch {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.darkBlue.hex};
          h4 {
            color: ${currentTheme.purple.hex};
          }

          .NetworkMismatch__bottomText {
            .TextWithModal__text {
              color: ${currentTheme.secondary.hex} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
