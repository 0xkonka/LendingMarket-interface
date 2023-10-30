import type { IconProps } from './props';

export default function Icon({ width = 24, height = 24, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#CFB2FD"
        fillOpacity="0.5"
        d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21ZM12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24Z"
      />
      <path
        d="M12.5 3C7.52944 3 3.5 7.02944 3.5 12H0.5C0.5 5.37258 5.87258 0 12.5 0V3Z"
        fill="#5F00FA"
      />
      <style jsx={true}>
        {`
          svg {
            animation: rotation 1s infinite linear;
          }

          @keyframes rotation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(359deg);
            }
          }
        `}
      </style>
    </svg>
  );
}
