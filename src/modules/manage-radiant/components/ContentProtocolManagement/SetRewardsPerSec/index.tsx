import { FormEvent, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { ChefIncentivesService } from 'libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import AmountField from 'components/fields/AmountField';
import ContainedButton from 'components/basic/ContainedButton';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import messages from './messages';

export function SetRewardsPerSec() {
  const intl = useIntl();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();

  const [isDisableConfirm, setIsDisableConfirm] = useState(false);
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState('');

  const inputHandler = useCallback(
    () => (value: string) => {
      setAmount(value);
    },
    [setAmount]
  );

  const handleDisableSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (amount === '') {
        setErrors('Please input the correct amount');
        return;
      }

      setIsDisableConfirm(true);
    },
    [errors, amount, setIsDisableConfirm, setErrors]
  );

  const handleGetTransactionsRefreshRewards = useCallback(async () => {
    const chefIncentivesService = new ChefIncentivesService(
      getProvider(chainId),
      currentMarketData.addresses.chefIncentivesController
    );

    const userId = user?.id || '';
    return await chefIncentivesService.setRewardsPerSec(amount, userId);
  }, [user, amount]);

  const handleMainTxExecuted = () => {};

  if (!user) {
    return null;
  }

  return (
    <>
      {!isDisableConfirm ? (
        <form
          onSubmit={handleDisableSubmit}
          className="ManageRadiantContentProtocolManagement__inner"
        >
          <p className="ManageRadiantContentProtocolManagement__description">Set Rewards</p>

          <AmountField
            symbol={''}
            maxDecimals={18}
            value={amount}
            onChange={inputHandler()}
            error={errors}
          />
          <ContainedButton type="submit" fullWidth>
            {intl.formatMessage(messages.submit)}
          </ContainedButton>
        </form>
      ) : (
        <div className="ManageRadiantContentProtocolManagement__inner">
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(messages.submit)}
            boxTitle={intl.formatMessage(messages.submit)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            getTransactionsData={handleGetTransactionsRefreshRewards}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError={''}
            mainTxFailedMessage="Try again with Admin wallet."
            goBack={() => setIsDisableConfirm(false)}
          />
        </div>
      )}
    </>
  );
}

export default SetRewardsPerSec;
