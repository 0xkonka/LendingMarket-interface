import { defineMessages } from 'react-intl';

export default defineMessages({
  errorYouDoNotHaveEnoughFundsToWithdrawThisAmount:
    'The amount you are trying to withdraw exceeds your available balance.',
  errorPoolDoNotHaveEnoughFundsToWithdrawThisAmount:
    'These funds are currently borrowed and cannot be withdrawn at the moment.',
  errorCanNotWithdrawThisAmount:
    'You cannot withdraw this amount as it will result in a collateral call.',
  caption: 'Withdraw overview',
  boxDescription: 'Please submit to withdraw',
  approveDescription: 'Please approve before withdrawal',
  rowTitle: 'Amount',
  currentHealthFactor: 'Current health factor',
  nextHealthFactor: 'Next health factor',
  connectWallet: 'Please connect a wallet',
  connectWalletDescription: 'Wallet not detected. Please connect a wallet to withdraw.',
  healthFactorDangerousText:
    'Caution: This action will reduce your health factor and may result in {liquidation} of your collateral. Please carefully consider the risks involved.',
  liquidation: 'liquidation',
});
