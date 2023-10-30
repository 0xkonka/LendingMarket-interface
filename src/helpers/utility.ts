import humanizeDuration from 'humanize-duration';

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const humanize = (date: Date, chainTime: string = '', forceShowTime = false) => {
  const expiry = date.getTime();
  const now = new Date(chainTime).getTime();
  const delta = expiry - now;

  if (delta > 0 || forceShowTime) {
    return humanizeDuration(delta, {
      maxDecimalPoints: 0,
      units: ['y', 'mo', 'd', 'h', 'm', 's'],
      largest: 1,
    });
  } else {
    return 'Unlocked';
  }
};
