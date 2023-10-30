import type { IconProps } from './props';

export default function Icon({ width = 14, height = 14, color = 'white', className }: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0233 1.63H15.3877C15.8339 1.63 16.2617 1.80724 16.5772 2.12272C16.8927 2.43819 17.0699 2.86607 17.0699 3.31223V15.0878C17.0699 15.5339 16.8927 15.9618 16.5772 16.2773C16.2617 16.5928 15.8339 16.77 15.3877 16.77H12.0233M7.81771 13.4056L12.0233 9.2M12.0233 9.2L7.81771 4.99445M12.0233 9.2H1.92993"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
