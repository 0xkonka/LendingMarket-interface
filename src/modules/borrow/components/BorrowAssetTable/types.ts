export type BorrowTableItem = {
  id: string;
  symbol: string;
  underlyingAsset: string;
  currentBorrows: number | string;
  currentBorrowsInUSD: number | string;
  variableBorrowRate: number | string;
  availableBorrows: number | string;
  availableBorrowsInUSD: number | string;
  avg30DaysVariableRate?: number;
  rdntRewardsBorrowApr?: number;
  grossBorrowApr?: number;
  userId?: string;
  isFreezed?: boolean;
  vincentivesAPR: string;
  aincentivesAPR: string;
};
