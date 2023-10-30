import React, { useContext, useState, useEffect, useCallback, FormEvent } from 'react';
import { useWeb3React } from '@web3-react/core';
import { providers, utils } from 'ethers';

import { ChefIncentivesService } from 'libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import { POLLING_INTERVAL } from 'helpers/config/common';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { EligibilityDataProviderService } from '../EligibilityDataProvider/EligibilityDataProviderContract';

type VestProviderContext = {
  isEligible: boolean;
  requiredRdntToClaim: number;
  lockedValue: number;
  lastEligibleTime: number;
  disqualifierTime: number;
  getVestData: () => void;
  vestHandler: (event: FormEvent<HTMLFormElement>) => any;
};

const Context = React.createContext<VestProviderContext>({} as VestProviderContext);

export const VestProvider: React.FC = ({ children }) => {
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();
  const { vestable, fetchVestable } = useRdntBalanceContext();

  const [requiredRdntToClaim, setRequiredRdntToClaim] = useState(0);
  const [lockedValue, setLockedValue] = useState(0);
  const [lastEligibleTime, setLastEligibleTime] = useState(0);
  const [disqualifierTime, setDisqualifierTime] = useState(0);
  const [isEligible, setIsEligible] = useState<boolean>(false);

  const getVestData = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      const eligibilityDataProviderService = new EligibilityDataProviderService(
        getProvider(chainId),
        currentMarketData.addresses.eligibilityDataProvider || ''
      );

      const [
        requiredRdntToClaimValue,
        lockedUsdValue,
        lastEligibleTimeValue,
        disqualifierTimeValue,
        isEligibleForRewardsValue,
      ] = await Promise.all([
        eligibilityDataProviderService.requiredUsdValue(userId || ''),
        eligibilityDataProviderService.lockedUsdValue(userId || ''),
        eligibilityDataProviderService.lastEligibleTime(userId || ''),
        eligibilityDataProviderService.getDqTime(userId || ''),
        eligibilityDataProviderService.isEligibleForRewards(userId || ''),
      ]);

      const lockedValue = parseFloat(utils.formatUnits(lockedUsdValue, 8));
      setLockedValue(lockedValue);

      const requiredRdntToClaim = parseFloat(utils.formatUnits(requiredRdntToClaimValue, 8));
      setRequiredRdntToClaim(requiredRdntToClaim);

      const lastEligibleTime = parseFloat(utils.formatUnits(lastEligibleTimeValue, 0));
      setLastEligibleTime(lastEligibleTime);

      const disqualifierTime = parseFloat(utils.formatUnits(disqualifierTimeValue, 0));
      setDisqualifierTime(disqualifierTime);

      setIsEligible(isEligibleForRewardsValue);
    } catch (error) {
      console.log(error);
    }
  }, [
    chainId,
    userId,
    currentMarketData,
    setLockedValue,
    setRequiredRdntToClaim,
    setLastEligibleTime,
    setDisqualifierTime,
    setIsEligible,
  ]);

  useEffect(() => {
    if (userId) {
      getVestData();
      const intervalId = setInterval(getVestData, POLLING_INTERVAL * 10);
      return () => clearInterval(intervalId);
    }
  }, [userId, getVestData]);

  const vestHandler = useCallback(
    async (event) => {
      if (!userId || !chainId) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      const chefIncentivesService = new ChefIncentivesService(
        getProvider(chainId),
        currentMarketData.addresses.chefIncentivesController
      );

      const txGetter = await chefIncentivesService.claimAll(userId);

      return sendEthTransaction(txGetter, provider, () => {}, null, {
        onConfirmation: () => {
          fetchVestable();
        },
      });
    },
    [userId, chainId, currentMarketData, provider, vestable.join(), fetchVestable]
  );

  return (
    <Context.Provider
      value={{
        isEligible,
        requiredRdntToClaim,
        lockedValue,
        lastEligibleTime,
        disqualifierTime,
        getVestData,
        vestHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useVestHandler = () => useContext(Context);
