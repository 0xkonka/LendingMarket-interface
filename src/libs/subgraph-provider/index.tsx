import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  /**
   * 8 bytes signed integer
   *
   */
  Int8: any;
};

export enum Action {
  Disqualified = 'Disqualified',
  Locked = 'Locked',
  NewTransferAdded = 'NewTransferAdded',
  Relocked = 'Relocked',
  Withdrawn = 'Withdrawn',
}

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID'];
  newTransferAdded: Array<NewTransferAdded>;
};

export type AssetNewTransferAddedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTransferAdded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NewTransferAdded_Filter>;
};

export type AssetTotalTransferred = {
  __typename?: 'AssetTotalTransferred';
  id: Scalars['ID'];
  symbol: Scalars['String'];
  totalTransferred: Scalars['BigInt'];
};

export type AssetTotalTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AssetTotalTransferred_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<AssetTotalTransferred_Filter>>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalTransferred?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransferred_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_not?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AssetTotalTransferred_OrderBy {
  Id = 'id',
  Symbol = 'symbol',
  TotalTransferred = 'totalTransferred',
}

export type AssetTransaction = {
  action: Action;
  asset: Asset;
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  txHash: Scalars['Bytes'];
};

export type AssetTransaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Action>;
  action_in?: InputMaybe<Array<Action>>;
  action_not?: InputMaybe<Action>;
  action_not_in?: InputMaybe<Array<Action>>;
  and?: InputMaybe<Array<InputMaybe<AssetTransaction_Filter>>>;
  asset?: InputMaybe<Scalars['String']>;
  asset_?: InputMaybe<Asset_Filter>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<AssetTransaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum AssetTransaction_OrderBy {
  Action = 'action',
  Asset = 'asset',
  AssetId = 'asset__id',
  Id = 'id',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
}

export type Asset_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Asset_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  newTransferAdded_?: InputMaybe<NewTransferAdded_Filter>;
  or?: InputMaybe<Array<InputMaybe<Asset_Filter>>>;
};

export enum Asset_OrderBy {
  Id = 'id',
  NewTransferAdded = 'newTransferAdded',
}

export enum AuthStatus {
  /** init */
  Init = 'init',
  /** loggedIn */
  LoggedIn = 'loggedIn',
  /** loggedOut */
  LoggedOut = 'loggedOut',
}

export type BalTransferred = {
  __typename?: 'BalTransferred';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type BalTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<BalTransferred_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<BalTransferred_Filter>>>;
};

export enum BalTransferred_OrderBy {
  Amount = 'amount',
  Id = 'id',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Disqualified = UserTransaction & {
  __typename?: 'Disqualified';
  action: Action;
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  txHash: Scalars['Bytes'];
  user: User;
};

export type Disqualified_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Action>;
  action_in?: InputMaybe<Array<Action>>;
  action_not?: InputMaybe<Action>;
  action_not_in?: InputMaybe<Array<Action>>;
  and?: InputMaybe<Array<InputMaybe<Disqualified_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Disqualified_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Disqualified_OrderBy {
  Action = 'action',
  Id = 'id',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  User = 'user',
  UserId = 'user__id',
}

export type Locked = UserTransaction & {
  __typename?: 'Locked';
  action: Action;
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  isLP: Scalars['Boolean'];
  lockedBalance: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  txHash: Scalars['Bytes'];
  user: User;
};

export type LockedSupply = {
  __typename?: 'LockedSupply';
  address?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lockedSupply: Scalars['BigInt'];
};

export type LockedSupply_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  and?: InputMaybe<Array<InputMaybe<LockedSupply_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lockedSupply?: InputMaybe<Scalars['BigInt']>;
  lockedSupply_gt?: InputMaybe<Scalars['BigInt']>;
  lockedSupply_gte?: InputMaybe<Scalars['BigInt']>;
  lockedSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockedSupply_lt?: InputMaybe<Scalars['BigInt']>;
  lockedSupply_lte?: InputMaybe<Scalars['BigInt']>;
  lockedSupply_not?: InputMaybe<Scalars['BigInt']>;
  lockedSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<LockedSupply_Filter>>>;
};

export enum LockedSupply_OrderBy {
  Address = 'address',
  Id = 'id',
  LockedSupply = 'lockedSupply',
}

export type Locked_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Action>;
  action_in?: InputMaybe<Array<Action>>;
  action_not?: InputMaybe<Action>;
  action_not_in?: InputMaybe<Array<Action>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Locked_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isLP?: InputMaybe<Scalars['Boolean']>;
  isLP_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLP_not?: InputMaybe<Scalars['Boolean']>;
  isLP_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  lockedBalance?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_gt?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_gte?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockedBalance_lt?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_lte?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_not?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Locked_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Locked_OrderBy {
  Action = 'action',
  Amount = 'amount',
  Id = 'id',
  IsLp = 'isLP',
  LockedBalance = 'lockedBalance',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  User = 'user',
  UserId = 'user__id',
}

export type LpLocker = {
  __typename?: 'LpLocker';
  id: Scalars['ID'];
  lockedBalance: Scalars['BigInt'];
};

export type LpLocker_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LpLocker_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lockedBalance?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_gt?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_gte?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockedBalance_lt?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_lte?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_not?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<LpLocker_Filter>>>;
};

export enum LpLocker_OrderBy {
  Id = 'id',
  LockedBalance = 'lockedBalance',
}

export type LpTokenPrice = {
  __typename?: 'LpTokenPrice';
  blockNumber: Scalars['BigInt'];
  id: Scalars['ID'];
  price: Scalars['BigInt'];
};

export type LpTokenPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LpTokenPrice_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<LpTokenPrice_Filter>>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum LpTokenPrice_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Price = 'price',
}

export type NewBalTransfer = {
  __typename?: 'NewBalTransfer';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  total: Scalars['BigInt'];
};

export type NewBalTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<NewBalTransfer_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<NewBalTransfer_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  total?: InputMaybe<Scalars['BigInt']>;
  total_gt?: InputMaybe<Scalars['BigInt']>;
  total_gte?: InputMaybe<Scalars['BigInt']>;
  total_in?: InputMaybe<Array<Scalars['BigInt']>>;
  total_lt?: InputMaybe<Scalars['BigInt']>;
  total_lte?: InputMaybe<Scalars['BigInt']>;
  total_not?: InputMaybe<Scalars['BigInt']>;
  total_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum NewBalTransfer_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Timestamp = 'timestamp',
  Total = 'total',
}

export type NewTransferAdded = AssetTransaction & {
  __typename?: 'NewTransferAdded';
  action: Action;
  asset: Asset;
  assetTotals?: Maybe<Array<AssetTotalTransferred>>;
  id: Scalars['ID'];
  lpUsdValue: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  totalTransferred: Scalars['BigInt'];
  txHash: Scalars['Bytes'];
};

export type NewTransferAddedAssetTotalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetTotalTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetTotalTransferred_Filter>;
};

export type NewTransferAdded_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Action>;
  action_in?: InputMaybe<Array<Action>>;
  action_not?: InputMaybe<Action>;
  action_not_in?: InputMaybe<Array<Action>>;
  and?: InputMaybe<Array<InputMaybe<NewTransferAdded_Filter>>>;
  asset?: InputMaybe<Scalars['String']>;
  assetTotals?: InputMaybe<Array<Scalars['String']>>;
  assetTotals_?: InputMaybe<AssetTotalTransferred_Filter>;
  assetTotals_contains?: InputMaybe<Array<Scalars['String']>>;
  assetTotals_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  assetTotals_not?: InputMaybe<Array<Scalars['String']>>;
  assetTotals_not_contains?: InputMaybe<Array<Scalars['String']>>;
  assetTotals_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  asset_?: InputMaybe<Asset_Filter>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lpUsdValue?: InputMaybe<Scalars['BigInt']>;
  lpUsdValue_gt?: InputMaybe<Scalars['BigInt']>;
  lpUsdValue_gte?: InputMaybe<Scalars['BigInt']>;
  lpUsdValue_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpUsdValue_lt?: InputMaybe<Scalars['BigInt']>;
  lpUsdValue_lte?: InputMaybe<Scalars['BigInt']>;
  lpUsdValue_not?: InputMaybe<Scalars['BigInt']>;
  lpUsdValue_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<NewTransferAdded_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalTransferred?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransferred_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_not?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum NewTransferAdded_OrderBy {
  Action = 'action',
  Asset = 'asset',
  AssetTotals = 'assetTotals',
  AssetId = 'asset__id',
  Id = 'id',
  LpUsdValue = 'lpUsdValue',
  Timestamp = 'timestamp',
  TotalTransferred = 'totalTransferred',
  TxHash = 'txHash',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  asset?: Maybe<Asset>;
  assetTotalTransferred?: Maybe<AssetTotalTransferred>;
  assetTotalTransferreds: Array<AssetTotalTransferred>;
  assetTransaction?: Maybe<AssetTransaction>;
  assetTransactions: Array<AssetTransaction>;
  assets: Array<Asset>;
  authStatus?: Maybe<AuthStatus>;
  balTransferred?: Maybe<BalTransferred>;
  balTransferreds: Array<BalTransferred>;
  disqualified?: Maybe<Disqualified>;
  disqualifieds: Array<Disqualified>;
  isDisconnected?: Maybe<Scalars['Boolean']>;
  isWsError?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Locked>;
  lockedSupplies: Array<LockedSupply>;
  lockedSupply?: Maybe<LockedSupply>;
  lockeds: Array<Locked>;
  lpLocker?: Maybe<LpLocker>;
  lpLockers: Array<LpLocker>;
  lpTokenPrice?: Maybe<LpTokenPrice>;
  lpTokenPrices: Array<LpTokenPrice>;
  newBalTransfer?: Maybe<NewBalTransfer>;
  newBalTransfers: Array<NewBalTransfer>;
  newTransferAdded?: Maybe<NewTransferAdded>;
  newTransferAddeds: Array<NewTransferAdded>;
  relocked?: Maybe<Relocked>;
  relockeds: Array<Relocked>;
  reserveSize?: Maybe<ReserveSize>;
  reserveSizes: Array<ReserveSize>;
  totalTransferred?: Maybe<TotalTransferred>;
  totalTransferreds: Array<TotalTransferred>;
  usdTransfered?: Maybe<UsdTransfered>;
  usdTransfereds: Array<UsdTransfered>;
  user?: Maybe<User>;
  userTransaction?: Maybe<UserTransaction>;
  userTransactions: Array<UserTransaction>;
  users: Array<User>;
  withdrawn?: Maybe<Withdrawn>;
  withdrawns: Array<Withdrawn>;
  wsErrorCount?: Maybe<Scalars['Int']>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAssetTotalTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAssetTotalTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetTotalTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetTotalTransferred_Filter>;
};

export type QueryAssetTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAssetTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetTransaction_Filter>;
};

export type QueryAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};

export type QueryBalTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBalTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BalTransferred_Filter>;
};

export type QueryDisqualifiedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDisqualifiedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Disqualified_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Disqualified_Filter>;
};

export type QueryLockedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLockedSuppliesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockedSupply_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LockedSupply_Filter>;
};

export type QueryLockedSupplyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLockedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Locked_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Locked_Filter>;
};

export type QueryLpLockerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLpLockersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LpLocker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LpLocker_Filter>;
};

export type QueryLpTokenPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLpTokenPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LpTokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LpTokenPrice_Filter>;
};

export type QueryNewBalTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewBalTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewBalTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewBalTransfer_Filter>;
};

export type QueryNewTransferAddedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewTransferAddedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTransferAdded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewTransferAdded_Filter>;
};

export type QueryRelockedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRelockedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Relocked_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Relocked_Filter>;
};

export type QueryReserveSizeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryReserveSizesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReserveSize_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ReserveSize_Filter>;
};

export type QueryTotalTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTotalTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TotalTransferred_Filter>;
};

export type QueryUsdTransferedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUsdTransferedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UsdTransfered_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UsdTransfered_Filter>;
};

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserTransaction_Filter>;
};

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type QueryWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Withdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Withdrawn_Filter>;
};

export type Relocked = UserTransaction & {
  __typename?: 'Relocked';
  action: Action;
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  lockIndex: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  txHash: Scalars['Bytes'];
  user: User;
};

export type Relocked_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Action>;
  action_in?: InputMaybe<Array<Action>>;
  action_not?: InputMaybe<Action>;
  action_not_in?: InputMaybe<Array<Action>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Relocked_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lockIndex?: InputMaybe<Scalars['BigInt']>;
  lockIndex_gt?: InputMaybe<Scalars['BigInt']>;
  lockIndex_gte?: InputMaybe<Scalars['BigInt']>;
  lockIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockIndex_lt?: InputMaybe<Scalars['BigInt']>;
  lockIndex_lte?: InputMaybe<Scalars['BigInt']>;
  lockIndex_not?: InputMaybe<Scalars['BigInt']>;
  lockIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Relocked_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Relocked_OrderBy {
  Action = 'action',
  Amount = 'amount',
  Id = 'id',
  LockIndex = 'lockIndex',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  User = 'user',
  UserId = 'user__id',
}

export type ReserveSize = {
  __typename?: 'ReserveSize';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type ReserveSize_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<ReserveSize_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<ReserveSize_Filter>>>;
};

export enum ReserveSize_OrderBy {
  Amount = 'amount',
  Id = 'id',
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  asset?: Maybe<Asset>;
  assetTotalTransferred?: Maybe<AssetTotalTransferred>;
  assetTotalTransferreds: Array<AssetTotalTransferred>;
  assetTransaction?: Maybe<AssetTransaction>;
  assetTransactions: Array<AssetTransaction>;
  assets: Array<Asset>;
  balTransferred?: Maybe<BalTransferred>;
  balTransferreds: Array<BalTransferred>;
  disqualified?: Maybe<Disqualified>;
  disqualifieds: Array<Disqualified>;
  locked?: Maybe<Locked>;
  lockedSupplies: Array<LockedSupply>;
  lockedSupply?: Maybe<LockedSupply>;
  lockeds: Array<Locked>;
  lpLocker?: Maybe<LpLocker>;
  lpLockers: Array<LpLocker>;
  lpTokenPrice?: Maybe<LpTokenPrice>;
  lpTokenPrices: Array<LpTokenPrice>;
  newBalTransfer?: Maybe<NewBalTransfer>;
  newBalTransfers: Array<NewBalTransfer>;
  newTransferAdded?: Maybe<NewTransferAdded>;
  newTransferAddeds: Array<NewTransferAdded>;
  relocked?: Maybe<Relocked>;
  relockeds: Array<Relocked>;
  reserveSize?: Maybe<ReserveSize>;
  reserveSizes: Array<ReserveSize>;
  totalTransferred?: Maybe<TotalTransferred>;
  totalTransferreds: Array<TotalTransferred>;
  usdTransfered?: Maybe<UsdTransfered>;
  usdTransfereds: Array<UsdTransfered>;
  user?: Maybe<User>;
  userTransaction?: Maybe<UserTransaction>;
  userTransactions: Array<UserTransaction>;
  users: Array<User>;
  withdrawn?: Maybe<Withdrawn>;
  withdrawns: Array<Withdrawn>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAssetTotalTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAssetTotalTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetTotalTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetTotalTransferred_Filter>;
};

export type SubscriptionAssetTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAssetTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetTransaction_Filter>;
};

export type SubscriptionAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};

export type SubscriptionBalTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBalTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BalTransferred_Filter>;
};

export type SubscriptionDisqualifiedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDisqualifiedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Disqualified_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Disqualified_Filter>;
};

export type SubscriptionLockedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLockedSuppliesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LockedSupply_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LockedSupply_Filter>;
};

export type SubscriptionLockedSupplyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLockedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Locked_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Locked_Filter>;
};

export type SubscriptionLpLockerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLpLockersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LpLocker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LpLocker_Filter>;
};

export type SubscriptionLpTokenPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLpTokenPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LpTokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LpTokenPrice_Filter>;
};

export type SubscriptionNewBalTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewBalTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewBalTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewBalTransfer_Filter>;
};

export type SubscriptionNewTransferAddedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewTransferAddedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTransferAdded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewTransferAdded_Filter>;
};

export type SubscriptionRelockedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRelockedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Relocked_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Relocked_Filter>;
};

export type SubscriptionReserveSizeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionReserveSizesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReserveSize_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ReserveSize_Filter>;
};

export type SubscriptionTotalTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTotalTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TotalTransferred_Filter>;
};

export type SubscriptionUsdTransferedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUsdTransferedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UsdTransfered_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UsdTransfered_Filter>;
};

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserTransaction_Filter>;
};

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type SubscriptionWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Withdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Withdrawn_Filter>;
};

export type TotalTransferred = {
  __typename?: 'TotalTransferred';
  id: Scalars['ID'];
  totalTransferred: Scalars['BigInt'];
};

export type TotalTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TotalTransferred_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<TotalTransferred_Filter>>>;
  totalTransferred?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransferred_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_not?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum TotalTransferred_OrderBy {
  Id = 'id',
  TotalTransferred = 'totalTransferred',
}

export type UsdTransfered = {
  __typename?: 'UsdTransfered';
  id: Scalars['ID'];
  totalLpUsdTransfered: Scalars['BigInt'];
};

export type UsdTransfered_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UsdTransfered_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<UsdTransfered_Filter>>>;
  totalLpUsdTransfered?: InputMaybe<Scalars['BigInt']>;
  totalLpUsdTransfered_gt?: InputMaybe<Scalars['BigInt']>;
  totalLpUsdTransfered_gte?: InputMaybe<Scalars['BigInt']>;
  totalLpUsdTransfered_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLpUsdTransfered_lt?: InputMaybe<Scalars['BigInt']>;
  totalLpUsdTransfered_lte?: InputMaybe<Scalars['BigInt']>;
  totalLpUsdTransfered_not?: InputMaybe<Scalars['BigInt']>;
  totalLpUsdTransfered_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum UsdTransfered_OrderBy {
  Id = 'id',
  TotalLpUsdTransfered = 'totalLpUsdTransfered',
}

export type User = {
  __typename?: 'User';
  disqualified: Array<Disqualified>;
  id: Scalars['ID'];
  locked: Array<Locked>;
  relocked: Array<Relocked>;
  withdrawn: Array<Withdrawn>;
};

export type UserDisqualifiedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Disqualified_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Disqualified_Filter>;
};

export type UserLockedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Locked_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Locked_Filter>;
};

export type UserRelockedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Relocked_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Relocked_Filter>;
};

export type UserWithdrawnArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Withdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Withdrawn_Filter>;
};

export type UserTransaction = {
  action: Action;
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  txHash: Scalars['Bytes'];
  user: User;
};

export type UserTransaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Action>;
  action_in?: InputMaybe<Array<Action>>;
  action_not?: InputMaybe<Action>;
  action_not_in?: InputMaybe<Array<Action>>;
  and?: InputMaybe<Array<InputMaybe<UserTransaction_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<UserTransaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum UserTransaction_OrderBy {
  Action = 'action',
  Id = 'id',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  User = 'user',
  UserId = 'user__id',
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  disqualified_?: InputMaybe<Disqualified_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  locked_?: InputMaybe<Locked_Filter>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  relocked_?: InputMaybe<Relocked_Filter>;
  withdrawn_?: InputMaybe<Withdrawn_Filter>;
};

export enum User_OrderBy {
  Disqualified = 'disqualified',
  Id = 'id',
  Locked = 'locked',
  Relocked = 'relocked',
  Withdrawn = 'withdrawn',
}

export type Withdrawn = UserTransaction & {
  __typename?: 'Withdrawn';
  action: Action;
  burn: Scalars['BigInt'];
  id: Scalars['ID'];
  isLP: Scalars['Boolean'];
  lockedBalance: Scalars['BigInt'];
  penalty: Scalars['BigInt'];
  receivedAmount: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  txHash: Scalars['Bytes'];
  user: User;
};

export type Withdrawn_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Action>;
  action_in?: InputMaybe<Array<Action>>;
  action_not?: InputMaybe<Action>;
  action_not_in?: InputMaybe<Array<Action>>;
  and?: InputMaybe<Array<InputMaybe<Withdrawn_Filter>>>;
  burn?: InputMaybe<Scalars['BigInt']>;
  burn_gt?: InputMaybe<Scalars['BigInt']>;
  burn_gte?: InputMaybe<Scalars['BigInt']>;
  burn_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burn_lt?: InputMaybe<Scalars['BigInt']>;
  burn_lte?: InputMaybe<Scalars['BigInt']>;
  burn_not?: InputMaybe<Scalars['BigInt']>;
  burn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isLP?: InputMaybe<Scalars['Boolean']>;
  isLP_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLP_not?: InputMaybe<Scalars['Boolean']>;
  isLP_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  lockedBalance?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_gt?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_gte?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockedBalance_lt?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_lte?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_not?: InputMaybe<Scalars['BigInt']>;
  lockedBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Withdrawn_Filter>>>;
  penalty?: InputMaybe<Scalars['BigInt']>;
  penalty_gt?: InputMaybe<Scalars['BigInt']>;
  penalty_gte?: InputMaybe<Scalars['BigInt']>;
  penalty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  penalty_lt?: InputMaybe<Scalars['BigInt']>;
  penalty_lte?: InputMaybe<Scalars['BigInt']>;
  penalty_not?: InputMaybe<Scalars['BigInt']>;
  penalty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivedAmount?: InputMaybe<Scalars['BigInt']>;
  receivedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  receivedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  receivedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  receivedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  receivedAmount_not?: InputMaybe<Scalars['BigInt']>;
  receivedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Withdrawn_OrderBy {
  Action = 'action',
  Burn = 'burn',
  Id = 'id',
  IsLp = 'isLP',
  LockedBalance = 'lockedBalance',
  Penalty = 'penalty',
  ReceivedAmount = 'receivedAmount',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  User = 'user',
  UserId = 'user__id',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type AssetsQueryVariables = Exact<{ [key: string]: never }>;

export type AssetsQuery = {
  __typename?: 'Query';
  assets: Array<{ __typename?: 'Asset'; id: string }>;
};

export type NewTransfersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  timestamp: Scalars['Int'];
}>;

export type NewTransfersQuery = {
  __typename?: 'Query';
  newTransferAddeds: Array<{
    __typename?: 'NewTransferAdded';
    id: string;
    lpUsdValue: any;
    asset: { __typename?: 'Asset'; id: string };
  }>;
};

export type LastDayTransferQueryVariables = Exact<{
  lastTimeStamp: Scalars['Int'];
}>;

export type LastDayTransferQuery = {
  __typename?: 'Query';
  newTransferAddeds: Array<{
    __typename?: 'NewTransferAdded';
    id: string;
    lpUsdValue: any;
    timestamp: number;
    totalTransferred: any;
    assetTotals?: Array<{
      __typename?: 'AssetTotalTransferred';
      id: string;
      symbol: string;
      totalTransferred: any;
    }> | null;
  }>;
  totalTransferreds: Array<{ __typename?: 'TotalTransferred'; id: string; totalTransferred: any }>;
};

export type UsdTransferedsQueryVariables = Exact<{ [key: string]: never }>;

export type UsdTransferedsQuery = {
  __typename?: 'Query';
  usdTransfereds: Array<{ __typename?: 'UsdTransfered'; totalLpUsdTransfered: any }>;
};

export type UserHistoryQueryVariables = Exact<{
  id: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;

export type UserHistoryQuery = {
  __typename?: 'Query';
  userTransactions: Array<
    | { __typename?: 'Disqualified'; timestamp: number; id: string }
    | { __typename?: 'Locked'; id: string; timestamp: number }
    | { __typename?: 'Relocked'; amount: any; lockIndex: any; id: string; timestamp: number }
    | { __typename?: 'Withdrawn'; id: string; timestamp: number }
  >;
};

export type ConnectionStatusQueryVariables = Exact<{ [key: string]: never }>;

export type ConnectionStatusQuery = { __typename?: 'Query'; isDisconnected?: boolean | null };

export const AssetsDocument = gql`
  query Assets {
    assets {
      id
    }
  }
`;

/**
 * __useAssetsQuery__
 *
 * To run a query within a React component, call `useAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssetsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<AssetsQuery, AssetsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, options);
}
export function useAssetsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AssetsQuery, AssetsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, options);
}
export type AssetsQueryHookResult = ReturnType<typeof useAssetsQuery>;
export type AssetsLazyQueryHookResult = ReturnType<typeof useAssetsLazyQuery>;
export type AssetsQueryResult = ApolloReactCommon.QueryResult<AssetsQuery, AssetsQueryVariables>;
export const NewTransfersDocument = gql`
  query NewTransfers($first: Int, $skip: Int, $timestamp: Int!) {
    newTransferAddeds(
      orderBy: timestamp
      orderDirection: desc
      first: $first
      skip: $skip
      where: { timestamp_gte: $timestamp }
    ) {
      id
      lpUsdValue
      asset {
        id
      }
    }
  }
`;

/**
 * __useNewTransfersQuery__
 *
 * To run a query within a React component, call `useNewTransfersQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewTransfersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewTransfersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useNewTransfersQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<NewTransfersQuery, NewTransfersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<NewTransfersQuery, NewTransfersQueryVariables>(
    NewTransfersDocument,
    options
  );
}
export function useNewTransfersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewTransfersQuery, NewTransfersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<NewTransfersQuery, NewTransfersQueryVariables>(
    NewTransfersDocument,
    options
  );
}
export type NewTransfersQueryHookResult = ReturnType<typeof useNewTransfersQuery>;
export type NewTransfersLazyQueryHookResult = ReturnType<typeof useNewTransfersLazyQuery>;
export type NewTransfersQueryResult = ApolloReactCommon.QueryResult<
  NewTransfersQuery,
  NewTransfersQueryVariables
>;
export const LastDayTransferDocument = gql`
  query LastDayTransfer($lastTimeStamp: Int!) {
    newTransferAddeds(
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gte: $lastTimeStamp }
      first: 1
    ) {
      id
      lpUsdValue
      timestamp
      totalTransferred
      assetTotals {
        id
        symbol
        totalTransferred
      }
    }
    totalTransferreds {
      id
      totalTransferred
    }
  }
`;

/**
 * __useLastDayTransferQuery__
 *
 * To run a query within a React component, call `useLastDayTransferQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastDayTransferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastDayTransferQuery({
 *   variables: {
 *      lastTimeStamp: // value for 'lastTimeStamp'
 *   },
 * });
 */
export function useLastDayTransferQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    LastDayTransferQuery,
    LastDayTransferQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<LastDayTransferQuery, LastDayTransferQueryVariables>(
    LastDayTransferDocument,
    options
  );
}
export function useLastDayTransferLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LastDayTransferQuery,
    LastDayTransferQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<LastDayTransferQuery, LastDayTransferQueryVariables>(
    LastDayTransferDocument,
    options
  );
}
export type LastDayTransferQueryHookResult = ReturnType<typeof useLastDayTransferQuery>;
export type LastDayTransferLazyQueryHookResult = ReturnType<typeof useLastDayTransferLazyQuery>;
export type LastDayTransferQueryResult = ApolloReactCommon.QueryResult<
  LastDayTransferQuery,
  LastDayTransferQueryVariables
>;
export const UsdTransferedsDocument = gql`
  query UsdTransfereds {
    usdTransfereds {
      totalLpUsdTransfered
    }
  }
`;

/**
 * __useUsdTransferedsQuery__
 *
 * To run a query within a React component, call `useUsdTransferedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsdTransferedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsdTransferedsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsdTransferedsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UsdTransferedsQuery, UsdTransferedsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<UsdTransferedsQuery, UsdTransferedsQueryVariables>(
    UsdTransferedsDocument,
    options
  );
}
export function useUsdTransferedsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsdTransferedsQuery,
    UsdTransferedsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<UsdTransferedsQuery, UsdTransferedsQueryVariables>(
    UsdTransferedsDocument,
    options
  );
}
export type UsdTransferedsQueryHookResult = ReturnType<typeof useUsdTransferedsQuery>;
export type UsdTransferedsLazyQueryHookResult = ReturnType<typeof useUsdTransferedsLazyQuery>;
export type UsdTransferedsQueryResult = ApolloReactCommon.QueryResult<
  UsdTransferedsQuery,
  UsdTransferedsQueryVariables
>;
export const UserHistoryDocument = gql`
  query UserHistory($id: String!, $first: Int, $skip: Int) {
    userTransactions(
      first: $first
      skip: $skip
      where: { or: [{ action: Relocked, user: $id }, { action: Disqualified, user: $id }] }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      timestamp
      ... on Disqualified {
        timestamp
      }
      ... on Relocked {
        amount
        lockIndex
      }
    }
  }
`;

/**
 * __useUserHistoryQuery__
 *
 * To run a query within a React component, call `useUserHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserHistoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useUserHistoryQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<UserHistoryQuery, UserHistoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<UserHistoryQuery, UserHistoryQueryVariables>(
    UserHistoryDocument,
    options
  );
}
export function useUserHistoryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserHistoryQuery, UserHistoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<UserHistoryQuery, UserHistoryQueryVariables>(
    UserHistoryDocument,
    options
  );
}
export type UserHistoryQueryHookResult = ReturnType<typeof useUserHistoryQuery>;
export type UserHistoryLazyQueryHookResult = ReturnType<typeof useUserHistoryLazyQuery>;
export type UserHistoryQueryResult = ApolloReactCommon.QueryResult<
  UserHistoryQuery,
  UserHistoryQueryVariables
>;
export const ConnectionStatusDocument = gql`
  query ConnectionStatus {
    isDisconnected @client
  }
`;

/**
 * __useConnectionStatusQuery__
 *
 * To run a query within a React component, call `useConnectionStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useConnectionStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConnectionStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useConnectionStatusQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ConnectionStatusQuery,
    ConnectionStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<ConnectionStatusQuery, ConnectionStatusQueryVariables>(
    ConnectionStatusDocument,
    options
  );
}
export function useConnectionStatusLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ConnectionStatusQuery,
    ConnectionStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<ConnectionStatusQuery, ConnectionStatusQueryVariables>(
    ConnectionStatusDocument,
    options
  );
}
export type ConnectionStatusQueryHookResult = ReturnType<typeof useConnectionStatusQuery>;
export type ConnectionStatusLazyQueryHookResult = ReturnType<typeof useConnectionStatusLazyQuery>;
export type ConnectionStatusQueryResult = ApolloReactCommon.QueryResult<
  ConnectionStatusQuery,
  ConnectionStatusQueryVariables
>;
