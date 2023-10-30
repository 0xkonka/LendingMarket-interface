import { FormEvent, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { LendingPoolConfiguratorContract } from 'libs/aave-protocol-js/LendingPoolConfigurator/LendingPoolConfiguratorContract';
import { LendingPoolAddressesProviderContract } from 'libs/aave-protocol-js/LendingPoolAddressesProvider/LendingPoolAddressesProviderContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import TextField from 'components/fields/TextField';
import ContainedButton from 'components/basic/ContainedButton';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import messages from './messages';

export function AddFreezeReserve() {
  const intl = useIntl();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();

  const [isConfirm, setIsConfirm] = useState(false);
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState('');

  const inputHandler = useCallback(
    () => (value: string) => {
      setAddress(value);
    },
    [setAddress]
  );

  const handleSubmit = useCallback(
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

  const handleGetTransactionsRefreshRewards = useCallback(async () => {
    const userId = user?.id || '';
    const lendingPoolAddressProvider = new LendingPoolAddressesProviderContract(
      getProvider(chainId),
      currentMarketData.addresses.lendingPoolAddressProvider
    );
    const lendingPoolConfiguratorAddress =
      await lendingPoolAddressProvider.getLendingPoolConfigurator();

    const lendingPoolConfiguratorService = new LendingPoolConfiguratorContract(
      getProvider(chainId),
      lendingPoolConfiguratorAddress
    );

    return await lendingPoolConfiguratorService.freezeReserve(address, userId);
  }, [address, user]);

  const handleMainTxExecuted = () => {};

  return (
    <>
      {!isConfirm ? (
        <form onSubmit={handleSubmit} className="ManageRadiantContentProtocolManagement__inner">
          <p className="ManageRadiantContentProtocolManagement__description">Add Freeze Reserve</p>

          <TextField value={address} onChange={inputHandler()} error={errors} />

          <ContainedButton fullWidth type="submit">
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
            mainTxFailedMessage="Try again with correct address or Admin wallet."
          />
        </div>
      )}
    </>
  );
}

export default AddFreezeReserve;
