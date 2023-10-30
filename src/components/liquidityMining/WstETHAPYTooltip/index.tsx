import { useThemeContext } from 'aave-ui-kit';
import GradientLine from 'components/basic/GradientLine';

interface WstETHAPYTooltipProps {
  baseAPY?: number;
  lidoStakedAPY?: number;
}

export default function WstETHAPYTooltip({ baseAPY, lidoStakedAPY }: WstETHAPYTooltipProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="WstETHAPYTooltip">
      <p className="WstETHAPYTooltip__title">Deposit APR:</p>
      <GradientLine />
      <div className="WstETHAPYTooltip__contents">
        <div className="WstETHAPYTooltip__row">
          <p>Base APY:</p>
          <p className="WstETHAPYTooltip__APYPercentage">{baseAPY}%</p>
        </div>
        <div className="WstETHAPYTooltip__row">
          <p>Lido Staked APY:</p>
          <p className="WstETHAPYTooltip__APYPercentage">{lidoStakedAPY}%</p>
        </div>
        <div className="WstETHAPYTooltip__row">
          <p>RDNT emission APY:</p>
          {baseAPY && lidoStakedAPY && (
            <p className="WstETHAPYTooltip__APYPercentage">{baseAPY + lidoStakedAPY}%</p>
          )}
        </div>
      </div>
      <style jsx={true}>{`
        .WstETHAPYTooltip {
          &__title {
            font-family: 'PP Mori';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 18px;
            color: ${currentTheme.text.main};
            padding-bottom: 10px;
          }

          &__contents {
            padding-top: 5px;
          }

          &__row {
            display: flex;
            justify-content: space-between;
          }

          &__APYPercentage {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-size: 11px;
            line-height: 13px;
            text-align: right;
          }
        }
      `}</style>
    </div>
  );
}
