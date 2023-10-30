import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import CompactNumber from 'components/basic/CompactNumber';
import { ValidationWrapperComponentProps } from 'components/RouteParamsValidationWrapper';
import InfoRowItem from '../InfoRowItem';
import messages from './messages';

interface CurrencyUserInfoProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  walletBalance?: string;
  type: 'deposit' | 'borrow';
}

export default function CurrencyUserInfo({
  userReserve,
  user,
  currencySymbol,
  walletBalance,
  type,
}: CurrencyUserInfoProps) {
  const intl = useIntl();
  const currentBorrows = userReserve ? valueToBigNumber(userReserve.totalBorrows).toString() : '0';

  return (
    <div className="CurrencyUserInfo">
      {type === 'deposit' ? (
        <InfoRowItem
          title={intl.formatMessage(messages.totalDeposits)}
          value={
            user && userReserve && Number(userReserve.underlyingBalance) > 0 ? (
              <>
                <CompactNumber
                  value={userReserve.underlyingBalance}
                  maximumFractionDigits={2}
                  minimumFractionDigits={2}
                />{' '}
                {currencySymbol}
              </>
            ) : (
              '-'
            )
          }
        />
      ) : (
        <InfoRowItem
          title={intl.formatMessage(messages.youBorrowed)}
          value={
            user && Number(currentBorrows) > 0 ? (
              <>
                <CompactNumber
                  value={currentBorrows}
                  maximumFractionDigits={2}
                  minimumFractionDigits={2}
                />{' '}
                {currencySymbol}
              </>
            ) : (
              '-'
            )
          }
        />
      )}

      <InfoRowItem
        title={intl.formatMessage(messages.yourWalletBalance)}
        value={
          user && Number(walletBalance) > 0 ? (
            <>
              <CompactNumber
                value={Number(walletBalance)}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />{' '}
              {currencySymbol}
            </>
          ) : (
            '-'
          )
        }
      />

      <style jsx={true}>{`
        .CurrencyUserInfo {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
