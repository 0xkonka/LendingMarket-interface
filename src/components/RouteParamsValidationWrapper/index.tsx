import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import { ComputedUserReserve } from '@aave/math-utils';

import {
  ComputedReserveData,
  useDynamicPoolDataContext,
  UserSummary,
  useStaticPoolDataContext,
} from 'libs/pool-data-provider';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import { CurrencyRouteParamsInterface } from 'helpers/router-types';
import Preloader from 'components/basic/Preloader';
import ErrorPage from 'components/ErrorPage';
import messages from './messages';

export interface ValidationWrapperComponentProps
  extends Pick<RouteComponentProps, 'history' | 'location'> {
  currencySymbol: string;
  amount?: BigNumber;
  chainId?: number;
  walletBalance: BigNumber;
  walletBalanceUSD: BigNumber;
  isWalletBalanceEnough: boolean;
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  isAutoDLP: boolean;
  selectedTab?: string;
}

interface RouteParamValidationWrapperProps {
  withUserReserve?: boolean;
  withWalletBalance?: boolean;
  withAmount?: boolean;
  withChainId?: boolean;
  allowLimitAmount?: boolean; // -1 for sending everything
}

export default function routeParamValidationHOC({
  withUserReserve,
  withWalletBalance,
  withAmount,
  withChainId,
  allowLimitAmount,
}: RouteParamValidationWrapperProps) {
  return (ChildComponent: React.ComponentType<ValidationWrapperComponentProps>) =>
    ({ match, location, history }: RouteComponentProps<CurrencyRouteParamsInterface>) => {
      const intl = useIntl();

      const underlyingAsset = match.params.underlyingAsset.toUpperCase();
      const reserveId = match.params.id;
      const selectedTab = match.params.selectedTab;

      const { marketRefPriceInUsd } = useStaticPoolDataContext();
      const { reserves, user } = useDynamicPoolDataContext();

      const poolReserve = reserves.find((res) =>
        reserveId
          ? res.id === reserveId
          : res.underlyingAsset.toLowerCase() === underlyingAsset.toLowerCase()
      );
      const userReserve = user
        ? user.userReservesData.find((userReserve) =>
            reserveId
              ? userReserve.reserve.id === reserveId
              : userReserve.reserve.underlyingAsset.toLowerCase() === underlyingAsset.toLowerCase()
          )
        : undefined;

      const currencySymbol = poolReserve?.symbol || '';

      const { walletData } = useWalletBalanceProviderContext({
        skip: !withWalletBalance || !poolReserve || (withUserReserve && !userReserve),
      });
      if (!walletData || !reserves.length) {
        return <Preloader withText={true} />;
      }

      if (!poolReserve) {
        // TODO: 404
        return <Redirect to="/" />;
      }
      if (!userReserve && withUserReserve) {
        return <Redirect to="/" />;
        // TODO: 404 || redirect || ?
      }

      const walletBalance = valueToBigNumber(
        walletData[poolReserve.underlyingAsset] || '0'
      ).dividedBy(valueToBigNumber(10).pow(poolReserve.decimals));
      let isWalletBalanceEnough = true;

      let amount = undefined;
      const query = queryString.parse(location.search);
      if (withAmount) {
        if (typeof query.amount === 'string') {
          amount = valueToBigNumber(query.amount);
        }
        if (
          !amount ||
          amount.isNaN() ||
          !((allowLimitAmount && amount.eq('-1')) || amount.isPositive())
        ) {
          // TODO: amount invalid
          return <ErrorPage description={intl.formatMessage(messages.error)} buttonType="back" />;
        }
        if (
          withWalletBalance &&
          (walletBalance.eq(0) || (!amount.eq('-1') && amount.gt(walletBalance)))
        ) {
          // TODO: wallet balance is too low
          isWalletBalanceEnough = false;
        }
      }

      let chainId = undefined;
      if (withChainId) {
        if (typeof query.chainId === 'string') {
          chainId = parseInt(query.chainId, 10);
        }
      }

      let isAutoDLP = false;
      if (query.isAutoDLP === 'true') isAutoDLP = true;

      const walletBalanceUSD = valueToBigNumber(walletBalance)
        .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd);

      const props = {
        poolReserve,
        userReserve,
        amount,
        chainId,
        user,
        walletBalance,
        walletBalanceUSD,
        isWalletBalanceEnough,
        currencySymbol,
        underlyingAsset,
        selectedTab,
        history,
        location,
        isAutoDLP,
      };
      return <ChildComponent {...props} />;
    };
}
