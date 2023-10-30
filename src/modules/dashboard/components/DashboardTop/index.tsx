import DashboardTopLending from './DashboardTopLending';
import DashboardTopRevenue from './DashboardTopRevenue';

export default function DashboardTop() {
  return (
    <div className="DashboardTop">
      <DashboardTopLending />
      <DashboardTopRevenue />

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .DashboardTop {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;

            @include respond-to(md) {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}
