import { defineMessages } from 'react-intl';

export default defineMessages({
  statsOverview: 'Stats overview',
  assetBreakdown: 'Asset breakdown',
  zap: 'ZAP',
  buy: 'BUY',
  lock: 'LOCK',
  startEarning: 'START EARNING',
  totalMarketSize: 'Total market size',
  totalMarketSizeDescription:
    'Combined dollar value of all non-native assets within the Radiant ecosystem (BTC/ETH/USDC/DAI/USDT).',
  lockedLp: 'Dynamic LP Value',
  lockedLpDescription: 'Total Dynamic LP Value',
  rdntPrice: 'RDNT price',
  rdntPriceDescription: 'The price of RDNT directly affects the APR for Locking and Pool2.',
  lockApr: 'Maximum lock APR',
  lockAprDescription:
    'Calculated from protocol fees generated from borrowing interest and liquidations, which are distributed to dLP lockers. Locking APR differs chain by chain.',
  platformFeePaid: 'Fees paid to lockers',
  platformFeePaidDescription:
    'Borrowing interest, liquidations & flash loan fees are distributed to Dynamic Liquidity Providers',
  otherChains: 'Other chains',
});
