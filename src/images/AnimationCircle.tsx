import type { IconProps } from '../icons/props';

const Icon = ({ height = 32.002, width = 31.996, color = '#7159ff', className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 31.996 32.002"
    >
      <g transform="translate(-343.999 -409.998)">
        <path
          fill={color}
          d="M359.996 442a16 16 0 1111.314-4.687A15.892 15.892 0 01359.996 442zm0-29.336a13.333 13.333 0 109.426 3.906 13.24 13.24 0 00-9.426-3.906z"
          opacity=".1"
        >
          <animate
            attributeType="CSS"
            attributeName="opacity"
            from=".1"
            to=".3"
            begin="0s"
            dur="1s"
            values="0.2; 0.1; 0.2"
            keyTimes="0; 0.5; 1"
            repeatCount="indefinite"
          />
        </path>
        <circle cx="12" cy="12" r="12" fill={color} opacity=".6" transform="translate(348 414)">
          <animate
            attributeType="SVG"
            attributeName="r"
            from="6"
            to="14"
            begin="0s"
            dur="4s"
            values="6; 12; 6"
            keyTimes="0; 0.5; 1"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="opacity"
            from=".6"
            to=".2"
            begin="0s"
            dur="4s"
            values="0.6; 0.2; 0.6"
            keyTimes="0; 0.5; 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="9" cy="9" r="9" fill={color} opacity=".4" transform="translate(351 417)">
          <animate
            attributeType="SVG"
            attributeName="r"
            from="5"
            to="10"
            begin="0s"
            dur="3s"
            values="5; 10; 5"
            keyTimes="0; 0.5; 1"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="opacity"
            from=".4"
            to=".3"
            begin="0s"
            dur="3s"
            values="0.4; 0.3; 0.4"
            keyTimes="0; 0.5; 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="6" cy="6" r="6" fill="#fff" transform="translate(354 420)">
          <animate
            attributeType="SVG"
            attributeName="r"
            from="3"
            to="8"
            begin="0s"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="opacity"
            from="1"
            to=".3"
            begin="0s"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};

export default Icon;
