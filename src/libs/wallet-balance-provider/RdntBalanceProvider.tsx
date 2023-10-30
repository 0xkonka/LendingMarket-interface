import React, { useCallback, useContext, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { valueToBigNumber } from '@aave/protocol-js';
import { ethers } from 'ethers';

import { POLLING_INTERVAL } from 'helpers/config/common';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { GeistTokenContract } from 'libs/aave-protocol-js/GeistToken/GeistTokenContract';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { AaveProtocolDataProviderContract } from 'libs/aave-protocol-js/AaveProtocolDataProvider/AaveProtocolDataProviderContract';
import { ChefIncentivesService } from 'libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';

type RdntBalanceProviderContext = {
  walletBalance: BigNumber;
  currencySymbol: string;
  totalSupply: BigNumber;
  nativeTokenBalance: string;
  loading: boolean;
  ready: boolean;
  refetch: () => void;
  fetchVestable: () => void;
  earned: BigNumber;
  locked: BigNumber;
  staked: BigNumber;

  availableForVesting: number;
  vestable: string[];
};

const Context = React.createContext<RdntBalanceProviderContext>({} as RdntBalanceProviderContext);

export const RdntBalanceProvider: React.FC = ({ children }) => {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [nativeTokenBalance, setNativeTokenBalance] = useState<string>('0');
  const [tokenInfo, setTokenInfo] = useState<{
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  }>({
    walletBalance: valueToBigNumber(0),
    currencySymbol: 'RDNT',
    totalSupply: valueToBigNumber(0),
  });

  const [earned, setEarned] = useState<BigNumber>(valueToBigNumber(0));
  const [locked, setLocked] = useState<BigNumber>(valueToBigNumber(0));
  const [staked, setStaked] = useState<BigNumber>(valueToBigNumber(0));

  const [availableForVesting, setAvailableForVesting] = useState<number>(0);
  const [vestable, setVestable] = useState<string[]>([]);

  const fetch = useCallback(async () => {
    if (chainId && userId) {
      const provider = getProvider(chainId);
      const contract = new GeistTokenContract(
        getProvider(chainId),
        currentMarketData.addresses.rdntToken
      );
      const rdntInfo = await contract.getInfo(userId);
      const nativeBalance = await provider.getBalance(userId);
      const nativeBalanceValue = ethers.utils.formatUnits(nativeBalance);
      setNativeTokenBalance(nativeBalanceValue);
      setTokenInfo(rdntInfo);
      setReady(true);
    }
  }, [chainId, userId]);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      await fetch();
    } catch (e) {
      console.log('error fetching RDNT balance', e);
    }
    setLoading(false);
  }, [setLoading, fetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const fetchUserEarnings = useCallback(async () => {
    if (!chainId || !userId) {
      return;
    }

    const multiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    try {
      const [totalBalance, unlocked, earned] = await multiFeeDistributionService.getBalances(
        userId
      );
      setEarned(earned);
      setLocked(totalBalance.minus(unlocked));
      setStaked(unlocked);
    } catch (e) {
      console.log(e);
    }
  }, [chainId, userId]);

  useEffect(() => {
    fetchUserEarnings();
  }, [fetchUserEarnings]);

  const fetchVestable = useCallback(async () => {
    if (!chainId || !userId) {
      return;
    }

    const dataProviderContract = new AaveProtocolDataProviderContract(
      getProvider(chainId),
      currentMarketData.addresses.aaveProtocolDataProvider
    );
    const chefChefIncentivesService = new ChefIncentivesService(
      getProvider(chainId),
      currentMarketData.addresses.chefIncentivesController
    );

    const tokens = await dataProviderContract.getTokens();
    const [amounts, userBaseClaimable] = await Promise.all([
      chefChefIncentivesService.pendingRewards(userId, tokens),
      chefChefIncentivesService.userBaseClaimable(userId),
    ]);

    let result = amounts
      .filter((amount) => Number(amount) > 0.001)
      .reduce((s, n) => s + Number(n), 0);
    result += userBaseClaimable;
    setAvailableForVesting(result);

    const vestableTokens: string[] = [];
    amounts.forEach((amount, i) => {
      if (Number(amount) > 0.001) {
        vestableTokens.push(tokens[i]);
      }
    });
    setVestable(vestableTokens);
  }, [chainId, userId]);

  useEffect(() => {
    fetchVestable();
    const interval = setInterval(fetchVestable, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchVestable]);

  return (
    <Context.Provider
      value={{
        ...tokenInfo,
        nativeTokenBalance,
        loading,
        ready,
        refetch,

        earned,
        locked,
        staked,

        availableForVesting,
        vestable,
        fetchVestable,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useRdntBalanceContext = () => useContext(Context);
