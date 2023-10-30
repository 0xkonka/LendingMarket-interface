export interface CurrencyRouteParamsInterface {
  underlyingAsset: string;
  id?: string;
  selectedTab?: string;
}
export const CURRENCY_ROUTE_PARAMS = ':underlyingAsset([A-Z0-9x]+)(-?):id?-:selectedTab?';
