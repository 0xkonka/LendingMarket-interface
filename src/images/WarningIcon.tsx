import type { IconProps } from '../icons/props';

const Icon = ({ height = 26.535, width = 30, color = '#fff', className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 30 26.535"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group_14219" data-name="Group 14219" transform="translate(-485 -683)">
        <g id="Group_14217" data-name="Group 14217">
          <path
            id="Path_6422"
            fill="#de2424"
            d="M29.382 49.453l-10.6-17.737a4.407 4.407 0 0 0-7.566 0L.619 49.453a4.394 4.394 0 0 0-.035 4.434A4.341 4.341 0 0 0 4.4 56.1h21.2a4.341 4.341 0 0 0 3.818-2.217 4.394 4.394 0 0 0-.036-4.43z"
            data-name="Path 6422"
            transform="translate(485 653.431)"
          />
          <path
            id="Path_6424"
            fill="#fd003a"
            d="M32.642 82.614a2.572 2.572 0 0 1-2.289-1.328 2.623 2.623 0 0 1 .027-2.679l10.59-17.723a2.649 2.649 0 0 1 4.55.012L56.11 78.62a2.617 2.617 0 0 1 .019 2.665 2.572 2.572 0 0 1-2.289 1.328h-21.2z"
            data-name="Path 6424"
            transform="translate(456.759 625.162)"
          />
          <path
            id="Path_6426"
            d="M229.488 123.824v7.038a1.76 1.76 0 0 1-3.519 0v-7.038a1.76 1.76 0 1 1 3.519 0z"
            fill={color}
            data-name="Path 6426"
            transform="translate(272.272 566.356)"
          />
          <path
            id="Path_6428"
            d="M213.593 332.278a2.639 2.639 0 1 0 2.639 2.639 2.636 2.636 0 0 0-2.639-2.639z"
            fill={color}
            data-name="Path 6428"
            transform="translate(286.407 368.459)"
          />
        </g>
      </g>
    </svg>
  );
};

export default Icon;
