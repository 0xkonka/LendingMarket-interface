import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useThemeContext } from 'aave-ui-kit';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import TooltipInfoIcon from 'icons/TooltipInfo';

// Create root level element for react-tooltips
const domNode = document.createElement('div');
document.body.appendChild(domNode);

// Wrapper component to portal react-tooltips
function BodyPortal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, domNode);
}

export type AdditionalItemProps = {
  height: number;
  width: number;
  containerClassName: string;
  containerStyle: React.CSSProperties;
  iconTheme: 'dark' | 'gray' | 'default';
};

export type TextWithTooltipProps = {
  id: string;
  text: string;
  children: ReactNode;
  color?: 'dark' | 'white' | 'primary';
  type?: any;
  iconSize?: number;
  className?: string;
  withGrayIcon?: boolean;
  place?: 'top' | 'bottom';
  lightWeight?: boolean;
  withCloseButton?: boolean;
  withoutContentButton?: boolean;
  modalClassName?: string;
  onWhiteBackground?: boolean;
  clickOnText?: boolean;
  secondaryIcon?: (props: AdditionalItemProps) => JSX.Element;
};

export default function TextWithTooltip({
  id,
  text,
  color = 'dark',
  children,
  className,
  withGrayIcon,
  type = 'info',
  place = 'top',
}: TextWithTooltipProps) {
  const { currentTheme } = useThemeContext();
  const tooltipId = `tooltip_${id.replace(' ', '_')}`;

  return (
    <div className={classNames('TextWithTooltip', `TextWithTooltip__${color}`, className)}>
      <div data-tip data-for={tooltipId} className="title">
        {!!text && text}
        <TooltipInfoIcon />
      </div>
      <BodyPortal>
        <ReactTooltip
          className="TextWithTooltip__content"
          id={tooltipId}
          effect="solid"
          multiline={true}
          type={type}
          border
          backgroundColor={currentTheme.background.main}
        >
          {children}
        </ReactTooltip>
      </BodyPortal>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TextWithTooltip {
          position: relative;
          .title {
            display: flex;
            align-items: flex-start;
            gap: 4px;
            font-size: 12px;
            color: ${currentTheme.text.offset1};
          }

          &__content {
            max-width: 230px;
            width: 100%;
            border-radius: 10px;
            padding: 8px 12px;
            opacity: 1 !important;
            filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1))
              drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.2));

            p {
              padding: 0px !important;
              margin: 0px !important;
              font-size: 12px;
              color: ${currentTheme.text.main};
            }
          }
        }
      `}</style>
    </div>
  );
}
