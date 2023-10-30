import { useState, useEffect, useCallback } from 'react';

import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { ChefIncentivesService } from '../ChefIncentivesContract/ChefIncentivesContract';
import { AaveProtocolDataProviderContract } from '../AaveProtocolDataProvider/AaveProtocolDataProviderContract';

const useRdntVestable = () => {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();

  const [availableForVesting, setAvailableForVesting] = useState<number>(0);
  const [vestable, setVestable] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    if (!userId || !chainId) {
      return;
    }

    try {
      const dataProviderContract = new AaveProtocolDataProviderContract(
        getProvider(chainId),
        currentMarketData.addresses.aaveProtocolDataProvider
      );
      const chefChefIncentivesService = new ChefIncentivesService(
        getProvider(chainId),
        currentMarketData.addresses.chefIncentivesController
      );

      const tokens = await dataProviderContract.getTokens();
      const amounts = await chefChefIncentivesService.pendingRewards(userId, tokens);
      const result = amounts
        .filter((amount) => Number(amount) > 0.001)
        .reduce((s, n) => s + Number(n), 0);
      setAvailableForVesting(result);

      const vestableTokens: string[] = [];
      amounts.forEach((amount, i) => {
        if (Number(amount) > 0.001) {
          vestableTokens.push(tokens[i]);
        }
      });
      setVestable(vestableTokens);
    } catch (error) {
      console.log('useRdntVestable => Error: ', error);
    }
  }, [chainId, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    availableForVesting,
    vestable,
  };
};

export default useRdntVestable;
