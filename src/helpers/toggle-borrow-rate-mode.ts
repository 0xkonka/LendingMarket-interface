import { useHistory } from 'react-router-dom';
import { InterestRate } from '@aave/protocol-js';

export const toggleBorrowRateMode = (
  history: ReturnType<typeof useHistory>,
  reserveID: string,
  borrowRateMode: InterestRate,
  underlyingAsset: string
) => {
  history.push(
    `/interest-swap/${underlyingAsset}-${reserveID}/confirmation?borrowRateMode=${borrowRateMode}`
  );
};
