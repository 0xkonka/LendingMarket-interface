import { ReactNode } from 'react';
import { ChainInfoProvider } from 'libs/aave-protocol-js/hooks/use-chain-info';
import { RdntPricesProvider } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { LoopAprProvider } from 'libs/aave-protocol-js/hooks/use-loop-apr';
import { TokenPricesProvider } from 'libs/aave-protocol-js/hooks/use-token-prices';
import { RdntEthTokenInfoProvider } from 'libs/aave-protocol-js/hooks/use-rdnteth-token-info';
import { MFDStatsProvider } from 'libs/aave-protocol-js/hooks/use-mfd-stats';
import { UserMFDStatsProvider } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import { VestProvider } from 'libs/aave-protocol-js/hooks/use-vest';
import { UserRankProvider } from 'libs/aave-protocol-js/hooks/use-user-rank';
import { QueryProviders } from 'client/query-providers';

interface CustomScrollProps {
  children: ReactNode;
}

export default function ProtocolDataHoc({ children }: CustomScrollProps) {
  return (
    <QueryProviders>
      <RdntEthTokenInfoProvider>
        <TokenPricesProvider>
          <RdntPricesProvider>
            <ChainInfoProvider>
              <MFDStatsProvider>
                <LoopAprProvider>
                  <UserMFDStatsProvider>
                    <UserRankProvider>
                      <VestProvider>{children}</VestProvider>
                    </UserRankProvider>
                  </UserMFDStatsProvider>
                </LoopAprProvider>
              </MFDStatsProvider>
            </ChainInfoProvider>
          </RdntPricesProvider>
        </TokenPricesProvider>
      </RdntEthTokenInfoProvider>
    </QueryProviders>
  );
}
