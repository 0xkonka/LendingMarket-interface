import { defineMessages } from 'react-intl';

export default defineMessages({
  error: `Your wallet balance of {userReserveSymbol} is not enough`,
  warningMessage:
    'Keep in mind that interest continues to accumulate over time. Therefore, there may be a small remaining amount due if your wallet balance is only slightly greater than the current amount pending repayment.',

  caption: 'Repay overview',
  boxDescription: 'Please submit to repay',
  approveDescription: 'Please approve before repaying',

  rowTitle: 'Amount to repay',
  secondRowTitle: 'Remaining to repay',
  secondRowTitleSubTitle: 'You lack sufficient funds to repay the entire amount.',
  currentHealthFactor: 'Current health factor',
  nextHealthFactor: 'Next health factor',
  thirdRowTitle: 'Health factor after repayment',

  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'Wallet not detected. Please connect a wallet to repay.',
});
