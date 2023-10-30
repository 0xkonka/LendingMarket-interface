import React, { PropsWithChildren, useContext } from 'react';
import { FaucetService } from '@radiantcapital/contract-helpers';

import LendingPool from 'libs/aave-contact-helpers';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getProvider } from 'helpers/config/markets-and-network-config';

export interface TxBuilderContextInterface {
  lendingPool: LendingPool;
  faucetService: FaucetService;
}

const TxBuilderContext = React.createContext({} as TxBuilderContextInterface);

export function TxBuilderProvider({ children }: PropsWithChildren<{}>) {
  const { chainId: currentChainId, currentMarketData } = useProtocolDataContext();

  const lendingPool = new LendingPool(getProvider(currentChainId), {
    LENDING_POOL: currentMarketData.addresses.lendingPool,
    REPAY_WITH_COLLATERAL_ADAPTER: currentMarketData.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
    SWAP_COLLATERAL_ADAPTER: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER,
    WETH_GATEWAY: currentMarketData.addresses.wethGateway,
  });

  const faucetService = new FaucetService(
    getProvider(currentChainId),
    currentMarketData.addresses.faucet
  );

  return (
    <TxBuilderContext.Provider value={{ lendingPool, faucetService }}>
      {children}
    </TxBuilderContext.Provider>
  );
}

export const useTxBuilderContext = () => useContext(TxBuilderContext);
