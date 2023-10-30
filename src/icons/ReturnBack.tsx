import { useHistory } from 'react-router-dom';
import type { IconProps } from './props';

interface ReturnBackIconProps extends IconProps {
  goBack?: () => void;
}

export default function Icon({
  width = 24,
  height = 24,
  color = '#475569',
  goBack,
}: ReturnBackIconProps) {
  const history = useHistory();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ReturnBackIcon"
      onClick={goBack || history.goBack}
    >
      <path
        d="M5.828 7.00005L8.364 9.53605L6.95 10.95L2 6.00005L6.95 1.05005L8.364 2.46405L5.828 5.00005H13C15.1217 5.00005 17.1566 5.8429 18.6569 7.34319C20.1571 8.84349 21 10.8783 21 13C21 15.1218 20.1571 17.1566 18.6569 18.6569C17.1566 20.1572 15.1217 21 13 21H4V19H13C14.5913 19 16.1174 18.3679 17.2426 17.2427C18.3679 16.1175 19 14.5913 19 13C19 11.4087 18.3679 9.88263 17.2426 8.75741C16.1174 7.63219 14.5913 7.00005 13 7.00005H5.828Z"
        fill={color}
      />
      <style jsx={true}>
        {`
          .ReturnBackIcon {
            cursor: pointer;
          }
        `}
      </style>
    </svg>
  );
}
