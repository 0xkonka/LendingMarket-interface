import { defineMessages } from 'react-intl';

export default defineMessages({
  amountTitle: 'Outstanding balance',
  formDescription: 'How much do you want to repay?',
  error: `Your wallet balance of {userReserveSymbol} is not enough`,
  warningMessage:
    'Keep in mind that interest continues to accumulate over time. Therefore, there may be a small remaining amount due if your wallet balance is only slightly greater than the current amount pending repayment.',
  caption: 'Repay overview',
  boxDescription: 'Please submit to repay',
  approveDescription: 'Please approve before repaying',
});
