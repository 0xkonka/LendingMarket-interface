import React, { useContext, useState, useEffect, useCallback } from 'react';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { POLLING_INTERVAL } from 'helpers/config/common';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { ethers } from 'ethers';
import { BountyManagerContract } from '../BountyManager/BountyManagerContract';
import { LockerListContract } from '../LockerList/LockerListContract';
import { EligibilityDataProviderService } from '../EligibilityDataProvider/EligibilityDataProviderContract';

type UserRankProviderContext = {
  loading: boolean;
  baseBounty: number;
  userLockAmount: number;
  minDLPBalance: number;
  isEligibleForBounty: boolean;
  bounties: { address: string; bounty: number }[];
  fetchUserRankData: (scanAll: boolean) => void;
};

const Context = React.createContext<UserRankProviderContext>({} as UserRankProviderContext);

export const UserRankProvider: React.FC = ({ children }) => {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [baseBounty, setBaseBounty] = useState<number>(0);
  const [userLockAmount, setUserLockAmount] = useState<number>(0);
  const [minDLPBalance, setMinDLPBalance] = useState<number>(0);
  const [isEligibleForBounty, setIsEligibleForBounty] = useState<boolean>(false);
  const [bounties, setBounties] = useState<{ address: string; bounty: number }[]>([]);

  const getUserRankData = useCallback(
    async (scanAll: boolean = false) => {
      try {
        const lpMultiFeeDistributionService = new MultiFeeDistributionService(
          getProvider(chainId),
          currentMarketData.addresses.stakingToken,
          currentMarketData.addresses.multiFeeDistribution
        );

        const lockerListContract = new LockerListContract(
          getProvider(chainId),
          currentMarketData.addresses,
          chainId
        );

        const bountyManager = new BountyManagerContract(
          getProvider(chainId),
          currentMarketData.addresses
        );

        const eligibilityService = new EligibilityDataProviderService(
          getProvider(chainId),
          currentMarketData.addresses.eligibilityDataProvider || ''
        );

        const [bounties, userLockAmount, baseBounty, minDLPBalanceValue, lpFeeBalances] =
          await Promise.all([
            lockerListContract.getBounties(scanAll),
            lpMultiFeeDistributionService.getTotalLockedMultipliedJsNum(user?.id || ''),
            bountyManager.getBaseBounty(),
            bountyManager.getMinDLPBalance(),
            user && lpMultiFeeDistributionService.getBalances(user.id),
          ]);

        const baseBountyValue = parseFloat(ethers.utils.formatUnits(baseBounty));
        setBaseBounty(baseBountyValue);

        setMinDLPBalance(parseFloat(ethers.utils.formatUnits(minDLPBalanceValue)));

        const lpLocked = lpFeeBalances ? lpFeeBalances[0].toNumber() : 0;

        if (user) {
          const canHunt =
            lpLocked !== 0 &&
            lpLocked >= minDLPBalance &&
            (await eligibilityService.isEligibleForRewards(user.id));

          setIsEligibleForBounty(canHunt);
        }
        setBounties(bounties);
        setUserLockAmount(userLockAmount);
      } catch (error) {
        console.log('getUserRankData: Error => ', error);
      }
      setLoading(false);
    },
    [
      user,
      chainId,
      currentMarketData,
      setLoading,
      setUserLockAmount,
      setBounties,
      setBaseBounty,
      setMinDLPBalance,
    ]
  );

  useEffect(() => {
    if (user) {
      getUserRankData();
      const intervalId = setInterval(getUserRankData, POLLING_INTERVAL * 10);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        loading,
        baseBounty,
        userLockAmount,
        bounties,
        minDLPBalance,
        isEligibleForBounty,
        fetchUserRankData: getUserRankData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserRank = () => useContext(Context);
