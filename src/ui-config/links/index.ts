import { MessageDescriptor } from 'react-intl';

import { MarketDataType } from 'helpers/config/types';
import { isFeatureEnabled } from 'helpers/config/markets-and-network-config';
import { addRDNTTokenToWallet } from 'helpers/add-rdnt';
import messages from './messages';

export interface LinkProps {
  link: string;
  title: MessageDescriptor;
  hiddenWithoutWallet?: boolean;
  external?: boolean;
  onClick?: () => void;
  isVisible?: (data: MarketDataType) => boolean | undefined;
  isBuyRDNT?: boolean;
}

export interface LinksProps {
  [page: string]: LinkProps;
}

const LINKS = {
  MARKETS: {
    link: '/markets',
    title: messages.markets,
  },
  DASHBOARD: {
    link: '/dashboard',
    title: messages.dashboard,
  },
  DEPOSIT: {
    link: '/deposit',
    title: messages.deposit,
  },
  BORROW: {
    link: '/borrow',
    title: messages.borrow,
  },
  MANAGE_RADIANT: {
    link: '/manage-radiant',
    title: messages.manageRadiant,
  },
  BRIDGE: {
    link: '/bridge',
    title: messages.bridge,
  },
  MIGRATION: {
    link: '/migration',
    title: messages.migration,
    isVisible: isFeatureEnabled.migration,
  },
  ARB_AIRDROP: {
    link: '/arb-airdrop',
    title: messages.arbAirdrop,
  },
  LOOP: {
    link: '/loop',
    title: messages.loop,
  },
  FAUCET: {
    link: '/faucet',
    title: messages.faucet,
    isVisible: isFeatureEnabled.faucet,
  },
  ADD_RDNT: {
    link: '',
    title: messages.addRdnt,
    onClick: addRDNTTokenToWallet,
  },
  RISK_DASHBOARD: {
    link: 'https://community.chaoslabs.xyz/radiant/risk/overview',
    title: messages.riskDashboard,
    external: true,
  },
  BUY_RDNT: {
    link: 'buy-rdnt',
    title: messages.buyRdnt,
    external: true,
    isBuyRDNT: true,
  },
  FAQ: {
    link: 'https://community.radiant.capital',
    title: messages.faq,
    external: true,
  },
  DISCUSSION: {
    link: 'https://community.radiant.capital',
    title: messages.discussion,
    external: true,
  },
  VOTING: {
    link: 'https://dao.radiant.capital',
    title: messages.voting,
    external: true,
  },
  GOVERNANCE: {
    link: 'https://dao.radiant.capital',
    title: messages.governance,
    external: true,
  },
  DOCS: {
    link: 'http://docs.radiant.capital',
    title: messages.docs,
    external: true,
  },
  SECURITY: {
    link: 'http://docs.radiant.capital',
    title: messages.security,
    external: true,
  },
  STATUS: {
    link: 'https://status.radiant.capital/',
    title: messages.status,
    external: true,
  },
  DISCORD: {
    link: 'https://discord.gg/radiantcapital',
    title: messages.discord,
    external: true,
  },
  TWITTER: {
    link: 'https://twitter.com/RDNTCapital',
    title: messages.twitter,
    external: true,
  },
  TELEGRAM: {
    link: 'https://t.me/radiantcapitalofficial',
    title: messages.telegram,
    external: true,
  },
  YOUTUBE: {
    link: 'https://www.youtube.com/c/RadiantCapital',
    title: messages.youtube,
    external: true,
  },
} satisfies LinksProps;

export default LINKS;
