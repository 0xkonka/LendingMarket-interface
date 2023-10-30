import { ReactNode } from 'react';

import ReturnBackIcon from 'icons/ReturnBack';
import GradientLine from 'components/basic/GradientLine';
import PageMainHeader from 'components/PageMainHeader';
import AssetSelector from 'components/AssetSelector';
import CurrencyUserInfo from './CurrencyUserInfo';
import CurrencyAssetInfo from './CurrencyAssetInfo';
import { ValidationWrapperComponentProps } from '../../RouteParamsValidationWrapper';

interface CurrencyScreenWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  walletBalance?: string;
  type: 'deposit' | 'borrow';
  goBack?: () => void;
  children: ReactNode;
  subRightForm?: ReactNode;
}

export default function CurrencyScreenWrapper({
  currencySymbol,
  poolReserve,
  user,
  userReserve,
  walletBalance,
  type,
  goBack,
  children,
  subRightForm,
}: CurrencyScreenWrapperProps) {
  return (
    <div className="CurrencyScreenWrapper">
      <PageMainHeader />
      <div className="CurrencyScreenWrapper__container">
        <div className="CurrencyScreenWrapper__header">
          <ReturnBackIcon goBack={goBack} />
          <AssetSelector currencySymbol={currencySymbol} type={type} />
        </div>

        <div className="CurrencyScreenWrapper__content">
          <div className="CurrencyScreenWrapper__children">{children}</div>
          {subRightForm ? (
            <>
              <GradientLine size={1} direction="vertical" />
              {subRightForm}
            </>
          ) : null}
        </div>

        <GradientLine size={1} direction="horizontal" />

        <div className="CurrencyScreenWrapper__info-container">
          <CurrencyUserInfo
            poolReserve={poolReserve}
            currencySymbol={currencySymbol}
            walletBalance={walletBalance}
            userReserve={userReserve}
            user={user}
            type={type}
          />

          <CurrencyAssetInfo
            user={user}
            poolReserve={poolReserve}
            currencySymbol={currencySymbol}
            type={type}
          />
        </div>
      </div>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .CurrencyScreenWrapper {
            display: flex;
            flex-direction: column;
            align-items: center;

            &__container {
              display: flex;
              flex-direction: column;
              gap: 40px;
              max-width: $maxDeskWidth;
              width: 100%;
              padding: 48px 24px;
            }

            &__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            }

            &__content {
              display: flex;
              justify-content: center;
              gap: 40px;

              @include respond-to(sm) {
                flex-direction: column;
                align-items: center;
              }
            }

            &__children {
              width: 100%;
              max-width: $maxFormWidth;
            }

            &__info-container {
              display: flex;
              justify-content: space-between;
              gap: 48px;

              @include respond-to(sm) {
                flex-direction: column;
                align-items: center;
                gap: 12px;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
