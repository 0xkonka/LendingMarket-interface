import { useState, useEffect } from 'react';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useUserMFDStats } from 'libs/aave-protocol-js/hooks/use-user-mfd-stats';
import LockConfirmation from './LockConfirmation';
import LockForm from './LockForm';
import SetDefaultRelockType from './SetDefaultRelockType';

interface ContentItemLockProps {
  isLP: boolean;
  maxAmount: string;
  currencySymbol: string;
  walletBalance: BigNumber;
  lockingAprCalc: number;
  aprLabels?: number[];
  onMainTxConfirmed: () => void;
}

function ContentItemLock({
  isLP,
  maxAmount,
  currencySymbol,
  walletBalance,
  lockingAprCalc,
  aprLabels,
  onMainTxConfirmed,
}: ContentItemLockProps) {
  const {
    prices: { tokenPrice = 0, lpTokenPrice = 0 },
  } = useRdntPrices();
  const { defaultLockIndex } = useUserMFDStats();

  const [amount, setAmount] = useState<BigNumber | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(0);

  const lockPrice = isLP ? lpTokenPrice : tokenPrice;

  useEffect(() => {
    setSelectedDuration(defaultLockIndex);
  }, [defaultLockIndex]);

  return (
    <div className="ManageRadiant__content-lock">
      {!!amount ? (
        <LockConfirmation
          isLP={isLP}
          amount={amount}
          durationIndex={selectedDuration}
          maxAmount={valueToBigNumber(maxAmount)}
          onMainTxConfirmed={onMainTxConfirmed}
          onAfterSuccessClick={() => {
            setAmount(null);
          }}
          goBack={() => setAmount(null)}
        />
      ) : (
        <div className="ManageRadiant__form-controls">
          <LockForm
            lockPrice={lockPrice}
            maxAmount={maxAmount}
            currencySymbol={currencySymbol}
            walletBalance={walletBalance}
            lockingAprCalc={lockingAprCalc}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            onSubmit={(amount) => setAmount(new BigNumber(amount))}
          />
        </div>
      )}

      <SetDefaultRelockType
        aprLabels={aprLabels}
        onMainTxConfirmed={() => {
          setAmount(null);
          onMainTxConfirmed();
        }}
      />

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ManageRadiant__content-lock {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
        `}
      </style>
    </div>
  );
}

export default ContentItemLock;
