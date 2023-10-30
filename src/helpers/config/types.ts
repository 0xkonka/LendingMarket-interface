import { ChainId } from '@radiantcapital/contract-helpers';

export type ExplorerLinkBuilderProps = {
  tx?: string;
  address?: string;
};

export type ExplorerLinkBuilderConfig = {
  baseUrl: string;
  addressPrefix?: string;
  txPrefix?: string;
};

export type AddressList = {
  lendingPoolAddressProvider: string;
  lendingPool: string;
  wethGateway: string;
  rdntToken: string;
  radiantV1?: string;
  wrappedBaseDebtToken: string;
  stakingToken: string;
  aaveProtocolDataProvider: string;
  middleFeeDistribution: string;
  multiFeeDistribution: string;
  chefIncentivesController: string;
  priceProvider: string;
  lpLockerList: string;
  bountyManager: string;
  compounder: string;
  daoTreasury?: string;
  allTokens: AllTokens;
  arbAirdrop?: string;

  // NEED TO CHECK/ADD
  walletBalanceProvider: string;
  uiPoolDataProvider?: string;
  uiIncentiveDataProvider?: string;
  chainlinkFeedRegistry?: string;
  faucet?: string;
  lockZap: string;
  migration?: string;
  multicall3?: string;
  leverager: string;
  stargateBorrow: string;
  eligibilityDataProvider?: string;
  REPAY_WITH_COLLATERAL_ADAPTER?: string;
  PERMISSION_MANAGER?: string;
  SWAP_COLLATERAL_ADAPTER?: string;
  baseAssetWrappedAddress: string;
};

export type AllTokens = Record<string, string>;

export type NetworkConfig = {
  name: string;
  privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
  privateJsonRPCWSUrl?: string;
  publicJsonRPCUrl: readonly string[]; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
  publicJsonRPCWSUrl?: string;
  rpcUrl: readonly string[];
  addresses: AddressList;
  protocolDataUrl: string;
  cachingServerUrl?: string;
  cachingWSServerUrl?: string;
  baseUniswapAdapter?: string;
  baseAsset: string;
  baseAssetWrappedAddress?: string;
  baseAssetWrappedSymbol: string;
  rewardTokenSymbol: string;
  rewardTokenAddress: string;
  rewardTokenDecimals: number;
  incentivePrecision: number;
  usdMarket?: boolean;
  explorerLink: string;
  dexName?: string;
  addLiquidityUrl?: string;
  buyRdntUrl?: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  rpcOnly: boolean;
  isTestnet?: boolean;
  isLocalTestnet?: boolean;
  isFork?: boolean;
  bufferPercent: number;
  underlyingChainId?: number;
  bridge?: {
    brandColor: string;
    name: string;
    url: string;
    logo: string;
  };
};

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>;

export type MarketDataType = {
  chainId: ChainId;
  logo: string;
  activeLogo?: string;
  subLogo?: string;
  chainSymbol?: string;
  aTokenPrefix: string;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    migration?: boolean;
    arbAirdrop?: boolean;
  };
  addresses: AddressList;
};
