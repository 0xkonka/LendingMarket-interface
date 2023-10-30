import { FormEvent, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { ChefIncentivesService } from 'libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import TextField from 'components/fields/TextField';
import ContainedButton from 'components/basic/ContainedButton';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import messages from './messages';

export function DisableEmissions() {
  const intl = useIntl();
  const { chainId, currentMarketData } = useProtocolDataContext();

  const [isDisableConfirm, setIsDisableConfirm] = useState(false);
  const [disableAddress, setDisableAddress] = useState('');
  const [disableErrors, setDisableErrors] = useState('');

  const inputDisableHandler = useCallback(
    () => (value: string) => {
      setDisableAddress(value);
    },
    [setDisableAddress]
  );

  const handleDisableSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (disableAddress === '') {
        setDisableErrors('Please input the correct address');
        return;
      }

      setIsDisableConfirm(true);
    },
    [disableErrors, disableAddress, setIsDisableConfirm, setDisableErrors]
  );

  const handleGetTransactionsRefreshRewards = useCallback(async () => {
    const chefIncentivesService = new ChefIncentivesService(
      getProvider(chainId),
      currentMarketData.addresses.chefIncentivesController
    );

    return await chefIncentivesService.beforeLockUpdate(disableAddress);
  }, [disableAddress]);

  const handleMainTxExecuted = () => {};

  return (
    <>
      {!isDisableConfirm ? (
        <form
          onSubmit={handleDisableSubmit}
          className="ManageRadiantContentProtocolManagement__inner"
        >
          <p className="ManageRadiantContentProtocolManagement__description">
            Disable Emissions for Underlocked User
          </p>

          <TextField
            value={disableAddress}
            onChange={inputDisableHandler()}
            error={disableErrors}
          />

          <ContainedButton type="submit" fullWidth>
            {intl.formatMessage(messages.disableSubmit)}
          </ContainedButton>
        </form>
      ) : (
        <div className="ManageRadiantContentProtocolManagement__inner">
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(messages.disableSubmit)}
            boxTitle={intl.formatMessage(messages.disableSubmit)}
            boxDescription={intl.formatMessage(messages.boxDisableDescription)}
            getTransactionsData={handleGetTransactionsRefreshRewards}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError={''}
            mainTxFailedMessage="Try again with correct input value."
            goBack={() => setIsDisableConfirm(false)}
          />
        </div>
      )}
    </>
  );
}

export default DisableEmissions;
