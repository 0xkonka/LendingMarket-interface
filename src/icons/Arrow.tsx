import type { IconProps } from './props';

interface ArrowProps extends IconProps {
  rotation?: string;
}

export default function Icon({
  width = 18,
  height = 18,
  color = 'white',
  rotation = '0deg',
}: ArrowProps) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: rotation }}
      >
        <path
          d="M3.75 9H14.25M14.25 9L9 3.75M14.25 9L9 14.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
