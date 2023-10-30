import queryString from 'querystring';
import { useHistory } from 'react-router-dom';

export const toggleUseAsCollateral = (
  history: ReturnType<typeof useHistory>,
  reserveId: string | undefined,
  asCollateral: boolean | undefined,
  underlyingAsset: string | undefined
) => {
  const query = queryString.stringify({ asCollateral });
  history.push(`/usage-as-collateral/${underlyingAsset}-${reserveId}/confirmation?${query}`);
};
