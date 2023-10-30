import { createContext } from 'react';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';

export const MultiFeeDistributionServiceContext = createContext<MultiFeeDistributionService>(
  null as unknown as MultiFeeDistributionService
);
