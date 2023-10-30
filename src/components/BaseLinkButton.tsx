import Arrow from 'icons/Arrow';
import { useThemeContext } from 'aave-ui-kit';

interface BaseLinkButtonProps {
  text: string;
  action: () => void;
  isLoading?: boolean;
  isArrowVisible?: boolean;
}

export default function BaseLinkButton({
  text,
  action,
  isLoading = false,
  isArrowVisible = false,
}: BaseLinkButtonProps) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <div onClick={action} className="BaseLinkButton">
        <span className="BaseLinkButtonContent">
          <>{text}</>
          {isArrowVisible && (
            <div className="BaseLinkButtonArrow">
              <Arrow width={16} height={16} rotation="-45deg" color={currentTheme.brand.main} />
            </div>
          )}
        </span>
      </div>
      <style jsx global>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';
          @import 'src/modules/migration/migrationVars';

          .BaseLinkButton {
            display: flex;
            justify-content: center;
            color: rgba($purple, 1);
            font-size: $fontSizeRegular;
            font-weight: $fontWeightSemiBold;
            background: ${currentTheme.interface.mainTable};
          }

          .BaseLinkButtonContent {
            display: flex;
            align-items: center;
            min-height: 22px;
            color: ${currentTheme.brand.main};
            font-size: $fontSizeRegular;

            @include respond-to(xs) {
              font-size: $fontSizeMedium;
            }
          }

          .BaseLinkButtonContent:hover {
            cursor: pointer;
            text-decoration: underline;
          }

          .BaseLinkButtonArrow {
            position: relative;
            top: -4px;
            margin-left: 2px;
            margin-right: -8px;
            transition: transform 0.5s ease;
          }

          .BaseLinkButton:hover .BaseLinkButtonArrow {
            transform: translateX(2px);
          }
        `}
      </style>
    </>
  );
}
