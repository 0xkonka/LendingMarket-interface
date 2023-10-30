import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import MarketChain from 'components/MarketChain';
import ReturnBackIcon from 'icons/ReturnBack';
import ReserveInformation from '../../components/ReserveInformation';
import UserInformation from '../../components/UserInformation';
import Preloader from 'components/basic/Preloader';

function ReserveOverview({
  poolReserve,
  userReserve,
  currencySymbol,
  walletBalance,
  user,
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
    <div className="ReserveOverview">
      <div className="ReserveOverview__container">
        <div className="ReserveOverview__header">
          <ReturnBackIcon goBack={goBackHandler} />
          <MarketChain />
        </div>

        <div className="ReserveOverview__content">
          <ReserveInformation
            poolReserve={poolReserve}
            userReserve={userReserve}
            walletBalance={walletBalance}
            user={user}
            marketRefPriceInUsd={marketRefPriceInUsd}
            symbol={currencySymbol}
          />

          <UserInformation
            symbol={currencySymbol}
            user={user}
            poolReserve={poolReserve}
            userReserve={userReserve}
            walletBalance={walletBalance}
          />
        </div>
      </div>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .ReserveOverview {
          display: flex;
          flex-direction: column;
          align-items: center;

          &__container {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: $maxDeskWidth;
            width: 100%;
            padding: 56px 12px;
          }

          &__header {
            display: flex;
            align-items: center;
            width: 100%;
          }

          &__content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 12px;
            width: 100%;

            @include respond-to(md) {
              grid-template-columns: 1fr;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
})(ReserveOverview);
