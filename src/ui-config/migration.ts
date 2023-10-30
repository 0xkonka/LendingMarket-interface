export interface RadiantV1AddressesProps {
  lendingPoolAddressProvider: string;
  lendingPool: string;
  wethGateway: string;
  rdntToken: string;
  stakingToken: string;
  aaveProtocolDataProvider: string;
  multiFeeDistribution: string;
  chefIncentivesController: string;
  masterChef: string;
  allTokens: string[];
  walletBalanceProvider: string;
  uiPoolDataProvider?: string;
  uiIncentiveDataProvider?: string;
  chainlinkFeedRegistry?: string;
  vesting: string;
  faucet?: string;
  leverager: string;
  stargateRouter: string;
  stargateBorrow: string;
  quicklock: string;
  migration: string;
  radiantV2: string;
}

export const arbitrumMainV1: RadiantV1AddressesProps = {
  stakingToken: '0x24704aFF49645D32655A76Df6d407E02d146dAfC',
  lendingPoolAddressProvider: '0xe21B295ED46528eFD5F3EF66E18BC6ad1c87f003',
  lendingPool: '0x2032b9A8e9F7e76768CA9271003d3e43E1616B1F',
  wethGateway: '0xEBF9746aF2c757A20Db467b007F4Fa6317385E9a',
  rdntToken: '0x0C4681e6C0235179ec3D4F4fc4DF3d14FDD96017',
  walletBalanceProvider: '0xE36D523Ad4feBAa09B9Bc043999252f96375C621',
  uiPoolDataProvider: '0xC8e3beDF35F23037A1067f6ED72625CAF72FA5D8',
  aaveProtocolDataProvider: '0xa3e42d11d8CC148160CC3ACED757FB44696a9CcA',
  multiFeeDistribution: '0xc2054A8C33bfce28De8aF4aF548C48915c455c13',
  chefIncentivesController: '0x287Ff908B4DB0b29B65B8442B0a5840455f0Db32',
  masterChef: '0xc963ef7d977ECb0Ab71d835C4cb1Bf737f28d010',
  vesting: '0x6596D55Cd061Fd14A9eCf988E3F073E69C381608',
  quicklock: '0x75206c2A29B646706C8856dF0E8aCAEa38921BAd',
  migration: '0xD84379CEae14AA33C123Af12424A37803F885889',
  allTokens: [
    '0x4cD44E6fCfA68bf797c65889c74B26b8C2e5d4d3',
    '0x0e16bAE17C61789d8a96Ea6529d788B633C4c8B6',
    '0xEf47CCC71EC8941B67DC679D1a5f78fACfD0ec3C',
    '0x9C3A8644A9cA181b90094be98dC19496F6b38a24',
    '0x805ba50001779CeD4f59CfF63aea527D12B94829',
    '0xf92d501e74bd1e4308E6676C38Ab4d84389d7Bf3',
    '0x5293c6CA56b8941040b8D18f557dFA82cF520216',
    '0x2E9B46867469350E4889c280f74Bfa55Ca44fcd4',
    '0x15b53d277Af860f51c3E6843F8075007026BBb3a',
    '0x4e75D4bc81D9AD1a1abc972a3dd53d581e1CE16b',
    '0x8de8b6865c65f91314695a8eac64c2d006087141',
  ],
  leverager: '0x5682A39078eDcE41a65F1Bd8733bf9Ca2BBE3B1b',
  stargateRouter: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
  stargateBorrow: '0xED60Be096713DE7C98558D4e5206BDB397f1f68f',
  radiantV2: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
};

export const arbitrumGoerliV1: RadiantV1AddressesProps = {
  masterChef: '0xc963ef7d977ECb0Ab71d835C4cb1Bf737f28d010',
  stakingToken: '0x98Da1E3a42998e16F96B8b53fd96693A0b9599d8',
  faucet: '0x0655591f8cC6026e1Cb186fBc2E4016b142aB68c',
  lendingPoolAddressProvider: '0xEc9816EdAC5A25c676bD773b4a5dC31B8162Cae6',
  lendingPool: '0x2032b9A8e9F7e76768CA9271003d3e43E1616B1F',
  wethGateway: '0x8a4CCE2149A515B40511F96a4c3BDf6D654FA996',
  rdntToken: '0x0c4681e6c0235179ec3d4f4fc4df3d14fdd96017',
  walletBalanceProvider: '0x1d72879E98782F1aD11D2e460Ef53B08691da446',
  uiPoolDataProvider: '0x74C6D3d43551F4B07b614Fc959880ae7C86ecC9A',
  aaveProtocolDataProvider: '0xA2fB1cc7FD29FE77Ee4330c96630ceC2c1aDeF53',
  multiFeeDistribution: '0xc2054A8C33bfce28De8aF4aF548C48915c455c13',
  chefIncentivesController: '0xFc4434a36d966F0F60C3B65959aFD4505F577423',
  vesting: '0xF7C3b84E8FB99A2cF56eA9aaa8B9A09c8D0f6c07',
  quicklock: '0x122258919f7ddE9D50Bb3eF26157252ce7B1f64E',
  migration: '0xD84379CEae14AA33C123Af12424A37803F885889',
  allTokens: [
    '0xDEc7982425a1e78Eb7205dDD65b346Bf03EbF185',
    '0xC9A6ef2cC22735090356b2C5d501BC7C0af1520a',
    '0x6EFBD25C7a8baA8C62763B162D299AcB1e58449F',
    '0x36E52697497c2E5678CBb94D22e79CE40068a93C',
    '0xb0DE13aB2aBEFcD12090C6BcFfd47530BE061D0B',
    '0xF2611Fd05E9BF17E36f3268D4Ab90999eAF1dB61',
    '0xCF59F86DD16f2B6157096fd214188E0F94c3cFd9',
    '0x8F2b466e20ED6C7f5bDCBCDa483C9Ff5b24997b4',
    '0xAFf831B44b3982f24C972Fc22Eb5EC5Cd3917148',
    '0x9d62a15cBE6D2D2f6F2635b4bE65443A1f044230',
  ],
  leverager: '0x1c077963939c9C4EAeffb20d681B76E1750C31Ee',
  stargateRouter: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
  stargateBorrow: '0xdc7A392b15710Db79Fb29e8A048e011314696442',
  radiantV2: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
};
