import type { IconProps } from '../../icons/props';

const Icon = ({ height = 20, width = 20, color = '#474A4D', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.185 1.865a7.5 7.5 0 009.95 9.95A8.336 8.336 0 011.667 10a8.336 8.336 0 016.518-8.135zm6.952.044l.696.174v.834l-.696.174a1.667 1.667 0 00-1.213 1.212L13.75 5h-.833l-.175-.697a1.666 1.666 0 00-1.212-1.212l-.697-.174v-.834l.697-.174A1.666 1.666 0 0012.742.697L12.917 0h.833l.174.697a1.666 1.666 0 001.213 1.212zm4.166 4.167L20 6.25v.833l-.697.175a1.667 1.667 0 00-1.212 1.212l-.174.697h-.834l-.174-.697a1.667 1.667 0 00-1.212-1.213L15 7.083V6.25l.697-.174a1.667 1.667 0 001.212-1.213l.174-.696h.834l.174.696a1.666 1.666 0 001.212 1.213z"
        fill={color}
      />
    </svg>
  );
};

export default Icon;
