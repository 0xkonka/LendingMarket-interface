import React, { ReactNode, useEffect } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

export interface APRComparisonModalProps {
  isVisible: boolean;
  onBack?: () => void;
  onBackdropPress: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function APRComparisonModal({
  isVisible,
  onBackdropPress,
  className,
  title,
  children,
}: APRComparisonModalProps) {
  const { currentTheme } = useThemeContext();

  useEffect(() => {
    if (isVisible) {
      window.onpopstate = () => {
        onBackdropPress();
      };
    }

    return () => {
      window.onpopstate = () => {};
    };
  }, [isVisible]);

  return (
    <Modal
      className={classNames('APRComparisonModal', className)}
      isOpen={isVisible}
      onRequestClose={(e: React.MouseEvent) => {
        e.stopPropagation();
        onBackdropPress();
      }}
      ariaHideApp={false}
    >
      <div className="APRComparisonModal__topContainer">
        <div className="APRComparisonModal__title">
          <p>{title}</p>
        </div>
      </div>

      {children}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .APRComparisonModal {
          position: relative;
          padding: 24px;
          background-color: ${currentTheme.background.main};

          &__topContainer {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          &__title {
            font-size: 18px;
            font-weight: 600;
            color: ${currentTheme.text.main};
            margin: auto;
          }

          &__back {
            z-index: 2;

            &:hover {
              opacity: 0.7;
            }

            &:active {
              transform: scale(0.8);
            }
          }

          &__close {
            z-index: 2;
            // position: absolute;
            // right: 25px;
            // top: 12.75px;

            &:hover {
              opacity: 0.7;
            }

            &:active {
              transform: scale(0.8);
            }
          }
        }
      `}</style>
    </Modal>
  );
}
