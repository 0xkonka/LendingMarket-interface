import { useThemeContext } from 'aave-ui-kit';
import Arrow from 'icons/Arrow';

interface BaseOutlineButtonProps {
  text: string;
  action: () => void;
  isLoading?: boolean;
  isArrowVisible?: boolean;
}

export default function BaseOutlineButton({
  text,
  action,
  isLoading = false,
  isArrowVisible = false,
}: BaseOutlineButtonProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <div onClick={action} className="BaseOutlineButton">
        <span className="BaseOutlineButtonContent">
          {isLoading ? <div className="BaseOutlineButtonSpinner"></div> : <>{text}</>}
          {isArrowVisible && (
            <div className="BaseOutlineButtonArrow">
              <Arrow rotation="-45deg" color={currentTheme.brand.main} />
            </div>
          )}
        </span>
      </div>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';
          @import 'src/modules/migration/migrationVars';

          .BaseOutlineButton {
            display: flex;
            justify-content: center;
            padding: 16px;
            background: transparent;
            color: rgba($purple, 1);
            border-radius: $base-radius;
            border: 1px solid;
            font-size: 16px;
            font-weight: 600;
            height: 56px;
            background: ${currentTheme.interface.mainTable};
            border-color: ${currentTheme.interface.offset1};
          }

          .BaseOutlineButton:hover {
            cursor: pointer;
            background: rgba($purple, 0.05);
          }

          .BaseOutlineButtonContent {
            display: flex;
            align-items: center;
            min-height: 22px;
          }

          .BaseOutlineButtonSpinner {
            border: 3px solid rgba($purple, 0.1);
            border-top-color: $purple;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .BaseOutlineButtonArrow {
            position: relative;
            top: -4px;
            margin-left: 4px;
            margin-right: -8px;
            transition: transform 0.5s ease;
          }

          .BaseOutlineButton:hover .BaseOutlineButtonArrow {
            transform: translateX(2px);
          }
        `}
      </style>
    </>
  );
}
