import { useIntl } from 'react-intl';

import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { MockTokenContract } from 'libs/aave-protocol-js/MockToken/MockTokenContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { getAssetInfo } from 'helpers/config/assets-config';
import ScreenWrapper from 'components/wrappers/ScreenWrapper';
import ContentWrapper from 'components/wrappers/ContentWrapper';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from 'components/RouteParamsValidationWrapper';
import Row from 'components/basic/Row';
import NoDataPanel from 'components/NoDataPanel';
import messages from './messages';
import { ethers } from 'ethers';

const MINT_AMOUNT = '1000000';

function FaucetConfirmation({
  currencySymbol,
  poolReserve,
  user,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { chainId } = useProtocolDataContext();
  const asset = getAssetInfo(currencySymbol);

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
    const mockLpContract = new MockTokenContract(getProvider(chainId), poolReserve.underlyingAsset);
    const userId = user?.id || '';
    const amount = ethers.utils.parseUnits(MINT_AMOUNT, poolReserve.decimals);
    return await mockLpContract.mint(userId, amount);
  };

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle, {
        currencySymbol: asset.formattedName,
      })}
      isTitleOnDesktop={true}
    >
      <ContentWrapper withFullHeight={true} withBackButton={true}>
        <PoolTxConfirmationView
          mainTxName={intl.formatMessage(messages.txName)}
          caption={intl.formatMessage(messages.caption, {
            currencySymbol: asset.formattedName,
          })}
          boxTitle={intl.formatMessage(messages.boxTitle)}
          boxDescription={intl.formatMessage(messages.boxDescription)}
          getTransactionsData={handleGetTransactions}
          mainTxType="FAUCET_MINT"
          goToAfterSuccess="/deposit"
          successButtonTitle={intl.formatMessage(messages.successButtonTitle)}
        >
          <Row title={intl.formatMessage(messages.rowTitle)}>
            <strong style={{ color: `${asset.color}` }}>{asset.formattedName}</strong>
          </Row>
        </PoolTxConfirmationView>
      </ContentWrapper>
    </ScreenWrapper>
  );
}

export default routeParamValidationHOC({})(FaucetConfirmation);
