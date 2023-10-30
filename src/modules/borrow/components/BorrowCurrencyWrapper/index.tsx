import { ReactNode } from 'react';

import CurrencyScreenWrapper from 'components/wrappers/CurrencyScreenWrapper';
import { ValidationWrapperComponentProps } from 'components/RouteParamsValidationWrapper';
import Borrow1ClickLoopForm from 'components/Borrow1ClickLoopForm';

interface BorrowCurrencyWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  goBack?: () => void;
  children: ReactNode;
}

export default function BorrowCurrencyWrapper({
  userReserve,
  poolReserve,
  user,
  currencySymbol,
  children,
  goBack,
}: BorrowCurrencyWrapperProps) {
  return (
    <CurrencyScreenWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      userReserve={userReserve}
      user={user}
      type="borrow"
      goBack={goBack}
      subRightForm={
        <Borrow1ClickLoopForm
          currencySymbol={currencySymbol}
          user={user}
          poolReserve={poolReserve}
          isDisableTokenSelect
        />
      }
    >
      {children}
    </CurrencyScreenWrapper>
  );
}
