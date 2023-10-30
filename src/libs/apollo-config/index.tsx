import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ChainId } from '@radiantcapital/contract-helpers';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';

import { getNetworkConfig } from 'helpers/config/markets-and-network-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getApolloClient } from './client-config';

const ApolloConfigContext = React.createContext<{ chainId?: ChainId }>({});
const OtherApolloConfigContext = React.createContext<{ chainId?: ChainId }>({});

export default function WrappedApolloProvider({ children }: PropsWithChildren<{}>) {
  const { networkConfig, chainId } = useProtocolDataContext();
  const [apolloClient, setApolloClient] = useState<{
    client: ApolloClient<NormalizedCacheObject>;
    chainId: ChainId;
  }>({
    client: getApolloClient(networkConfig).client,
    chainId,
  });

  useEffect(() => {
    const cfg = getApolloClient(networkConfig);
    setApolloClient({ client: cfg.client, chainId });
    return () => {
      // This is risky because other places use the client to make queries when
      // the chainId changes
      cfg.client?.clearStore();
      cfg.client?.stop();
      for (let i = 0; i < cfg.wsClients.length; i++) {
        if (cfg.wsClients[i] && cfg.wsClients[i].close) {
          cfg.wsClients[i].close();
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <ApolloConfigContext.Provider value={{ chainId: apolloClient.chainId }}>
      <ApolloProvider client={apolloClient.client}>{children}</ApolloProvider>
    </ApolloConfigContext.Provider>
  );
}

export function WrappedOtherApolloProvider({ children }: PropsWithChildren<{}>) {
  const { chainId } = useProtocolDataContext();
  const otherChainId = chainId === 42161 ? 56 : 42161;

  const [apolloClient, setApolloClient] = useState<{
    client: ApolloClient<NormalizedCacheObject>;
    otherChainId: ChainId;
  }>({
    client: getApolloClient(getNetworkConfig(otherChainId)).client,
    otherChainId,
  });

  useEffect(() => {
    const cfg = getApolloClient(getNetworkConfig(otherChainId));
    setApolloClient({ client: cfg.client, otherChainId });
    return () => {
      cfg.client?.clearStore();
      cfg.client?.stop();
      for (let i = 0; i < cfg.wsClients.length; i++) {
        if (cfg.wsClients[i] && cfg.wsClients[i].close) {
          cfg.wsClients[i].close();
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherChainId]);

  return (
    <OtherApolloConfigContext.Provider value={{ chainId: apolloClient.otherChainId }}>
      <ApolloProvider client={apolloClient.client}>{children}</ApolloProvider>
    </OtherApolloConfigContext.Provider>
  );
}

export const useApolloConfigContext = () => useContext(ApolloConfigContext);
