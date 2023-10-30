import { ReactNode } from 'react';
import { MultiFeeDistributionServiceProvider } from './multifee-distribution-contract-queries';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const QueryProviders = ({ children }: { children: ReactNode }) => (
  <>
    <ReactQueryDevtools initialIsOpen={false} />
    <MultiFeeDistributionServiceProvider>{children}</MultiFeeDistributionServiceProvider>
  </>
);
