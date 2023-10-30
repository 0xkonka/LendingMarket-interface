import React, { ReactNode, useEffect } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import BackIcon from 'icons/Back';
import Close from 'icons/Close';

export interface RadiantModalProps {
  isVisible: boolean;
  onBack?: () => void;
  onBackdropPress: () => void;
  children: ReactNode;
  withBackButton?: boolean;
  isBackButtonDisabled?: boolean;
  withCloseButton?: boolean;
  title?: string;
  className?: string;
}

let modalCounter = 0;

export default function RadiantModal({
  isVisible,
  onBack = () => {},
  onBackdropPress,
  withBackButton,
  isBackButtonDisabled = false,
  withCloseButton,
  className,
  title,
  children,
}: RadiantModalProps) {
  const { currentTheme } = useThemeContext();

  useEffect(() => {
    if (isVisible) {
      modalCounter += 1;
      const originalBodyOverflow = document.body.style.overflow;
      if (modalCounter === 1) {
        document.body.style.overflow = 'hidden';
        window.onpopstate = () => {
          onBackdropPress();
        };
      }

      return () => {
        modalCounter -= 1;
        if (modalCounter === 0) {
          document.body.style.overflow = originalBodyOverflow;
          window.onpopstate = () => {};
        }
      };
    }
  }, [isVisible, onBackdropPress]);

  return (
    <Modal
      className={classNames('RadiantModal', className)}
      isOpen={isVisible}
      onRequestClose={(e: React.MouseEvent) => {
        e.stopPropagation();
        onBackdropPress();
      }}
      ariaHideApp={false}
    >
      <div className="RadiantModal__topContainer">
        {withBackButton && (
          <button
            className={classNames(
              'RadiantModal__back',
              isBackButtonDisabled ? 'RadiantModal__back--disabled' : 'RadiantModal__back--enabled'
            )}
            type="button"
            onClick={() => {
              if (!isBackButtonDisabled) onBack();
            }}
          >
            <BackIcon color={currentTheme.text.main} />
          </button>
        )}

        {title && <p className="RadiantModal__title">{title}</p>}

        {withCloseButton && (
          <div className="RadiantModal__closeContainer">
            <button
              className="RadiantModal__close"
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onBackdropPress();
              }}
            >
              <Close color={currentTheme.text.main} />
            </button>
          </div>
        )}
      </div>

      {children}

      <style jsx global>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .RadiantModal {
          position: relative;
          padding: 32px;
          background-color: ${currentTheme.palette.token2.hex};

          @include respond-to(xs) {
            padding: 16px;
          }

          &__topContainer {
            width: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
          }

          &__title {
            font-size: 16px;
            font-weight: 600;
            color: ${currentTheme.text.main};
            margin: auto;
          }

          &__back {
            z-index: 2;

            &--disabled {
              opacity: 0.3;
            }

            &--enabled {
              &:hover {
                opacity: 0.7;
              }
              &:active {
                transform: scale(0.8);
              }
            }
          }

          &__close {
            z-index: 2;

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
