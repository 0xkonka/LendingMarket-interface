import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'Deposit asset',
  description:
    'Please enter the amount you would like to deposit. The maximum amount you can deposit is shown below.',
  amountTitle: 'Available to deposit',
  errorWalletBalanceNotEnough: `Insufficient {poolReserveSymbol} balance`,
  caption: 'Deposit overview',
  boxDescription: 'Click to submit and confirm the transaction in your web3 wallet.',
  approveDescription: 'Please approve before depositing',
});
