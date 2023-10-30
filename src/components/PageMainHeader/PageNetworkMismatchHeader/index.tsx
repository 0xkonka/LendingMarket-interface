import { useIntl } from 'react-intl';

import { getNetworkConfig } from 'helpers/config/markets-and-network-config';
import OutlineButton from 'components/basic/OutlineButton';
import switchNetwork from 'components/TxConfirmationView/NetworkMismatch/switchNetwork';
import { ADD_CONFIG } from 'components/TxConfirmationView/NetworkMismatch';
import messages from './messages';

interface PageNetworkMismatchHeaderProps {
  neededChainId: number;
}

export default function PageNetworkMismatchHeader({
  neededChainId,
}: PageNetworkMismatchHeaderProps) {
  const intl = useIntl();
  const config = ADD_CONFIG[neededChainId];
  const neededNetworkConfig = getNetworkConfig(neededChainId);
  const { publicJsonRPCWSUrl, rpcUrl } = neededNetworkConfig;

  return (
    <div className="PageNetworkMismatchHeader">
      <h3 className="PageNetworkMismatchHeader__title">
        {intl.formatMessage(messages.title)}
        <span>{intl.formatMessage(messages.description)}</span>
      </h3>

      <OutlineButton
        color="fourth"
        className="PageNetworkMismatchHeader__button"
        onClick={() =>
          switchNetwork({
            neededChainId,
            chainName: config.name,
            nativeCurrency: config.nativeCurrency,
            rpcUrls: [...rpcUrl, publicJsonRPCWSUrl],
            blockExplorerUrls: config.explorerUrls,
          })
        }
      >
        {intl.formatMessage(messages.button, { networkConfig: neededNetworkConfig.name })}
      </OutlineButton>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .PageNetworkMismatchHeader {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
            height: 100%;
            gap: 40px;

            &__title {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-weight: 700;
              font-size: 35px;
              text-align: center;
              color: #ffffff;

              & span {
                font-size: 18px;
                font-weight: 400;
              }
            }

            &__button {
              min-width: 220px;
              padding: 15px;

              &:hover {
                opacity: 1 !important;
                color: #0f172a;
                background: #ffffff;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
