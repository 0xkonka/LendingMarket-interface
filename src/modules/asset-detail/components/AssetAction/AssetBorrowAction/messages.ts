import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'Borrow Asset',
  description:
    'Please enter the desired borrow amount. The maximum amount you can borrow is displayed below.',
  amountTitle: 'Available to borrow',
  errorWalletBalanceNotEnough: `Insufficient {poolReserveSymbol} balance`,
  caption: 'Borrow overview',
  boxDescription: 'Click to submit and confirm the transaction in your web3 wallet.',
  approveDescription: 'Please approve before borrowing',
});
