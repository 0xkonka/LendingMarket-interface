import classNames from 'classnames';

export interface TimestampProps {
  unixTimestamp: number;
  className?: string;
}

export default function Timestamp({ unixTimestamp, className }: TimestampProps) {
  const formatTimestamp = (unixTimestamp: number) => {
    const targetDate = new Date(unixTimestamp * 1000); // Convert to milliseconds

    // Formatting date in MM-DD-YYYY format
    const formattedDate =
      ('0' + (targetDate.getUTCMonth() + 1)).slice(-2) +
      '-' +
      ('0' + targetDate.getUTCDate()).slice(-2) +
      '-' +
      targetDate.getUTCFullYear();

    // Formatting time in HH:MM format in military time (24-hour format)
    const formattedTime =
      ('0' + targetDate.getUTCHours()).slice(-2) +
      ':' +
      ('0' + targetDate.getUTCMinutes()).slice(-2);

    return { date: formattedDate, time: `${formattedTime} UTC` };
  };

  const { date, time } = formatTimestamp(unixTimestamp);

  return (
    <div className={classNames('Timestamp', className)}>
      {date}
      <br />
      {time}
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';
        @import 'src/_mixins/variables';

        .Timestamp {
        }
      `}</style>
    </div>
  );
}
