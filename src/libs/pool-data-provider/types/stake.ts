import { Stake } from '../../aave-protocol-js';

export interface StakeGeneralDataT<SimpleNumber, BN> {
  stakeTokenTotalSupply: BN;
  stakeCooldownSeconds: SimpleNumber;
  stakeUnstakeWindow: SimpleNumber;
  stakeTokenPriceEth: BN;
  rewardTokenPriceEth: BN;
  stakeApy: BN;
  distributionPerSecond: BN;
  distributionEnd: BN;
}

export type StakeGeneralData = StakeGeneralDataT<number, string>;

export interface StakeUserDataT<SimpleNumber, BN> {
  stakeTokenUserBalance: BN;
  underlyingTokenUserBalance: BN;
  userCooldown: SimpleNumber;
  userIncentivesToClaim: BN;
  userPermitNonce: BN;
}

export type StakeUserData = StakeUserDataT<number, string>;

export type StakeData = StakeGeneralData & StakeUserData;

export type StakesData = {
  [Stake.rdnt]: StakeData;
};

export type ComputedStakeData = StakeData & {
  distributionPerDay: string;
  userCooldownEndTime: number;
  userEarningsPerDay: string;
};

export type ComputedStakesData = {
  [Stake.rdnt]: ComputedStakeData;
};
