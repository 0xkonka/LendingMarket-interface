import classNames from 'classnames';
import Arrow from 'icons/Arrow';

interface BaseButtonProps {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  action: () => void;
  isArrowVisible?: boolean;
  iconLeft?: any;
  iconRight?: any;
  style?: any;
}

export default function BaseButton({
  text,
  disabled = false,
  isArrowVisible = false,
  isLoading = false,
  iconLeft,
  iconRight,
  style,
  action,
}: BaseButtonProps) {
  return (
    <>
      <div
        onClick={!disabled && !isLoading ? action : () => {}}
        className={classNames('BaseButton', disabled && 'BaseButtonDisabled')}
        style={style}
      >
        <span className="BaseButtonContent">
          {isLoading && <div className="BaseButtonSpinner"></div>}
          {iconLeft && <div className="BaseButtonContentIconLeft">{iconLeft}</div>}
          {text}
          {isArrowVisible && (
            <div className={classNames('BaseButtonRightArrow', !disabled && 'AnimationArmed')}>
              <Arrow />
            </div>
          )}
          {iconRight && <div className="BaseButtonContentIconRight">{iconRight}</div>}
        </span>
      </div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';
          @import 'src/modules/migration/migrationVars';

          .BaseButton {
            display: flex;
            justify-content: center;
            padding: 16px 32px;
            background: rgba($purple, 1);
            color: rgba($white, 1);
            border-radius: 64px;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.5s ease;
            cursor: ${!disabled && !isLoading ? 'pointer' : 'unset'};
          }

          .BaseButtonContent {
            display: flex;
            align-items: center;
            min-height: 22px;
            font-size: $fontSizeRegular;

            @include respond-to(xs) {
              font-size: $fontSizeMedium;
            }
          }

          .BaseButton:hover {
            background: rgba($purple, 0.9);
          }

          .BaseButtonDisabled {
            opacity: 0.3;
          }

          .BaseButton.BaseButtonDisabled {
            cursor: not-allowed;
            background: rgba($purple, 1);
          }

          .BaseButtonRightArrow {
            display: flex;
            position: relative;
            align-items: center;
            margin-left: 8px;
            transition: transform 0.5s ease;
          }

          .BaseButton:hover .BaseButtonRightArrow.AnimationArmed {
            transform: translateX(2px);
          }

          .BaseButtonContentIconLeft {
            margin-right: 8px;
          }

          .BaseButtonContentIconRight {
            margin-left: 8px;
          }

          .BaseButtonSpinner {
            border: 3px solid rgba($white, 0.1);
            border-top-color: $white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin-right: 12px;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
}
