import { ReactNode } from 'react';

import { useReserveRatesHistory } from 'libs/pool-data-provider/hooks/use-reserve-rates-history';
import CurrencyScreenWrapper from 'components/wrappers/CurrencyScreenWrapper';
import { ValidationWrapperComponentProps } from 'components/RouteParamsValidationWrapper';
import { GraphPoint } from 'components/graphs/types';

interface LoopCurrencyWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  goBack?: () => void;
  children: ReactNode;
}

export default function LoopCurrencyWrapper({
  userReserve,
  poolReserve,
  user,
  currencySymbol,
  children,
}: LoopCurrencyWrapperProps) {
  const { data: borrowRatesHistory } = useReserveRatesHistory(poolReserve.id);

  const stableRateHistoryData = [] as GraphPoint[];
  const variableRateHistoryData = [] as GraphPoint[];
  borrowRatesHistory.forEach((item) => {
    stableRateHistoryData.push([
      item.timestamp,
      Number((Number(item.stableBorrowRate) * 100).toFixed(2)),
    ]);
    variableRateHistoryData.push([
      item.timestamp,
      Number((Number(item.variableBorrowRate) * 100).toFixed(2)),
    ]);
  });

  return (
    <CurrencyScreenWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      userReserve={userReserve}
      user={user}
      type="borrow"
    >
      {children}
    </CurrencyScreenWrapper>
  );
}
