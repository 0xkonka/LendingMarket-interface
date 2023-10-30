import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { rgb } from 'd3-color';
import { useThemeContext } from 'aave-ui-kit';

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  slices: Slice[];
  thickWidth?: number;
};

export type Slice = { value: number; label: string | number; color: string; symbol?: string };

const frequency = (d: Slice) => d.value;

export function PieChart({
  width,
  height,
  margin = defaultMargin,
  slices,
  thickWidth = 0,
}: PieProps) {
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } =
    useTooltip<Slice>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a: number, b: number) => b - a;

  return (
    <>
      <svg width={width} height={height} ref={containerRef}>
        <Group top={top} left={left}>
          <Pie
            data={slices}
            pieValue={frequency}
            pieSortValues={pieSortValues}
            outerRadius={radius}
            innerRadius={radius * thickWidth}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const { label } = arc.data;
                let arcFill = arc.data.color;
                if (
                  (arc.data.symbol === 'ETH' || arc.data.symbol === 'WETH') &&
                  isCurrentThemeDark
                ) {
                  arcFill = currentTheme.textDarkBlue.hex;
                }
                const isSelected = tooltipData?.label === arc.data.label;
                const arcPath = pie.path(arc);
                return (
                  <g key={`arc-${label}-${index}`}>
                    <path
                      d={arcPath ? arcPath : undefined}
                      fill={isSelected ? rgb(arcFill).brighter(1).toString() : arcFill}
                      onMouseLeave={hideTooltip}
                      onTouchStart={(event) => {
                        const eventSvgCoords = localPoint(event);
                        showTooltip({
                          tooltipData: arc.data,
                          tooltipTop: eventSvgCoords?.y,
                          tooltipLeft: eventSvgCoords?.x,
                        });
                      }}
                      onMouseMove={(event) => {
                        const eventSvgCoords = localPoint(event);
                        showTooltip({
                          tooltipData: arc.data,
                          tooltipTop: eventSvgCoords?.y,
                          tooltipLeft: eventSvgCoords?.x,
                        });
                      }}
                    />
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={{ ...defaultStyles, zIndex: 10000 }}
        >
          <div>{tooltipData.label}</div>
        </TooltipInPortal>
      )}
    </>
  );
}
