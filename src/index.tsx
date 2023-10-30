/// <reference types="vite/client" />
import './global-polyfill-fix';
import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import Modal from 'react-modal';
import TagManager from 'react-gtm-module';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from 'aave-ui-kit';

import App from './App';
import * as serviceWorker from './serviceWorker';
import initSentry from 'libs/sentry';
import { MenuProvider } from 'libs/menu';
import { TxBuilderProvider } from 'libs/tx-provider';
import { Web3Provider } from 'libs/web3-data-provider';
import WrappedApolloProvider from 'libs/apollo-config';
import { ReferralHandler } from 'libs/referral-handler';
import { LanguageProvider } from 'libs/language-provider';
import { ProtocolDataProvider } from 'libs/protocol-data-provider';
import ProtocolDataHoc from 'libs/aave-protocol-js/ProtocolDataHoc';
import { ApiDataProvider } from 'libs/api-data-provider/ApiDataProvider';
import { WalletBalanceProvider } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import { PermissionProvider } from 'libs/use-permissions/usePermissions';
import { DynamicPoolDataProvider } from 'libs/pool-data-provider';
import { ConnectionStatusProvider } from 'libs/connection-status-provider';
import { IncentivesDataProvider } from 'libs/pool-data-provider/hooks/use-incentives-data-context';
import { RdntBalanceProvider } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import ErrorBoundary from 'components/ErrorBoundary';
import ConnectWalletModal from 'components/ConnectWalletModal';
import { UnlockWalletPreloader } from 'components/UnlockWalletPreloader';
import StaticPoolDataProviderWrapper from 'components/PoolDataProviderWrapper';
import { IPFS_MODE } from 'helpers/config/misc-config';
import { getDefaultChainId, getSupportedChainIds } from 'helpers/config/markets-and-network-config';
import globalStyle from './globalStyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'client/query-client';
import { FeatureFlagProvider } from 'components/FeatureFlags';
import './index.css';

initSentry();
Modal.setAppElement('#root');

const GTM_ID = import.meta.env.VITE_GTM_ID;
if (GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID });
}

function getWeb3Library(provider: any): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(provider);
}

const Router = ({ children }: React.PropsWithChildren<{}>) =>
  IPFS_MODE ? <HashRouter>{children}</HashRouter> : <BrowserRouter>{children}</BrowserRouter>;

const render = () => {
  ReactDOM.render(
    <div className="Main">
      <QueryClientProvider client={queryClient}>
        <Router>
          <FeatureFlagProvider>
            <ReferralHandler>
              <LanguageProvider>
                <ThemeProvider>
                  <ProtocolDataProvider>
                    <WrappedApolloProvider>
                      <ConnectionStatusProvider>
                        <MenuProvider>
                          <Web3ReactProvider getLibrary={getWeb3Library}>
                            <ErrorBoundary>
                              <Web3Provider
                                defaultChainId={getDefaultChainId()}
                                supportedChainIds={getSupportedChainIds()}
                                preloader={UnlockWalletPreloader}
                                connectWalletModal={ConnectWalletModal}
                              >
                                <PermissionProvider>
                                  <ApiDataProvider>
                                    <WalletBalanceProvider>
                                      <StaticPoolDataProviderWrapper>
                                        <RdntBalanceProvider>
                                          <DynamicPoolDataProvider>
                                            <IncentivesDataProvider>
                                              <TxBuilderProvider>
                                                <ProtocolDataHoc>
                                                  <App />
                                                </ProtocolDataHoc>
                                              </TxBuilderProvider>
                                            </IncentivesDataProvider>
                                          </DynamicPoolDataProvider>
                                        </RdntBalanceProvider>
                                      </StaticPoolDataProviderWrapper>
                                    </WalletBalanceProvider>
                                  </ApiDataProvider>
                                </PermissionProvider>
                              </Web3Provider>
                            </ErrorBoundary>
                          </Web3ReactProvider>
                        </MenuProvider>
                      </ConnectionStatusProvider>
                    </WrappedApolloProvider>
                  </ProtocolDataProvider>
                </ThemeProvider>
              </LanguageProvider>
            </ReferralHandler>
          </FeatureFlagProvider>
        </Router>
      </QueryClientProvider>

      <style jsx={true} global={true}>
        {globalStyle}
      </style>
    </div>,
    document.getElementById('root')
  );
};

let passwordEnabled = import.meta.env.VITE_PASSWORD_PROTECTED || true;
// https://emn178.github.io/online-tools/sha256.html
// let passHash = 'e498423d689178b7ee79bf9e9f61308b9bc47ce78a16f8fc517e5793ae74d116';
let passHash = 'jumby';

// async function hashInput(message: any) {
//   // const msgUint8 = new TextEncoder().encode(message);
//   // const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
//   // const hashArray = Array.from(new Uint8Array(hashBuffer));
//   // const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
//   // return hashHex;
//   return passHash;
// }

if (passwordEnabled === 'true') {
  let attemptedPwd = prompt('Enter Password', '');
  // hashInput(attemptedPwd).then((hash) => {
  if (attemptedPwd === passHash) {
    render();
  } else {
    Sentry.captureException(new Error('Invalid Password'));
  }
  // });
} else {
  render();
}

serviceWorker.unregister();
