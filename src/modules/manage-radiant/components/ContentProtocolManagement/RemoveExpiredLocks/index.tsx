import { FormEvent, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import TextField from 'components/fields/TextField';
import ContainedButton from 'components/basic/ContainedButton';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import messages from './messages';

export function RemoveExpiredLocks() {
  const intl = useIntl();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();

  const [isConfirm, setIsConfirm] = useState(false);
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState('');

  const inputCleanHandler = useCallback(
    () => (value: string) => {
      setAddress(value);
    },
    [setAddress]
  );

  const handleCleanSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (address === '') {
        setErrors('Please input the correct address');
        return;
      }

      setIsConfirm(true);
    },
    [errors, address, setIsConfirm, setErrors]
  );

  const handleGetTransactionsClean = useCallback(async () => {
    const multiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );
    const userId = user?.id || '';
    const addresses = address.split(',');
    return await multiFeeDistributionService.cleanExpiredLocksAndEarnings(addresses, userId);
  }, [user, address]);

  const handleGetLPTransactionsClean = useCallback(async () => {
    const lpMultiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.stakingToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const userId = user?.id || '';
    const addresses = address.split(',');
    return await lpMultiFeeDistributionService.cleanExpiredLocksAndEarnings(addresses, userId);
  }, [user, address]);

  const handleMainTxExecuted = () => {};

  if (!user) {
    return null;
  }

  return (
    <>
      {!isConfirm ? (
        <form
          onSubmit={handleCleanSubmit}
          className="ManageRadiantContentProtocolManagement__inner"
        >
          <p className="ManageRadiantContentProtocolManagement__description">
            Remove Expired Locks for User
          </p>
          <TextField value={address} onChange={inputCleanHandler()} error={errors} />

          <p className="ManageRadiantContentProtocolManagement__description">
            Please enter comma separated addresses
          </p>

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
            getTransactionsData={handleGetTransactionsClean}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError={''}
            mainTxFailedMessage="Try again with correct input value."
            goBack={() => setIsConfirm(false)}
          />
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(messages.lpSubmit)}
            boxTitle={intl.formatMessage(messages.lpSubmit)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            getTransactionsData={handleGetLPTransactionsClean}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError={''}
            mainTxFailedMessage="Try again with correct input value."
            goBack={() => setIsConfirm(false)}
          />
        </div>
      )}
    </>
  );
}

export default RemoveExpiredLocks;
