import { useState, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { MockLpContract } from 'libs/aave-protocol-js/MockLp/MockLpContract';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import ContainedButton from 'components/basic/ContainedButton';
import messages from './messages';

export function DecreasePrice() {
  const intl = useIntl();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();

  const [isConfirm, setIsConfirm] = useState(false);

  const handleDisableSubmit = useCallback(() => {
    setIsConfirm(true);
  }, [setIsConfirm]);

  const handleGetTransactionsRefreshRewards = useCallback(async () => {
    const mockLpContract = new MockLpContract(
      getProvider(chainId),
      currentMarketData.addresses.stakingToken
    );
    const userId = user?.id || '';

    return await mockLpContract.decreasePrice(userId);
  }, [user]);

  const handleMainTxExecuted = () => {};

  if (!user) {
    return null;
  }

  return (
    <>
      {!isConfirm ? (
        <div className="ManageRadiantContentProtocolManagement__inner">
          <p className="ManageRadiantContentProtocolManagement__description">Decrease Price</p>
          <ContainedButton onClick={handleDisableSubmit} fullWidth>
            {intl.formatMessage(messages.submit)}
          </ContainedButton>
        </div>
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
            goBack={() => setIsConfirm(false)}
          />
        </div>
      )}
    </>
  );
}

export default DecreasePrice;
