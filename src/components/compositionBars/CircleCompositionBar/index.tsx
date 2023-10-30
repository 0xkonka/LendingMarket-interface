import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

import { PieChart } from '../PieChart';

export interface CircleCompositionBarItem {
  color: string;
  value: number;
  label: string | number;
  percent?: string;
  symbol?: string;
}

interface CircleCompositionBarProps {
  totalValue: number;
  data: CircleCompositionBarItem[];
}

export default function CircleCompositionBar({ data }: CircleCompositionBarProps) {
  return (
    <div className="CircleCompositionBar">
      <ParentSize>
        {(parent) => <PieChart width={parent.width} height={parent.height} slices={data} />}
      </ParentSize>

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .CircleCompositionBar {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            position: relative;
          }
        `}
      </style>
    </div>
  );
}
