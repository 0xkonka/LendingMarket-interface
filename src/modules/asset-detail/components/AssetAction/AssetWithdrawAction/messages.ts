import { defineMessages } from 'react-intl';

export default defineMessages({
  amountTitle: 'Available to withdraw',
  formDescription: 'How much do you want to withdraw?',
  pageTitle: `Withdraw {currencySymbol}`,
  errorYouDoNotHaveEnoughFundsToWithdrawThisAmount:
    "You don't have enough funds to withdraw this amount",
  errorPoolDoNotHaveEnoughFundsToWithdrawThisAmount:
    'These funds have been borrowed and are not available for withdrawal at this time.',
  errorCanNotWithdrawThisAmount:
    "You can't withdraw this amount because it will cause collateral call",
  caption: 'Withdraw overview',
  boxDescription: 'Please submit to withdraw',
  approveDescription: 'Please approve before withdrawal',
  rowTitle: 'Amount',
  currentHealthFactor: 'Current Health Factor',
  nextHealthFactor: 'Next Health Factor',
  healthFactorDangerousText:
    'This action will reduce your Health Factor and could lead to {liquidation} of your collateral. Please be cautious and understand the risks.',
  liquidation: 'liquidation',
});
