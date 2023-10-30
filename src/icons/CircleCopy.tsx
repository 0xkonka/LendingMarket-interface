import type { IconProps } from './props';

const Icon = ({ height = 20, width = 20, color = '#475569', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="9.5" fill="#F8FAFC" stroke="#EAEFF5" />
      <path
        d="M6.94118 14C6.68235 14 6.46071 13.9217 6.27624 13.7652C6.09208 13.6084 6 13.42 6 13.2V7.6H6.94118V13.2H12.1176V14H6.94118ZM8.82353 11.8C8.56471 11.8 8.34322 11.7217 8.15906 11.5652C7.97459 11.4084 7.88235 11.22 7.88235 11V6.8C7.88235 6.58 7.97459 6.3916 8.15906 6.2348C8.34322 6.07827 8.56471 6 8.82353 6H13.0588C13.3176 6 13.5393 6.07827 13.7238 6.2348C13.9079 6.3916 14 6.58 14 6.8V11C14 11.22 13.9079 11.4084 13.7238 11.5652C13.5393 11.7217 13.3176 11.8 13.0588 11.8H8.82353ZM8.82353 11H13.0588V6.8H8.82353V11Z"
        fill={color}
      />
    </svg>
  );
};

export default Icon;
