import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import MarketChain from 'components/MarketChain';
import Preloader from 'components/basic/Preloader';
import AssetAction from '../../components/AssetAction';
import ReserveInformation from '../../components/ReserveInformation';
import AssetUserInformation from '../../components/AssetUserInformation';
import AssetTopInfo from '../../components/AssetTopInfo';
import BackIcon from 'icons/Back';

function AssetDetail({
  poolReserve,
  userReserve,
  currencySymbol,
  walletBalance,
  user,
  selectedTab,
}: ValidationWrapperComponentProps) {
  const history = useHistory();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();

  const goBackHandler = useCallback(() => {
    history.push('/markets');
  }, [history]);

  const { walletData } = useWalletBalanceProviderContext();

  if (!walletData) {
    return <Preloader withText={true} />;
  }

  return (
    <div className="AssetDetail">
      <div className="AssetDetail__container">
        <div className="AssetDetail__header">
          <button type="button" onClick={() => goBackHandler()}>
            <BackIcon />
          </button>
          <MarketChain />
        </div>

        <AssetTopInfo symbol={currencySymbol} poolReserve={poolReserve} />

        <AssetAction
          currencySymbol={currencySymbol}
          user={user}
          poolReserve={poolReserve}
          userReserve={userReserve}
          walletBalance={walletBalance}
          selectedTab={selectedTab}
        />

        <AssetUserInformation
          symbol={currencySymbol}
          user={user}
          poolReserve={poolReserve}
          userReserve={userReserve}
          walletBalance={walletBalance}
        />

        <ReserveInformation
          poolReserve={poolReserve}
          userReserve={userReserve}
          walletBalance={walletBalance}
          user={user}
          marketRefPriceInUsd={marketRefPriceInUsd}
          symbol={currencySymbol}
        />
      </div>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .AssetDetail {
          display: flex;
          flex-direction: column;
          align-items: center;

          &__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            max-width: $maxDeskWidth;
            width: 100%;
            padding: 56px 12px;
          }

          &__header {
            display: flex;
            align-items: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
})(AssetDetail);
