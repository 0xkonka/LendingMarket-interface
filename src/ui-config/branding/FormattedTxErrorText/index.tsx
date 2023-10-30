import { useIntl } from 'react-intl';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import messages from './messages';
import staticStyles from './style';

export interface FormattedTxErrorTextProps {
  description?: string;
}

export default function FormattedTxErrorText({ description = '' }: FormattedTxErrorTextProps) {
  const intl = useIntl();
  const { networkConfig } = useProtocolDataContext();

  return (
    <div className="FormattedTxErrorText">
      {!!description ? (
        <span>{description}</span>
      ) : (
        <>
          <span>
            {intl.formatMessage(messages.errorDescriptionFirst, {
              asset: networkConfig.baseAsset,
            })}
          </span>
          <span>{intl.formatMessage(messages.errorDescriptionSecond)}</span>
        </>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
