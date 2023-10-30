import { ChangeEvent, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber } from '@aave/protocol-js';

import { useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MultiFeeDistributionService } from 'libs/aave-protocol-js/MultiFeeDistribution/MultiFeeDistributionContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import Row from 'components/basic/Row';
import Value from 'components/basic/Value';
import StakeTxConfirmationView from 'components/StakeTxConfirmationView';
import stakeMessages from 'components/StakeTxConfirmationView/messages';
import defaultMessages from 'defaultMessages';
import messages from './messages';

interface LockConfirmationProps {
  isLP: boolean;
  amount: BigNumber;
  maxAmount: BigNumber;
  durationIndex?: number;
  onMainTxConfirmed?: () => void;
  onAfterSuccessClick?: (e: ChangeEvent) => void;
  goBack?: () => void;
}

function LockConfirmation({
  isLP,
  amount,
  maxAmount,
  durationIndex = 0,
  onMainTxConfirmed = () => {},
  onAfterSuccessClick = () => {},
  goBack = () => {},
}: LockConfirmationProps) {
  const intl = useIntl();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();
  const selectedStake = isLP ? 'dLP' : 'RDNT';

  const handleGetTransactions = useCallback(() => {
    if (!userId) throw new Error('Missing userId');
    const multiFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    const lpFeeDistributionService = new MultiFeeDistributionService(
      getProvider(chainId),
      currentMarketData.addresses.stakingToken,
      currentMarketData.addresses.multiFeeDistribution
    );

    if (isLP) {
      return lpFeeDistributionService.stake(userId, amount.toString(), durationIndex);
    }

    return multiFeeDistributionService.stake(userId, amount.toString(), durationIndex);
  }, [
    chainId,
    currentMarketData.addresses.rdntToken,
    currentMarketData.addresses.multiFeeDistribution,
    currentMarketData.addresses.stakingToken,
    isLP,
    userId,
    amount,
    durationIndex,
  ]);

  const blockingError = useMemo(() => {
    if (amount.gt(maxAmount)) {
      return intl.formatMessage(stakeMessages.notEnoughBalance, {
        asset: selectedStake.toUpperCase(),
      });
    }
    return undefined;
  }, [amount, intl, maxAmount, selectedStake]);

  if (!amount || !userId) {
    return null;
  }

  return (
    <StakeTxConfirmationView
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(defaultMessages.lock, { asset: selectedStake.toUpperCase() })}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(defaultMessages.lock, { asset: selectedStake.toUpperCase() })}
      mainTxType="LOCK_ACTION"
      blockingError={blockingError}
      goToAfterSuccess={''}
      onMainTxConfirmed={onMainTxConfirmed}
      onAfterSuccessClick={onAfterSuccessClick}
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
      buttonTitle={intl.formatMessage(messages.buttonTitle)}
      goBack={goBack}
    >
      <Row title={intl.formatMessage(messages.amount)}>
        <Value
          symbol={selectedStake.toUpperCase()}
          value={amount.toString()}
          tokenIcon={true}
          tooltipId={selectedStake.toUpperCase()}
        />
      </Row>
    </StakeTxConfirmationView>
  );
}

export default LockConfirmation;
