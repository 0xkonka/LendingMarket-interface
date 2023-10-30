import { ChainId } from '@radiantcapital/contract-helpers';

import TxConfirmationView, { TxConfirmationViewProps } from 'components/TxConfirmationView';
import { useProtocolDataContext } from 'libs/protocol-data-provider';

type StakeTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txChainId' | 'allowedChainIds'>;

function StakeTxConfirmationView({ onMainTxConfirmed, ...props }: StakeTxConfirmationViewProps) {
  const { chainId } = useProtocolDataContext();

  const handleMainTxConfirmed = () => {
    if (typeof onMainTxConfirmed === 'function') {
      onMainTxConfirmed();
    }
  };

  return (
    <TxConfirmationView
      {...props}
      txChainId={chainId}
      allowedChainIds={[ChainId.mainnet, ChainId.arbitrum_one, ChainId.arbitrum_goerli]}
      onMainTxConfirmed={handleMainTxConfirmed}
    />
  );
}

export default StakeTxConfirmationView;
