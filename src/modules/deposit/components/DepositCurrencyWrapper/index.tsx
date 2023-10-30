import { ReactNode } from 'react';
import { valueToBigNumber } from '@aave/protocol-js';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import CurrencyScreenWrapper from 'components/wrappers/CurrencyScreenWrapper';
import { ValidationWrapperComponentProps } from 'components/RouteParamsValidationWrapper';
import Borrow1ClickLoopForm from 'components/Borrow1ClickLoopForm';

interface DepositCurrencyWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol' | 'walletBalance'
  > {
  children: ReactNode;
}

export default function DepositCurrencyWrapper({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  walletBalance,
  children,
}: DepositCurrencyWrapperProps) {
  const { networkConfig } = useProtocolDataContext();

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  if (maxAmountToDeposit.gt(0) && poolReserve.symbol.toUpperCase() === networkConfig.baseAsset) {
    maxAmountToDeposit = maxAmountToDeposit.minus('0.004');
  }
  if (maxAmountToDeposit.lte(0)) {
    maxAmountToDeposit = valueToBigNumber('0');
  }

  return (
    <CurrencyScreenWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      userReserve={userReserve}
      user={user}
      walletBalance={maxAmountToDeposit.toString()}
      type="deposit"
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
