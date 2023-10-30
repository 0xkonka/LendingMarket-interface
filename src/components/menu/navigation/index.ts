import LINKS, { LinkProps } from 'ui-config/links';

const navigation: LinkProps[] = [
  LINKS.MARKETS,
  LINKS.DASHBOARD,
  LINKS.MANAGE_RADIANT,
  LINKS.BRIDGE,
  LINKS.BUY_RDNT,
];

export const moreNavigation: LinkProps[] = [
  LINKS.FAUCET,
  LINKS.DOCS,
  LINKS.STATUS,
  LINKS.RISK_DASHBOARD,
  LINKS.MIGRATION,
  LINKS.ADD_RDNT,
  LINKS.ARB_AIRDROP,
];

export const daoNavigation: LinkProps[] = [LINKS.DISCUSSION, LINKS.GOVERNANCE];

export const mobileNavigation: LinkProps[] = [...navigation, ...daoNavigation, ...moreNavigation];

export default navigation;
