import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'Deposit asset',
  description:
    'Please enter the amount you would like to deposit. The maximum amount you can deposit is shown below.',
  amountTitle: 'Available to deposit',

  noDataTitle: 'Your balance is zero',
  noDataDescription: `Your balance of {currencySymbol} is 0.{br}Transfer {currencySymbol} to your wallet to be able to deposit`,
  noDataLPTokenDescription: `You don't have any {currencySymbol} in your wallet. Transfer {currencySymbol} to your wallet in order to deposit. To get {currencySymbol}, you need to provide liquidity to the correct pool.`,
  noDataButtonTitle: `Faucet`,

  viewPool: 'View pool',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription:
    'We couldn’t detect a wallet. Connect a wallet to deposit and see your balance grow.',

  warningText:
    'Before depositing {symbol} please check that the amount you want to deposit is not currently being used for staking. If it is being used for staking, your transaction might fail.',

  wethError: 'Available WETH Borrow Amount Not Enough',
  wethAmt: 'Required WETH: ',
});
