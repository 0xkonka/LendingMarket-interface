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
        d="M10.8889 6V6.88889H12.4844L8.11556 11.2578L8.74222 11.8844L13.1111 7.51556V9.11111H14V6M13.1111 13.1111H6.88889V6.88889H10V6H6.88889C6.65314 6 6.42705 6.09365 6.26035 6.26035C6.09365 6.42705 6 6.65314 6 6.88889V13.1111C6 13.3469 6.09365 13.573 6.26035 13.7397C6.42705 13.9063 6.65314 14 6.88889 14H13.1111C13.3469 14 13.573 13.9063 13.7397 13.7397C13.9063 13.573 14 13.3469 14 13.1111V10H13.1111V13.1111Z"
        fill={color}
      />
    </svg>
  );
};

export default Icon;
