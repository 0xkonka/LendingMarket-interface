import type { IconProps } from '../icons/props';

const Icon = ({ height = 40, width = 40, color = '#5C1DFA', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.977 21.234L30.469 20l-7.492-1.234 4.43-6.172-6.173 4.43L20 9.53l-1.234 7.492-6.172-4.43 4.43 6.173L9.53 20l7.492 1.234-4.43 6.172 6.173-4.43L20 30.47l1.234-7.492 6.172 4.43-4.43-6.173z"
        fill={color}
      />
      <path
        d="M20 0C8.953 0 0 8.953 0 20s8.953 20 20 20 20-8.953 20-20S31.047 0 20 0zm0 34.305c-7.898 0-14.305-6.407-14.305-14.305S12.102 5.695 20 5.695 34.305 12.102 34.305 20 27.898 34.305 20 34.305z"
        fill="url(#paint0_linear_4543_28416)"
      />
      <path
        d="M40 20C40 8.953 31.047 0 20 0c-3.008 0-5.867.664-8.43 1.86a42.463 42.463 0 00-2.508 1.398C22.523-.25 29.36 9.039 29.642 9.43A14.268 14.268 0 0134.305 20c0 7.898-6.407 14.305-14.305 14.305a14.27 14.27 0 01-9.586-3.688c3.883 4.57 9.461 8.219 14.992 8.64C33.828 36.908 40 29.173 40 20z"
        fill="url(#paint1_linear_4543_28416)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4543_28416"
          x1="33.56"
          y1="-.917"
          x2="5.862"
          y2="41.808"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4543_28416"
          x1="-.288"
          y1="39.38"
          x2="40.962"
          y2=".421"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".103" stopColor="#0FA" />
          <stop offset=".999" stopColor="#5F00FA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
