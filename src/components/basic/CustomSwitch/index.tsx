import classNames from 'classnames';
import { useThemeContext, Switcher } from 'aave-ui-kit';

type CustomSwitchProps = {
  onSwitch: (value: boolean) => void;
  offLabel?: string;
  onLabel?: string;
  onColor?: string;
  offColor?: string;
  value: boolean | undefined;
  disabled?: boolean;
  swiperHeight?: number;
  swiperWidth?: number;
  withOutDelay?: boolean;
  className?: string;
  classNameSwiper?: string;
};

export default function CustomSwitch({
  onSwitch,
  onLabel,
  offLabel,
  value = false,
  onColor,
  offColor,
  disabled,
  swiperHeight = 20,
  swiperWidth = 36,
  withOutDelay,
  className,
  classNameSwiper,
}: CustomSwitchProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <Switcher
        className={classNames(`CustomSwitch`, className)}
        onSwitch={onSwitch}
        onLabel={onLabel}
        offLabel={offLabel}
        value={value}
        onColor={onColor}
        offColor={offColor}
        disabled={disabled}
        swiperHeight={swiperHeight}
        swiperWidth={swiperWidth}
        withOutDelay={withOutDelay}
        classNameSwiper={classNameSwiper}
      />

      <style jsx={true} global={true}>{`
        .CustomSwitch {
          &__deposit {
            .Switcher__label {
              color: ${currentTheme.text.main} !important;
              font-weight: 600;
            }
          }

          .Switcher__swiperDisabled {
            .react-switch-bg {
              background: ${currentTheme.text.offset4} !important;
            }
          }
        }
      `}</style>
    </>
  );
}
