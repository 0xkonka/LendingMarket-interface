import { defineMessages } from 'react-intl';

export default defineMessages({
  congratulations: 'Success!',
  transactionDetails:
    'Please review your transaction details to ensure their accuracy before submitting.',
  successfullyExecuted: 'Your action has been successfully executed',
  nextSteps: 'Next steps',
  approve: 'Approve',
  approveDelegation: 'Approve delegation',
  approveDelegationVdWeth: 'Approve {wrapped_token} delegation',
  goBack: 'Return',

  checkboxText: 'Don’t ask me to approve again',
  goToDashboard: 'Return to dashboard',
  submit: 'Submit',

  errorTitle: 'Error occured',
  errorDescription:
    'We are currently unable to complete your transaction at this time. Please try again later.',
  txFailReason: 'Transaction failed. {reason}',
});
