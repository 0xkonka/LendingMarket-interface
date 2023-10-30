import { TokenIcon, useThemeContext } from 'aave-ui-kit';

import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import Value from 'components/basic/Value';

export default function NativeTokenBalance() {
  const { currentTheme } = useThemeContext();
  const { nativeTokenBalance } = useRdntBalanceContext();
  const { networkConfig } = useProtocolDataContext();

  return (
    <div className="NativeTokenBalance">
      <TokenIcon tokenSymbol={networkConfig.baseAsset} height={20} width={20} />
      <Value value={Number(nativeTokenBalance)} maximumValueDecimals={2} minimumValueDecimals={2} />
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .NativeTokenBalance {
            display: flex;
            align-items: center;
            gap: 10px;

            p {
              font-size: 14px;
              font-weight: 600;
              color: ${currentTheme.text.offset2} !important;
            }
          }
        `}
      </style>
    </div>
  );
}
