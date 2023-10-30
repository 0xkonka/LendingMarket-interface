import { FormEvent, useCallback, useState, useMemo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import { MigrationContract } from 'libs/aave-protocol-js/Migration/MigrationContract';
import { GeistTokenContract } from 'libs/aave-protocol-js/GeistToken/GeistTokenContract';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import AmountField from 'components/fields/AmountField';
import ConnectButton from 'components/ConnectButton';
import ContainedButton from 'components/basic/ContainedButton';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import messages from './messages';
import staticStyles from './style';
import { TokenIcon } from 'helpers/config/assets-config';
import { getProvider } from 'helpers/config/markets-and-network-config';

interface MigrationFormProps {
  className?: string;
}

const AMOUNT_MIN = '1';

export default function MigrationForm({ className }: MigrationFormProps) {
  const intl = useIntl();
  const { user } = useDynamicPoolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { refetch } = useRdntBalanceContext();

  let blockingError = '';

  const [radiantV1Info, setRadiantV1Info] = useState<{
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  }>({
    walletBalance: valueToBigNumber(0),
    currencySymbol: 'RDNT',
    totalSupply: valueToBigNumber(0),
  });
  const [isConfirm, setIsConfirm] = useState(false);
  const exchangeRate = '1';
  const [formData, setFormData] = useState({
    amount: AMOUNT_MIN,
  });
  const [errors, setErrors] = useState({
    amount: '',
  });

  const inputHandler = useCallback(
    (key: string, maxValue: string, minValue: string) => (value: string) => {
      if (maxValue && parseFloat(value) > parseFloat(maxValue)) {
        value = maxValue;
      }

      if (minValue && parseFloat(value) < parseFloat(minValue)) {
        setErrors((prev) => ({
          ...prev,
          [key]: `This field should be more than ${minValue}`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [key]: '',
        }));
      }

      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFormData, setErrors]
  );

  const handleMaxButtonClick = useCallback(
    (key: string, maxValue: string) => () => {
      setFormData((prev) => ({
        ...prev,
        [key]: maxValue,
      }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (parseFloat(formData.amount) <= 0) {
        setErrors((prev) => ({
          ...prev,
          amount: 'Please input the correct amount',
        }));
        return;
      }

      setIsConfirm(true);
    },
    [errors, formData, setIsConfirm, setErrors]
  );

  const receiveAmount = useMemo(() => {
    return Number(formData.amount) * Number(exchangeRate);
  }, [formData, exchangeRate]);

  useEffect(() => {
    (async () => {
      if (!user) {
        return;
      }

      try {
        const geistTokenContract = new GeistTokenContract(
          getProvider(chainId),
          currentMarketData.addresses?.radiantV1 || ''
        );

        const [radiantV1Info] = await Promise.all([geistTokenContract.getInfo(user.id)]);
        setRadiantV1Info(radiantV1Info);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const handleGetTransactions = useCallback(async () => {
    const migrationContract = new MigrationContract(
      getProvider(chainId),
      currentMarketData.addresses?.migration || ''
    );
    const userId = user?.id || '';

    return await migrationContract.exchange(
      userId,
      currentMarketData.addresses?.radiantV1 || '',
      formData.amount
    );
  }, [user, formData, currentMarketData]);

  const handleMainTxExecuted = () => {
    refetch();
  };

  return (
    <div className={classNames('MigrationForm', className)}>
      <h2 className="MigrationForm__title">{intl.formatMessage(messages.title)}</h2>

      {!isConfirm ? (
        <form onSubmit={handleSubmit} className="MigrationForm__inner">
          <AmountField
            title={intl.formatMessage(messages.amount)}
            maxAmount={radiantV1Info.walletBalance.toString()}
            symbol={'RDNT'}
            maxDecimals={18}
            value={formData.amount}
            onChange={inputHandler('amount', radiantV1Info.walletBalance.toString(), AMOUNT_MIN)}
            onMaxButtonClick={handleMaxButtonClick(
              'amount',
              radiantV1Info.walletBalance.toString()
            )}
            error={errors.amount}
          />

          <Row
            title={
              <TokenIcon
                tokenSymbol={'rdnt'}
                tokenFullName={'You will receive'}
                height={20}
                width={20}
                tooltipId={'RDNT'}
                className="MigrationForm__status-label"
              />
            }
          >
            <Value value={receiveAmount} />
          </Row>

          {!currentAccount ? (
            <ConnectButton />
          ) : (
            <ContainedButton fullWidth type="submit">
              {intl.formatMessage(messages.submit)}
            </ContainedButton>
          )}
        </form>
      ) : (
        <>
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(messages.title)}
            boxTitle={intl.formatMessage(messages.title)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            getTransactionsData={handleGetTransactions}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError={blockingError}
            mainTxFailedMessage="Try again with correct amount."
            goBack={() => setIsConfirm(false)}
          />
        </>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
