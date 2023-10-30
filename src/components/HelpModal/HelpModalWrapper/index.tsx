import { ReactNode } from 'react';

import HelpItem from 'components/HelpItem';
import { TextWithTooltipProps } from 'components/TextWithTooltip';
import TextWithTooltip from 'components/TextWithTooltip';

export interface HelpModalWrapperProps extends Pick<TextWithTooltipProps, 'secondaryIcon'> {
  text: string;
  iconSize?: number;
  className?: string;
  caption: string;
  description: string | ReactNode;
  color?: 'dark' | 'white';
  lightWeight?: boolean;
  onWhiteBackground?: boolean;
  modalClassName?: string;
  clickOnText?: boolean;
  withGrayIcon?: boolean;
  captionColor?: 'primary' | 'secondary' | 'dark' | 'white';
}

export default function HelpModalWrapper({
  text,
  iconSize,
  className,
  caption,
  description,
  color,
  lightWeight,
  onWhiteBackground,
  modalClassName,
  clickOnText,
  withGrayIcon,
  captionColor,
  secondaryIcon,
}: HelpModalWrapperProps) {
  return (
    <TextWithTooltip
      text={text}
      id={text}
      color={color}
      iconSize={iconSize}
      className={className}
      withGrayIcon={withGrayIcon}
    >
      <HelpItem caption={caption} description={description} onWhiteBackground={onWhiteBackground} />
    </TextWithTooltip>
  );
}
