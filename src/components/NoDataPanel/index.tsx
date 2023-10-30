import { ReactNodeArray, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import Caption from 'components/basic/Caption';
import ConnectButton from 'components/ConnectButton';
import GradientButton from 'components/basic/GradientButton';
import messages from './messages';
import staticStyles from './style';

export interface NoDataPanelProps {
  title: string;
  description?: string | ReactNodeArray | ReactNode;
  buttonTitle?: string;
  linkTo?: string;
  className?: string;
  withBigBackButton?: boolean;
  withConnectButton?: boolean;
  buttonMediumSize?: boolean;
  withAnimationCircle?: boolean;
  children?: ReactNode;
}

export default function NoDataPanel({
  title,
  description,
  buttonTitle,
  linkTo,
  className,
  withBigBackButton,
  withConnectButton,
  buttonMediumSize,
  withAnimationCircle,
  children,
}: NoDataPanelProps) {
  const history = useHistory();
  const intl = useIntl();

  return (
    <div className={classNames('NoDataPanel', className)}>
      <Caption
        color="dark"
        title={title}
        description={description}
        withAnimationCircle={withAnimationCircle}
      />

      {linkTo && buttonTitle && (
        <GradientButton href={linkTo} size="small">
          {buttonTitle}
        </GradientButton>
      )}

      {withConnectButton && <ConnectButton />}

      {withBigBackButton && (
        <GradientButton size="small" onClick={history.goBack}>
          {intl.formatMessage(messages.goBack)}
        </GradientButton>
      )}

      {children}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
