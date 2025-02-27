import type { IconProps } from '../icons/props';

const Icon = ({ height = 18, width = 17.265, color = '#fff', className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 17.265 18"
    >
      <path
        fill={color}
        d="M8.192 9a.741.741 0 00-.211-.591l-6.69-6.678A.756.756 0 10.222 2.8L6.434 9 .222 15.2a.755.755 0 101.069 1.067l6.69-6.677A.742.742 0 008.192 9zm8.861-.591L8.851.221a.755.755 0 10-1.069 1.067L15.506 9l-7.725 7.711a.756.756 0 001.069 1.068l8.2-8.188A.74.74 0 0017.262 9a.74.74 0 00-.209-.591z"
      />
    </svg>
  );
};

export default Icon;
