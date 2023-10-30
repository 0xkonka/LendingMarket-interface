import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'Borrow Asset',
  description:
    'Please enter the desired borrow amount. The maximum amount you can borrow is displayed below.',
  amountTitle: 'Available to borrow',

  noDataTitle: 'No deposits yet',
  noDataDescription: 'To borrow, you need to first deposit collateral.',
  noLiquidityAvailableTitle: 'No liquidity',
  noLiquidityAvailableDescription: 'There is currently no {symbol} available to borrow.',
  healthFactorTooLowTitle: 'Health factor too low',
  healthFactorTooLowDescription:
    'Increase your health factor to increase borrowing capacity: deposit more collateral or repay a portion of your borrowings.',
  noDataButtonTitle: 'Deposit now',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'Wallet not detected. Please connect a wallet to borrow.',
});
