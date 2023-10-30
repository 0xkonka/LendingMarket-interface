import { useThemeContext } from 'aave-ui-kit';

import Row from 'components/basic/Row';
import staticStyles from './style';

export type GraphLegendDot = {
  name: string;
  color?: string;
};

interface GraphLegendProps {
  title: string;
  dots?: GraphLegendDot[];
  withFilterButtons?: boolean;
  poolReserveId?: string;
}

export default function GraphLegend({
  title,
  dots,
  withFilterButtons,
  poolReserveId,
}: GraphLegendProps) {
  const { currentTheme } = useThemeContext();

  return (
    <Row title={title} className="GraphLegend" color="white">
      <div className="GraphLegend__inner">
        {dots &&
          dots.map((dot, index) => (
            <div className="GraphLegend__item" key={index}>
              <div
                className="GraphLegend__dot"
                style={{
                  backgroundColor: dot.color ? dot.color : currentTheme.darkOrange.hex,
                }}
              />
              <p className="GraphLegend__name">{dot.name}</p>
            </div>
          ))}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .GraphLegend {
          &__name {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </Row>
  );
}
