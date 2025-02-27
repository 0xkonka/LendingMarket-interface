import type { IconProps } from '../icons/props';

const Icon = ({ height = 12, width = 12, color = '#b6509e', className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="broken-link"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 12 12"
    >
      <defs></defs>
      <g id="Group_31589">
        <path
          id="Path_10751"
          d="M9.214 78.233h-.428a.207.207 0 00-.214.214v2.143A1.074 1.074 0 017.5 81.661H1.929a1.032 1.032 0 01-.757-.315 1.032 1.032 0 01-.315-.757v-5.571a1.032 1.032 0 01.315-.757 1.032 1.032 0 01.757-.315h4.714a.206.206 0 00.214-.214V73.3a.206.206 0 00-.214-.214H1.929a1.858 1.858 0 00-1.363.566A1.858 1.858 0 000 75.019v5.571a1.857 1.857 0 00.566 1.363 1.858 1.858 0 001.363.566H7.5a1.932 1.932 0 001.929-1.929v-2.143a.207.207 0 00-.214-.214z"
          fill={color}
          transform="translate(0 -72.233)"
        />
        <path
          id="Path_10752"
          d="M202.854 36.674a.412.412 0 00-.3-.127h-3.429a.426.426 0 00-.3.73L200 38.455l-4.366 4.366a.211.211 0 000 .308l.763.763a.211.211 0 00.308 0l4.366-4.366 1.179 1.179a.429.429 0 00.73-.3v-3.429a.412.412 0 00-.126-.302z"
          fill={color}
          transform="translate(-190.981 -36.547)"
        />
      </g>
    </svg>
  );
};

export default Icon;
