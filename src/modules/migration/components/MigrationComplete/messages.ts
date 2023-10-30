import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  mainPageStepLabel: 'Introducing dLP',
  mainPageTitle: 'Unlock the full potential of Radiant v2',
  mainPageDescription:
    'We’re introducing a new DeFi primitive called Dynamic Liquidity Provisioning (dLP).',
  mainPagePrimaryButton: 'Zap into dLP ⚡️',
  mainPageSecondaryButton: 'Migrate v1 RDNT from wallet',

  explainerTitle1: 'What’s dLP?',
  explainerDescription1:
    'It’s a Balancer-generated liquidity pool token composed of 80% RDNT and 20% ETH.',
  explainerTitle2: 'Why dLP?',
  explainerDescription2:
    'dLP is a unique approach to liquidity provisioning that’s designed to reduce impermanent loss and slippage for RDNT buyers and sellers.',
  explainerTitle3: 'Earn protocol fees',
  explainerDescription3:
    'Provide liquidity by locking dLP and earn protocol fees from deposits, borrows, and liquidations. Lock dLP for longer to earn a higher APR multiplier.',

  superchargeTitle: 'Supercharge your APR with RDNT emissions',
  superchargeDescription1A:
    'When your total dLP locked is equivalent to 5% of your deposited collateral assets, you become eligible for RDNT emissions.',
  superchargeDescription1B:
    'For example: lock a minimum of {dlpMinimum} in dLP and you could earn up to',
  superchargeDescription1D: 'on your total {userTotalDeposits} in deposits.',
  superchargeNote1A: 'Note:',
  superchargeNote1B:
    'you risk losing eligibility if the value of your dLP falls below the 5% minimum.',

  dlpCardLabel1: 'Total deposit value',
  dlpCardLabel2: 'dLP required to meet eligibility',

  creatingDlpTitle: 'Creating dLP',
  creatingDlpDescription:
    'It’s easy to make dLP. Just enter any amount of RDNT and ETH from your wallet and Radiant will automatically balance the assets to meet the required 80/20 ratio.',
  creatingDlpStepTitle1: 'Step 1',
  creatingDlpStepDescription1: 'Enter how much v1 RDNT you’d like to deposit.',
  creatingDlpStepInputLabel1: 'v1 RDNT balance:',
  creatingDlpNote1A: 'Note:',
  creatingDlpNote1B: 'this is the only place where it’s possible to deposit v1 RDNT into dLP.',
  creatingDlpStepTitle2: 'Step 2',
  creatingDlpStepDescription2: 'Enter how much ETH you’d like to deposit.',
  creatingDlpStepInputLabel2: 'ETH balance:',
  creatingDlpStepTitle3: 'Want more ETH?',
  creatingDlpStepDescription3: 'Borrow ETH against your collateral assets to maximize the dLP.',
  creatingDlpStepButtonLabel: 'Borrow ETH against your collateral',
  creatingDlpStepInputLabel3: 'Available ETH to borrow:',
  creatingDlpStepTitle4: 'Step 3',
  creatingDlpStepDescription4: 'Choose your lock duration:',
  creatingDlpDurationPeriodPlural: 'months',
  creatingDlpDurationPeriodSingular: 'month',
});
