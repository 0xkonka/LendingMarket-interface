import type { IconProps } from '../icons/props';

const Icon = ({ height = 16, width = 16, color = '2ebac6', className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="share"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
    >
      <defs></defs>
      <path
        id="Path_6176"
        d="M161.985 0h-4.154a.417.417 0 000 .833h3.155l-8.1 8.182a.417.417 0 00.592.587l8.1-8.173v3.142a.417.417 0 00.833 0V.417a.417.417 0 00-.426-.417zm0 0"
        fill={color}
        transform="translate(-146.402)"
      />
      <path
        id="Path_6177"
        d="M13.506 56.723a.417.417 0 00-.417.417v4.56a1.251 1.251 0 01-1.25 1.25H2.083a1.251 1.251 0 01-1.25-1.25v-9.753a1.251 1.251 0 011.25-1.25h4.563a.417.417 0 000-.833H2.083A2.086 2.086 0 000 51.947V61.7a2.086 2.086 0 002.083 2.083h9.756a2.086 2.086 0 002.083-2.083v-4.561a.417.417 0 00-.416-.416zm0 0"
        fill={color}
        transform="translate(0 -47.786)"
      />
    </svg>
  );
};

export default Icon;
