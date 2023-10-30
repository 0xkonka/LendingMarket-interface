export function getApiVersion(now: number, roundSecondsAmount: number = 600) {
  let secs = now / 1000;
  return secs - (secs % roundSecondsAmount);
}
