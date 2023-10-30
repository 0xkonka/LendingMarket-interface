import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';

import './style.scss';

interface DropdownWrapperProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  className?: string;
  contentClassName?: string;
  buttonComponent: ReactElement;
  children: ReactNode;
  verticalPosition?: 'bottom' | 'top';
  horizontalPosition?: 'left' | 'right' | 'center';
  contentId?: string;
  withArrow?: boolean;
}

export default function DropdownWrapper({
  visible,
  setVisible,
  className,
  contentClassName,
  buttonComponent,
  children,
  verticalPosition,
  horizontalPosition,
  contentId,
  withArrow,
}: DropdownWrapperProps) {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    // @ts-ignore
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classNames(
        'DropdownWrapper',
        className,
        `DropdownWrapper__${verticalPosition}`,
        `DropdownWrapper__${horizontalPosition}`
      )}
      ref={wrapperRef}
    >
      {buttonComponent}

      {withArrow ? (
        <i
          className={classNames('DropdownWrapper__icon', {
            DropdownWrapper__icon__down: !visible,
            DropdownWrapper__icon__up: visible,
          })}
        />
      ) : null}

      <div
        className={classNames(
          'DropdownWrapper__content',
          {
            DropdownWrapper__contentVisible: visible,
          },
          contentClassName
        )}
        id={contentId}
      >
        {children}
      </div>
    </div>
  );
}
