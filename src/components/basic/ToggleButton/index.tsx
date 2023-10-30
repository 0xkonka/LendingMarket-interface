import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

export interface ToggleButtonProps {
  onChange?: (event: any) => void;
  checked: boolean;
  className?: string;
}

export default function ToggleButton({ onChange, checked = false, className }: ToggleButtonProps) {
  const { currentTheme } = useThemeContext();

  return (
    <label className={classNames('ToggleButton', className)}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider round"></span>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';
        @import 'src/_mixins/variables';

        .ToggleButton {
          position: relative;
          display: inline-block;
          min-width: 35px;
          height: 20px;

          input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${currentTheme.text.offset4};
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 34px;
          }

          .slider:before {
            position: absolute;
            content: '';
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 50%;
          }

          input:checked + .slider {
            background-color: ${currentTheme.brand.main};
          }

          input:focus + .slider {
            box-shadow: 0 0 1px ${currentTheme.brand.main};
          }

          input:checked + .slider:before {
            -webkit-transform: translateX(15px);
            -ms-transform: translateX(15px);
            transform: translateX(15px);
          }
        }
      `}</style>
    </label>
  );
}
