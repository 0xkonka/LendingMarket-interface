import { TokenIcon, useThemeContext } from 'aave-ui-kit';

import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import Value from 'components/basic/Value';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import GradientLine from 'components/basic/GradientLine';

export default function RdntBalance() {
  const { currentTheme } = useThemeContext();
  const { walletBalance } = useRdntBalanceContext();
  const { prices } = useRdntPrices();

  return (
    <div className="RdntBalance">
      <TokenIcon tokenSymbol={'RDNT'} height={20} width={20} />
      <Value value={Number(walletBalance)} maximumValueDecimals={2} minimumValueDecimals={2} />
      <GradientLine size={1} direction="vertical" className="RdntBalance__line" />
      <Value
        showDollarSign
        value={Number(prices?.tokenPrice || 0)}
        maximumValueDecimals={2}
        minimumValueDecimals={2}
      />

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .RdntBalance {
            display: flex;
            align-items: center;
            gap: 10px;

            p {
              font-size: 14px;
              font-weight: 600;
              color: ${currentTheme.text.offset2} !important;
            }

            &__line {
              height: 24px;
            }
          }
        `}
      </style>
    </div>
  );
}
