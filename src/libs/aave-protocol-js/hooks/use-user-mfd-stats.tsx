import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { POLLING_INTERVAL } from 'helpers/config/common';
import { getProvider } from 'helpers/config/markets-and-network-config';
import {
  useMfdDefaultLockIndex,
  useMfdLockedBalances,
  useMfdLockedSupplyWithMultiplier,
} from 'client/multifee-distribution-contract-queries';

type UserMFDStatsProviderContext = {
  loading: boolean;
  defaultLockIndex: number;
  userShare: number;
  lockedSupplyWithMultiplier: number;
  userLockedWithMultiplier: number;
  relockStatus: boolean;
  lpRelockStatus: boolean;
  lpAutocompoundEnabled: boolean;
  lpUnlockable: string;
  fetchUserMFDStatsData: () => void;
};

const Context = React.createContext<UserMFDStatsProviderContext>({} as UserMFDStatsProviderContext);

export const UserMFDStatsProvider: React.FC = ({ children }) => {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();

  const [loading, setLoading] = useState<boolean>(true);
  const { data: defaultLockIndex = 0 } = useMfdDefaultLockIndex();
  const { data: lockedTable = [] } = useMfdLockedBalances(
    chainId,
    currentMarketData.addresses.rdntToken
  );
  const { data: lockedSupplyWithMultiplier = 0 } = useMfdLockedSupplyWithMultiplier(
    chainId,
    currentMarketData.addresses.rdntToken
  );
  const [relockStatus, setRelockStatus] = useState<boolean>(false);
  const [lpRelockStatus, setLPRelockStatus] = useState<boolean>(false);
  const [lpAutocompoundEnabled, setLPAutocompoundEnabled] = useState<boolean>(false);
  const [lpUnlockable, setLpUnlockable] = useState<string>('0');

  const { userShare, userLockedWithMultiplier } = useMemo(() => {
    let _userShare = 0;
    let _userLockedWithMultiplier = 0;
    if (!!lockedSupplyWithMultiplier) {
      for (const lpLocked of lockedTable) {
        _userLockedWithMultiplier += Number(lpLocked.amount) * lpLocked.multiplier;
      }
      _userShare = _userLockedWithMultiplier / lockedSupplyWithMultiplier;
    }
    return { userShare: _userShare, userLockedWithMultiplier: _userLockedWithMultiplier };
  }, [lockedSupplyWithMultiplier, lockedTable]);

  const getUserMFDStatsData = useCallback(async () => {
    try {
      const multiFeeDistributionService = new MultiFeeDistributionService(
        getProvider(chainId),
        currentMarketData.addresses.rdntToken,
        currentMarketData.addresses.multiFeeDistribution
      );

      const userId = user?.id || '';
      const [relockStatus, lpAutocompoundEnabled, lpUnlockable] = await Promise.all([
        multiFeeDistributionService.getRelockStatus(userId),
        multiFeeDistributionService.getAutocompoundEnabled(userId),
        multiFeeDistributionService.getUnlockable(userId),
      ]);

      // These are currently the same - this may have been a bug
      const lpRelockStatus = relockStatus;

      setRelockStatus(relockStatus);
      setLPRelockStatus(lpRelockStatus);
      setLPAutocompoundEnabled(lpAutocompoundEnabled);
      setLpUnlockable(lpUnlockable);
    } catch (error) {
      console.log('getUserMFDStatsData: Error => ', error);
    }
    setLoading(false);
  }, [
    user,
    chainId,
    currentMarketData,
    setLoading,
    setRelockStatus,
    setLPRelockStatus,
    setLPAutocompoundEnabled,
    setLpUnlockable,
  ]);

  useEffect(() => {
    if (user) {
      getUserMFDStatsData();
      const intervalId = setInterval(getUserMFDStatsData, POLLING_INTERVAL * 10);
      return () => clearInterval(intervalId);
    }
  }, [user, getUserMFDStatsData]);

  return (
    <Context.Provider
      value={{
        loading,
        defaultLockIndex,
        relockStatus,
        lpRelockStatus,
        lpAutocompoundEnabled,
        userShare,
        lockedSupplyWithMultiplier,
        userLockedWithMultiplier,
        lpUnlockable,
        fetchUserMFDStatsData: getUserMFDStatsData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserMFDStats = () => useContext(Context);
