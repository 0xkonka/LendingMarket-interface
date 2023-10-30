import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { getProvider, isFeatureEnabled } from 'helpers/config/markets-and-network-config';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import { useRdntethTokenInfo } from 'libs/aave-protocol-js/hooks/use-rdnteth-token-info';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { GeistTokenContract } from 'libs/aave-protocol-js/GeistToken/GeistTokenContract';
import ScreenWrapper from 'components/wrappers/ScreenWrapper';
import Preloader from 'components/basic/Preloader';
import FaucetAssetTable from '../../components/FaucetAssetTable';
import { FaucetTableItem } from '../../components/FaucetAssetTable/types';
import messages from './messages';
import { isEmpty } from 'helpers/utility';

export default function FaucetMain() {
  const intl = useIntl();
  const { userId, rawReserves, networkConfig } = useStaticPoolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { walletData } = useWalletBalanceProviderContext();
  const { tokenInfo } = useRdntethTokenInfo();
  const { currentMarketData, chainId } = useProtocolDataContext();

  const [faucetList, setFaucetList] = useState<FaucetTableItem[]>([]);

  const getFaucetList = useCallback(async () => {
    const listData = rawReserves
      .filter(
        (reserve) => reserve.symbol.toUpperCase() !== networkConfig.baseAsset && !reserve.isFrozen
      )
      .map<FaucetTableItem>((reserve) => {
        const walletBalance =
          walletData[reserve.underlyingAsset] === '0'
            ? valueToBigNumber('0')
            : valueToBigNumber(walletData[reserve.underlyingAsset] || '0').dividedBy(
                valueToBigNumber('10').pow(reserve.decimals)
              );
        return {
          ...reserve,
          walletBalance,
          faucetUrl: `/faucet/${reserve.underlyingAsset}-${reserve.id}`,
        };
      });

    const stakingToken = {
      id: `${networkConfig.addresses.stakingToken.toLowerCase()}${networkConfig.addresses.lendingPoolAddressProvider.toLowerCase()}`,
      symbol: `RDNT/${networkConfig.baseAssetWrappedSymbol}`,
      subSymbol: networkConfig.baseAssetWrappedSymbol,
      walletBalance: tokenInfo?.walletBalance || valueToBigNumber('0'),
      underlyingAsset: networkConfig.addresses.stakingToken.toLowerCase(),
      faucetUrl: `/faucet/lp`,
    };

    let faucetList = [];
    if (isFeatureEnabled.migration(currentMarketData)) {
      const geistTokenContract = new GeistTokenContract(
        getProvider(chainId),
        currentMarketData.addresses?.radiantV1 || ''
      );

      const radiantV1Info = await geistTokenContract.getInfo(user?.id || '');

      const radiantV1Token = {
        id: `${networkConfig.addresses?.radiantV1?.toLowerCase()}${networkConfig.addresses.lendingPoolAddressProvider.toLowerCase()}`,
        symbol: `RDNT`,
        walletBalance: radiantV1Info?.walletBalance || valueToBigNumber('0'),
        underlyingAsset: (networkConfig.addresses?.radiantV1 || '').toLowerCase(),
        faucetUrl: `/faucet/rdnt-v1`,
      };
      faucetList = [...listData, radiantV1Token, stakingToken];
    } else {
      faucetList = [...listData, stakingToken];
    }

    setFaucetList(faucetList);
  }, [rawReserves, networkConfig, walletData, tokenInfo, user]);

  useEffect(() => {
    if (!isEmpty(rawReserves) && !isEmpty(walletData) && !isEmpty(tokenInfo)) {
      getFaucetList();
    }
  }, [rawReserves, walletData, tokenInfo]);

  if (!walletData) {
    return <Preloader />;
  }

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTitleOnDesktop={true}
      withMobileGrayBg={true}
    >
      <FaucetAssetTable listData={faucetList} userId={userId} />
    </ScreenWrapper>
  );
}
