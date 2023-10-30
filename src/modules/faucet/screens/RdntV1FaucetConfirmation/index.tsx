import { memo } from 'react';
import { ethers } from 'ethers';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { getProvider } from 'helpers/config/markets-and-network-config';
import ScreenWrapper from 'components/wrappers/ScreenWrapper';
import ContentWrapper from 'components/wrappers/ContentWrapper';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import Row from 'components/basic/Row';
import NoDataPanel from 'components/NoDataPanel';
import messages from './messages';
import { MockTokenContract } from 'libs/aave-protocol-js/MockToken/MockTokenContract';

const MINT_AMOUNT = '1000000';

function RdntV1FaucetConfirmation() {
  const intl = useIntl();

  const { user } = useDynamicPoolDataContext();
  const { chainId } = useProtocolDataContext();
  const { networkConfig } = useStaticPoolDataContext();

  const currencySymbol = `RDNT V1`;

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
    const mockTokenContract = new MockTokenContract(
      getProvider(chainId),
      networkConfig.addresses?.radiantV1 || ''
    );
    const userId = user?.id || '';
    const amount = ethers.utils.parseUnits(MINT_AMOUNT, 18);
    return await mockTokenContract.mint(userId, amount);
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
          goToAfterSuccess="/migration"
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

export default memo(RdntV1FaucetConfirmation);
