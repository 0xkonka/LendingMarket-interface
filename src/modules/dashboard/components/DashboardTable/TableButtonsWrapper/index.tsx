import { ReactNode } from 'react';

type TableButtonsWrapperProps = {
  children: ReactNode;
};

export default function TableButtonsWrapper({ children }: TableButtonsWrapperProps) {
  return (
    <div className="TableButtonsWrapper">
      {children}

      <style jsx={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TableButtonsWrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 130px;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
