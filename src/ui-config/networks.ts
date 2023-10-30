import { ChainId } from '@radiantcapital/contract-helpers';

import { BaseNetworkConfig } from 'helpers/config/types';
import avalancheBridgeLogo from 'ui-config/branding/images/avalancheLogo.svg';
import arbitrum_one from 'ui-config/addresses/arbitrum_one.json';
import bsc_testnet from 'ui-config/addresses/bsc_testnet.json';
import bsc from 'ui-config/addresses/bsc.json';
import mainnet from 'ui-config/addresses/mainnet.json';
import goerli from 'ui-config/addresses/goerli.json';
import local from 'ui-config/addresses/local.json';

const subgraphApikey = import.meta.env.VITE_SUBGRAPH_API_KEY;

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.arbitrum_one]: {
    name: 'Arbitrum',
    publicJsonRPCUrl: ['https://rpc.radiant.capital/70ff72eec58b50f824282a0c28f3434d585c9410/'],
    publicJsonRPCWSUrl: 'wss://rinkeby.arbitrum.io/rpc',
    rpcUrl: [
      // 'https://arb1.arbitrum.io/rpc',
      'https://rpc.radiant.capital/70ff72eec58b50f824282a0c28f3434d585c9410/',
    ],
    addresses: arbitrum_one,
    protocolDataUrl: `https://gateway-arbitrum.network.thegraph.com/api/${subgraphApikey}/subgraphs/id/E1UTUGaNbTb4XbEYoupJZ5hU62hW9CnadKTXLRSP2hM`,
    baseUniswapAdapter: '0x0',
    baseAsset: 'ETH',
    baseAssetWrappedAddress: arbitrum_one.baseAssetWrappedAddress,
    baseAssetWrappedSymbol: 'WETH',
    rewardTokenSymbol: 'RDNT',
    rewardTokenAddress: '',
    rewardTokenDecimals: 0,
    incentivePrecision: 0,
    explorerLink: 'https://arbiscan.io/',
    dexName: 'SushiSwap',
    addLiquidityUrl: `https://app.sushi.com/legacy/add/${arbitrum_one.baseAssetWrappedAddress}/${arbitrum_one.rdntToken}/?chainId=${ChainId.arbitrum_one}`,
    buyRdntUrl: `https://app.balancer.fi/#/arbitrum/swap/eth/${arbitrum_one.rdntToken}`,
    rpcOnly: true,
    usdMarket: true,
    isTestnet: false,
    isLocalTestnet: false,
    bufferPercent: 5,
    bridge: {
      brandColor: '232, 65, 66',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io',
      logo: avalancheBridgeLogo, // TO-DO: Update
    },
  },
  [ChainId.bsc_testnet]: {
    name: 'BSC-T',
    publicJsonRPCUrl: [
      'https://sly-dawn-wave.bsc-testnet.quiknode.pro/9a892ced489f367f306897b8d93005892b3b5057/',
      // 'http://localhost:8545/',
    ],
    publicJsonRPCWSUrl: 'wss://rinkeby.arbitrum.io/rpc',
    rpcUrl: ['https://bsc-testnet.publicnode.com'],
    protocolDataUrl:
      'https://api.thegraph.com/subgraphs/name/radiantcapitaldevelopment/bsc-testnet',
    addresses: bsc_testnet,
    baseUniswapAdapter: '0x0',
    baseAsset: 'BNB',
    baseAssetWrappedAddress: bsc_testnet.baseAssetWrappedAddress,
    baseAssetWrappedSymbol: 'WBNB',
    rewardTokenSymbol: 'RDNT',
    rewardTokenAddress: '',
    rewardTokenDecimals: 0,
    incentivePrecision: 0,
    explorerLink: 'https://testnet.bscscan.com/',
    dexName: 'PancakeSwap',
    addLiquidityUrl: `https://pancakeswap.finance/add/${bsc_testnet.baseAssetWrappedAddress}/${bsc_testnet.rdntToken}?chainId=${ChainId.bsc_testnet}`,
    buyRdntUrl: `https://app.balancer.fi/#/arbitrum/swap/eth/${arbitrum_one.rdntToken}`,
    rpcOnly: true,
    usdMarket: true,
    isTestnet: true,
    isLocalTestnet: false,
    bufferPercent: 2,
    bridge: {
      brandColor: '232, 65, 66',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io',
      logo: avalancheBridgeLogo, // TO-DO: Update
    },
  },
  [ChainId.bsc]: {
    name: 'BNB Chain',
    publicJsonRPCUrl: ['https://rpc-bsc.radiant.capital/e2af014b7281333ef80331dd368694e6b2e5c738/'],
    publicJsonRPCWSUrl: 'wss://rinkeby.arbitrum.io/rpc',
    rpcUrl: [
      // 'https://bsc-dataseed.binance.org/',
      'https://rpc-bsc.radiant.capital/e2af014b7281333ef80331dd368694e6b2e5c738/',
    ],
    protocolDataUrl:
      'https://api.thegraph.com/subgraphs/name/radiantcapitaldevelopment/radiant-bsc',
    addresses: bsc,
    baseUniswapAdapter: '0x0',
    baseAsset: 'BNB',
    baseAssetWrappedAddress: bsc.baseAssetWrappedAddress,
    baseAssetWrappedSymbol: 'WBNB',
    rewardTokenSymbol: 'RDNT',
    rewardTokenAddress: '',
    rewardTokenDecimals: 0,
    incentivePrecision: 0,
    explorerLink: 'https://bscscan.com/',
    dexName: 'PancakeSwap',
    addLiquidityUrl: `https://pancakeswap.finance/add/${bsc.baseAssetWrappedAddress}/${bsc.rdntToken}?chainId=${ChainId.bsc}`,
    buyRdntUrl: `https://pancakeswap.finance/swap?outputCurrency=${bsc.rdntToken}`,
    rpcOnly: true,
    usdMarket: true,
    isTestnet: false,
    isLocalTestnet: false,
    bufferPercent: 2,
    bridge: {
      brandColor: '232, 65, 66',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io',
      logo: avalancheBridgeLogo, // TO-DO: Update
    },
  },
  [ChainId.mainnet]: {
    name: 'Ethereum',
    publicJsonRPCUrl: ['http://localhost:8545'],
    publicJsonRPCWSUrl: 'wss://rinkeby.arbitrum.io/rpc',
    rpcUrl: ['http://localhost:8545'],
    addresses: mainnet,
    protocolDataUrl:
      'https://api.thegraph.com/subgraphs/name/radiantcapitaldevelopment/radiantcapital',
    baseUniswapAdapter: '0x0',
    baseAsset: 'ETH',
    baseAssetWrappedAddress: goerli.baseAssetWrappedAddress,
    baseAssetWrappedSymbol: 'WETH',
    rewardTokenSymbol: 'RDNT',
    rewardTokenAddress: '',
    rewardTokenDecimals: 0,
    incentivePrecision: 0,
    explorerLink: 'https://goerli.etherscan.io',
    dexName: 'SushiSwap',
    addLiquidityUrl: `https://app.sushi.com/legacy/add/${goerli.baseAssetWrappedAddress}/${goerli.rdntToken}/?chainId=${ChainId.goerli}`,
    buyRdntUrl: `https://app.balancer.fi/#/arbitrum/swap/eth/${arbitrum_one.rdntToken}`,
    rpcOnly: true,
    usdMarket: true,
    isTestnet: true,
    isLocalTestnet: true,
    bufferPercent: 5,
    bridge: {
      brandColor: '232, 65, 66',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io',
      logo: avalancheBridgeLogo, // TO-DO: Update
    },
  },
  [ChainId.goerli]: {
    name: 'Ethereum-T',
    publicJsonRPCUrl: [
      'https://twilight-sly-meadow.ethereum-goerli.quiknode.pro/5cf58344aebfbf493f69419bd04bf9fed5e1fc71/',
    ],
    publicJsonRPCWSUrl: 'wss://rinkeby.arbitrum.io/rpc',
    rpcUrl: ['https://ethereum-goerli.publicnode.com'],
    addresses: goerli,
    protocolDataUrl: '',
    baseUniswapAdapter: '0x0',
    baseAsset: 'ETH',
    baseAssetWrappedAddress: goerli.baseAssetWrappedAddress,
    baseAssetWrappedSymbol: 'WETH',
    rewardTokenSymbol: 'RDNT',
    rewardTokenAddress: '',
    rewardTokenDecimals: 0,
    incentivePrecision: 0,
    explorerLink: 'https://goerli.etherscan.io',
    dexName: 'SushiSwap',
    addLiquidityUrl: `https://app.sushi.com/legacy/add/${goerli.baseAssetWrappedAddress}/${goerli.rdntToken}/?chainId=${ChainId.goerli}`,
    buyRdntUrl: `https://app.balancer.fi/#/arbitrum/swap/eth/${arbitrum_one.rdntToken}`,
    rpcOnly: true,
    usdMarket: true,
    isTestnet: true,
    isLocalTestnet: true,
    bufferPercent: 5,
    bridge: {
      brandColor: '232, 65, 66',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io',
      logo: avalancheBridgeLogo, // TO-DO: Update
    },
  },
  [ChainId.local]: {
    name: 'Local-T',
    publicJsonRPCUrl: ['http://127.0.0.1:8545/'],
    publicJsonRPCWSUrl: 'wss://rinkeby.arbitrum.io/rpc',
    rpcUrl: ['http://127.0.0.1:8545/'],
    addresses: local,
    protocolDataUrl: 'http://localhost:8000/subgraphs/name/radiantcapital/radiantgraph',
    baseUniswapAdapter: '0x0',
    baseAsset: 'ETH',
    baseAssetWrappedAddress: local.baseAssetWrappedAddress,
    baseAssetWrappedSymbol: 'WETH',
    rewardTokenSymbol: 'RDNT',
    rewardTokenAddress: '',
    rewardTokenDecimals: 0,
    incentivePrecision: 0,
    explorerLink: 'https://testnet.arbiscan.io/',
    dexName: 'SushiSwap',
    addLiquidityUrl: `https://app.sushi.com/legacy/add/${local.baseAssetWrappedAddress}/${local.rdntToken}/?chainId=${ChainId.local}`,
    buyRdntUrl: `https://app.balancer.fi/#/arbitrum/swap/eth/${arbitrum_one.rdntToken}`,
    rpcOnly: true,
    usdMarket: true,
    isTestnet: true,
    isLocalTestnet: true,
    bufferPercent: 5,
    bridge: {
      brandColor: '232, 65, 66',
      name: 'Arbitrum Bridge',
      url: 'https://bridge.arbitrum.io',
      logo: avalancheBridgeLogo, // TO-DO: Update
    },
  },
} as const;
