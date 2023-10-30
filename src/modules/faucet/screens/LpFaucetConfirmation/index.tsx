import { memo } from 'react';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MockLpContract } from 'libs/aave-protocol-js/MockLp/MockLpContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import ScreenWrapper from 'components/wrappers/ScreenWrapper';
import ContentWrapper from 'components/wrappers/ContentWrapper';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import Row from 'components/basic/Row';
import NoDataPanel from 'components/NoDataPanel';
import messages from './messages';

function LpFaucetConfirmation() {
  const intl = useIntl();

  const { user } = useDynamicPoolDataContext();
  const { chainId } = useProtocolDataContext();
  const { networkConfig } = useStaticPoolDataContext();

  const currencySymbol = `RDNT/${networkConfig.baseAssetWrappedSymbol}`;
  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const handleGetTransactions = async () => {
    const mockLpContract = new MockLpContract(
      getProvider(chainId),
      networkConfig.addresses.stakingToken
    );
    const userId = user?.id || '';

    return await mockLpContract.mint(userId);
  };

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle, { currencySymbol })}
      isTitleOnDesktop={true}
    >
      <ContentWrapper withFullHeight={true} withBackButton={true}>
        <PoolTxConfirmationView
          mainTxName={intl.formatMessage(messages.txName)}
          caption={intl.formatMessage(messages.caption, {
            currencySymbol: currencySymbol,
          })}
          boxTitle={intl.formatMessage(messages.boxTitle)}
          boxDescription={intl.formatMessage(messages.boxDescription)}
          getTransactionsData={handleGetTransactions}
          mainTxType="FAUCET_MINT"
          goToAfterSuccess="/deposit"
          successButtonTitle={intl.formatMessage(messages.successButtonTitle)}
        >
          <Row title={intl.formatMessage(messages.rowTitle)}>
            <strong className="text-[#7159ff]">{currencySymbol}</strong>
          </Row>
        </PoolTxConfirmationView>
      </ContentWrapper>
    </ScreenWrapper>
  );
}

export default memo(LpFaucetConfirmation);
