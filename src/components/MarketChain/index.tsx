import NativeTokenBalance from 'components/menu/NativeTokenBalance';
import RdntBalance from 'components/menu/RdntBalance';
import MarketChainSelector from './MarketChainSelector';

export default function MarketChain() {
  return (
    <div className="MarketChain">
      <MarketChainSelector />

      <div className="MarketChain__balance">
        <NativeTokenBalance />
        <RdntBalance />
      </div>
      <style jsx={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .MarketChain {
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          width: 100%;

          &__balance {
            display: flex;
            align-items: center;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
