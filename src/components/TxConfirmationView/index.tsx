import { ChangeEvent, ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { EthereumTransactionTypeExtended } from '@aave/protocol-js';
import { useWeb3React } from '@web3-react/core';
import { useThemeContext } from 'aave-ui-kit';
import { ChainId } from '@radiantcapital/contract-helpers';
import classNames from 'classnames';
import { providers } from 'ethers';

import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { ATokenInfo } from 'helpers/get-atoken-info';
import { getDefaultChainId, getSupportedChainIds } from 'helpers/config/markets-and-network-config';
import { EthTransactionData, sendEthTransaction, TxStatusType } from 'helpers/send-ethereum-tx';
import Preloader from 'components/basic/Preloader';
import Caption from 'components/basic/Caption';
import InfoWrapper from 'components/wrappers/InfoWrapper';
import InfoPanel from 'components/InfoPanel';
import TxEstimationEditor from 'components/TxEstimationEditor';
import AddATokenButton from 'components/AddATokenButton';
import ActionsWrapper from './ActionsWrapper';
import ActionExecutionBox from './ActionExecutionBox';
import TxTopInfo from './TxTopInfo';
import NetworkMismatch from './NetworkMismatch';
import messages from './messages';

export interface TxConfirmationViewProps {
  caption?: string;
  description?: string | ReactNodeArray | ReactNode;
  txChainId: ChainId;
  mainTxName: string;
  mainTxType?: string;
  boxTitle: string;
  boxDescription?: string;
  approveDescription?: string;
  children?: ReactNode;
  goToAfterSuccess?: string;
  successButtonTitle?: string;
  buttonTitle?: string;
  warningMessage?: string;
  dangerousMessage?: string | null | {} | ReactNodeArray;
  blockingError?: string;
  mainTxFailedMessage?: string;
  exceptionTxFailedMessages?: { error: string; message: string }[];
  className?: string;
  updateTransactionsData?: boolean;
  allowedChainIds?: ChainId[];
  aTokenData?: ATokenInfo;
  getTransactionsData: () => Promise<EthereumTransactionTypeExtended[]>;
  onMainTxExecuted?: (txHash: string) => void | Promise<void>;
  onMainTxConfirmed?: () => void | Promise<void>;
  onAfterSuccessClick?: (e: ChangeEvent) => void;
  goBack?: () => void;
}

export default function TxConfirmationView({
  caption,
  description,
  txChainId,
  mainTxType,
  mainTxName,
  boxTitle,
  boxDescription,
  approveDescription,
  children,
  goToAfterSuccess,
  successButtonTitle,
  buttonTitle,
  warningMessage,
  dangerousMessage,
  blockingError,
  mainTxFailedMessage,
  exceptionTxFailedMessages,
  className,
  updateTransactionsData,
  allowedChainIds: _allowedChainIds,
  aTokenData,
  getTransactionsData,
  onMainTxExecuted,
  onMainTxConfirmed,
  onAfterSuccessClick = () => {},
  goBack = () => {},
}: TxConfirmationViewProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { library: provider, chainId } = useWeb3React<providers.Web3Provider>();
  const { disconnectWallet, currentProviderName } = useUserWalletDataContext();
  const [loadingTxData, setLoadingTxData] = useState(true);
  const [backendNotAvailable, setBackendNotAvailable] = useState(false);
  const { chainId: currentMarketChainId, networkConfig } = useProtocolDataContext();

  // todo: do types more sophisticated
  const [uncheckedApproveTxData, setApproveTxData] = useState({} as EthTransactionData);
  const [uncheckedApproveDelegationTxData, setApproveDelegationTxData] = useState(
    {} as EthTransactionData
  );
  const [uncheckedApproveDelegationVdWethTxData, setApproveDelegationVdWethTxData] = useState(
    {} as EthTransactionData
  );
  const [uncheckedActionTxData, setActionTxData] = useState({} as EthTransactionData);
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [unlockedSteps, setUnlockedSteps] = useState(1);
  const [networkTokenSymbol, setNetworkTokenSymbol] = useState(
    chainId === 56 || chainId === 97 ? 'WBNB' : 'WETH'
  );

  /**
   * For some actions like e.g. stake/gov/migration we only allow certain networks (fork, kovan, mainnet).
   * We allow to browse these actions even while the user is on a different chain/network, therefore we can have multiple cases of mismatch,
   * 1. walletNetwork is not allowed for this action
   * 2. all networks or walletNetwork is allowed, but there the browsed market does not walletNetwork the walletNetwork
   */
  const currentWalletChainId = chainId as number;
  const allowedChainIds = _allowedChainIds?.filter((chainId) =>
    getSupportedChainIds().includes(chainId)
  );
  // current marketNetwork is supported if the action is either
  // not restricted to a network or the network is in the allow-list
  const currentMarketNetworkIsSupported =
    !allowedChainIds ||
    allowedChainIds?.find((network) =>
      networkConfig.isFork
        ? network === networkConfig.underlyingChainId
        : network === currentMarketChainId
    );

  let networkMismatch = false;
  let neededChainId = getDefaultChainId();

  if (currentMarketNetworkIsSupported && currentMarketChainId !== currentWalletChainId) {
    networkMismatch = true;
    neededChainId = currentMarketChainId;
  }

  if (!currentMarketNetworkIsSupported && txChainId !== currentWalletChainId) {
    networkMismatch = true;
    neededChainId = txChainId;
  }

  const [customGasPrice, setCustomGasPrice] = useState<string | null>(null);
  // todo: do types more sophisticated
  const approveTxData = uncheckedApproveTxData.unsignedData
    ? (uncheckedApproveTxData as EthTransactionData & {
        unsignedData: EthTransactionData;
      })
    : undefined;
  const approveDelegationTxData = uncheckedApproveDelegationTxData.unsignedData
    ? (uncheckedApproveDelegationTxData as EthTransactionData & {
        unsignedData: EthTransactionData;
      })
    : undefined;
  const approveDelegationVdWethTxData = uncheckedApproveDelegationVdWethTxData.unsignedData
    ? (uncheckedApproveDelegationVdWethTxData as EthTransactionData & {
        unsignedData: EthTransactionData;
      })
    : undefined;
  const actionTxData = uncheckedActionTxData.unsignedData
    ? (uncheckedActionTxData as EthTransactionData & {
        unsignedData: EthTransactionData;
      })
    : undefined;

  const handleGetTxData = async () => {
    try {
      const txs = await getTransactionsData();
      const approvalTxs = txs.filter((tx) => tx.txType === 'ERC20_APPROVAL');

      const actionTx = txs.find((tx) =>
        [
          'DLP_ACTION',
          'GOVERNANCE_ACTION',
          'STAKE_ACTION',
          'LOCK_ACTION',
          'GOV_DELEGATION_ACTION',
          'REWARD_ACTION',
          mainTxType,
        ].includes(tx.txType)
      );

      if (actionTx) {
        setActionTxData({
          txType: actionTx.txType,
          unsignedData: actionTx.tx,
          gas: actionTx.gas,
          name: mainTxName,
        });
      }

      if (approvalTxs.length > 0) {
        setApproveTxData({
          txType: approvalTxs[0].txType,
          unsignedData: approvalTxs[0].tx,
          gas: approvalTxs[0].gas,
          name: intl.formatMessage(messages.approve),
        });
      }

      if (approvalTxs.length > 1) {
        setApproveDelegationTxData({
          txType: approvalTxs[1].txType,
          unsignedData: approvalTxs[1].tx,
          gas: approvalTxs[1].gas,
          name: intl.formatMessage(messages.approveDelegation),
        });
      }

      if (approvalTxs.length > 2) {
        setApproveDelegationVdWethTxData({
          txType: approvalTxs[2].txType,
          unsignedData: approvalTxs[2].tx,
          gas: approvalTxs[2].gas,
          name: intl.formatMessage(messages.approveDelegationVdWeth, {
            wrapped_token: networkTokenSymbol,
          }),
        });
      }

      setLoadingTxData(false);
      return true;
    } catch (e) {
      console.log('Error on txs loading', e);
      setBackendNotAvailable(true);
      setLoadingTxData(false);
      return false;
    }
  };

  const handleApprovalTxConfirmed = () => {
    setUnlockedSteps(2);
    setSelectedStep(2);
  };

  const handleApprovalDelegationTxConfirmed = () => {
    setUnlockedSteps(3);
    setSelectedStep(3);
  };

  const handleApprovalDelegationVdWethTxConfirmed = () => {
    setUnlockedSteps(4);
    setSelectedStep(4);
  };

  const goPreviousStep = () => {
    if (selectedStep === 1) {
      goBack();
    } else {
      setSelectedStep(selectedStep - 1);
      setUnlockedSteps(selectedStep - 1);
    }
  };

  const resetTxn = () => {
    goBack();
  };

  useEffect(() => {
    if (
      (approveTxData?.error?.includes('disconnected') ||
        approveDelegationTxData?.error?.includes('disconnected') ||
        approveDelegationVdWethTxData?.error?.includes('disconnected') ||
        actionTxData?.error?.includes('disconnected')) &&
      currentProviderName?.includes('ledger')
    ) {
      setTimeout(() => disconnectWallet(new Error('Ledger device is disconnected')), 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    approveTxData?.error,
    approveDelegationTxData?.error,
    approveDelegationVdWethTxData?.error,
    actionTxData?.error,
  ]);

  useEffect(() => {
    if (!networkMismatch) {
      // console.log('tx loading started');
      handleGetTxData();
    } else {
      setLoadingTxData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTransactionsData, networkMismatch]);

  useEffect(() => {
    setNetworkTokenSymbol(chainId === 56 || chainId === 97 ? 'WBNB' : 'WETH');
  }, [chainId]);

  if (loadingTxData) {
    return <Preloader withText={true} />;
  }

  const numberOfSteps = approveDelegationVdWethTxData
    ? 4
    : approveDelegationTxData
    ? 3
    : approveTxData
    ? 2
    : actionTxData
    ? 1
    : 0;
  const mainTxConfirmed = actionTxData?.txStatus === TxStatusType.confirmed;
  const mainTxPending = actionTxData?.txStatus === TxStatusType.submitted;

  return (
    <div className={classNames('TxConfirmationView', className)}>
      {!!caption && (
        <Caption
          title={!mainTxConfirmed ? caption : intl.formatMessage(messages.congratulations)}
          description={
            !mainTxConfirmed
              ? description || intl.formatMessage(messages.transactionDetails, { br: <br /> })
              : intl.formatMessage(messages.successfullyExecuted)
          }
          color="purple"
        />
      )}

      {!!children && (
        <div
          className={classNames('TxConfirmationView__content-inner', {
            TxConfirmationView__contentInner: !children,
          })}
        >
          <div className="TxConfirmationView__content">{children}</div>
        </div>
      )}
      <div className="TxConfirmationView__actions-inner">
        {networkMismatch && currentProviderName ? (
          <NetworkMismatch
            neededChainId={neededChainId}
            currentChainId={chainId as ChainId}
            currentProviderName={currentProviderName}
          />
        ) : (
          <ActionsWrapper
            approveTxData={approveTxData}
            approveDelegationTxData={approveDelegationTxData}
            approveDelegationVdWethTxData={approveDelegationVdWethTxData}
            actionTxData={actionTxData}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
            numberOfSteps={numberOfSteps}
            unlockedSteps={unlockedSteps}
            error={backendNotAvailable || !!blockingError}
          >
            {(!blockingError || mainTxConfirmed) && (
              <>
                {approveTxData &&
                  selectedStep === 1 &&
                  approveTxData.txStatus !== TxStatusType.confirmed && (
                    <ActionExecutionBox
                      title={`Step ${selectedStep} of ${numberOfSteps + 1}: ${
                        backendNotAvailable
                          ? intl.formatMessage(messages.errorTitle)
                          : intl.formatMessage(messages.approve)
                      }`}
                      description={approveDescription}
                      onSubmitTransaction={() =>
                        sendEthTransaction(
                          approveTxData.unsignedData,
                          provider,
                          setApproveTxData,
                          customGasPrice,
                          {
                            onConfirmation: handleApprovalTxConfirmed,
                          }
                        )
                      }
                      txStatus={approveTxData.txStatus}
                      loading={approveTxData.loading}
                      failed={approveTxData.error}
                      buttonTitle={intl.formatMessage(messages.approve)}
                      previousStep={() => goPreviousStep()}
                      initTxn={() => resetTxn()}
                    />
                  )}

                {approveDelegationTxData &&
                  selectedStep === 2 &&
                  approveDelegationTxData.txStatus !== TxStatusType.confirmed && (
                    <ActionExecutionBox
                      title={`Step ${selectedStep} of ${numberOfSteps + 1}: ${
                        backendNotAvailable
                          ? intl.formatMessage(messages.errorTitle)
                          : intl.formatMessage(messages.approveDelegation)
                      }`}
                      description={approveDescription}
                      onSubmitTransaction={() =>
                        sendEthTransaction(
                          approveDelegationTxData.unsignedData,
                          provider,
                          setApproveDelegationTxData,
                          customGasPrice,
                          {
                            onConfirmation: handleApprovalDelegationTxConfirmed,
                          }
                        )
                      }
                      txStatus={approveDelegationTxData.txStatus}
                      loading={approveDelegationTxData.loading}
                      failed={approveDelegationTxData.error}
                      buttonTitle={intl.formatMessage(messages.approveDelegation)}
                      previousStep={() => goPreviousStep()}
                      initTxn={() => resetTxn()}
                    />
                  )}

                {approveDelegationVdWethTxData &&
                  selectedStep === 3 &&
                  approveDelegationVdWethTxData.txStatus !== TxStatusType.confirmed && (
                    <ActionExecutionBox
                      title={`Step ${selectedStep} of ${numberOfSteps + 1}: ${
                        backendNotAvailable
                          ? intl.formatMessage(messages.errorTitle)
                          : intl.formatMessage(messages.approveDelegationVdWeth, {
                              wrapped_token: networkTokenSymbol,
                            })
                      }`}
                      description={approveDescription}
                      onSubmitTransaction={() =>
                        sendEthTransaction(
                          approveDelegationVdWethTxData.unsignedData,
                          provider,
                          setApproveDelegationVdWethTxData,
                          customGasPrice,
                          {
                            onConfirmation: handleApprovalDelegationVdWethTxConfirmed,
                          }
                        )
                      }
                      txStatus={approveDelegationVdWethTxData.txStatus}
                      loading={approveDelegationVdWethTxData.loading}
                      failed={approveDelegationVdWethTxData.error}
                      buttonTitle={intl.formatMessage(messages.approveDelegationVdWeth, {
                        wrapped_token: networkTokenSymbol,
                      })}
                      previousStep={() => goPreviousStep()}
                      initTxn={() => resetTxn()}
                    />
                  )}

                {actionTxData && selectedStep === numberOfSteps && (
                  <ActionExecutionBox
                    title={`Step ${selectedStep} of ${numberOfSteps + 1}: ${
                      backendNotAvailable ? intl.formatMessage(messages.errorTitle) : boxTitle
                    }`}
                    description={
                      (backendNotAvailable && intl.formatMessage(messages.errorDescription)) ||
                      blockingError ||
                      boxDescription
                    }
                    onSubmitTransaction={async () => {
                      const success = await handleGetTxData();
                      if (success) {
                        return sendEthTransaction(
                          actionTxData.unsignedData,
                          provider,
                          setActionTxData,
                          customGasPrice,
                          {
                            onExecution: onMainTxExecuted,
                            onConfirmation: onMainTxConfirmed,
                          }
                        );
                      } else {
                        setActionTxData((state) => ({
                          ...state,
                          txStatus: TxStatusType.error,
                          loading: false,
                          error: 'transaction no longer valid',
                        }));
                      }
                    }}
                    successButtonTitle={successButtonTitle}
                    goToAfterSuccess={goToAfterSuccess}
                    onAfterSuccessClick={onAfterSuccessClick}
                    buttonTitle={buttonTitle || boxTitle}
                    txStatus={actionTxData.txStatus}
                    loading={actionTxData.loading}
                    failed={actionTxData.error}
                    error={!mainTxPending && (backendNotAvailable || !!blockingError)}
                    numberOfSteps={numberOfSteps}
                    mainTxFailedMessage={mainTxFailedMessage}
                    exceptionTxFailedMessages={exceptionTxFailedMessages}
                    previousStep={() => goPreviousStep()}
                    initTxn={() => resetTxn()}
                  />
                )}
              </>
            )}

            {((!!blockingError && !mainTxConfirmed && !mainTxPending) || backendNotAvailable) && (
              <TxTopInfo
                title={backendNotAvailable ? intl.formatMessage(messages.errorTitle) : boxTitle}
                description={
                  backendNotAvailable
                    ? intl.formatMessage(messages.errorDescription)
                    : blockingError
                }
                error={backendNotAvailable || !!blockingError}
                previousStep={() => goPreviousStep()}
              />
            )}
          </ActionsWrapper>
        )}

        {!mainTxConfirmed &&
          [ChainId.mainnet].includes(currentWalletChainId) &&
          currentMarketChainId === currentWalletChainId && (
            <TxEstimationEditor
              customGasPrice={customGasPrice}
              txs={[
                uncheckedApproveTxData,
                uncheckedApproveDelegationTxData,
                uncheckedActionTxData,
              ]}
              setCustomGasPrice={setCustomGasPrice}
              step={selectedStep}
              editDisabled={mainTxPending}
            />
          )}
      </div>

      <InfoWrapper>
        {!!warningMessage && !mainTxConfirmed && <InfoPanel>{warningMessage}</InfoPanel>}
        {!!dangerousMessage && !mainTxConfirmed && <InfoPanel>{dangerousMessage}</InfoPanel>}
      </InfoWrapper>

      {(window as any)?.ethereum?.isMetaMask &&
        mainTxConfirmed &&
        currentProviderName === 'browser' &&
        aTokenData?.address && <AddATokenButton aTokenData={aTokenData} />}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .TxConfirmationView {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
            max-width: 600px;
            width: 100%;

            @include respond-to(sm) {
              width: 100%;
              max-width: 380px;
            }

            &__content-inner {
              width: 100%;
            }

            &__contentInner {
              margin-bottom: 0;
            }

            &__content {
              padding: 30px 25px;
              color: ${currentTheme.text.main};
              background: ${currentTheme.interface.mainTable};
              border: 1px solid ${currentTheme.interface.divider};
              border-radius: $borderRadius;

              .Row__title {
                font-size: $fontSizeSmall;
              }

              .Value__value,
              .Value__symbol,
              .ValuePercent__value,
              .ValuePercent__value span {
                font-weight: 600 !important;
              }
            }

            &__actions-inner {
              width: 100%;
            }

            .TokenIcon.TokenIcon .TokenIcon__name {
              font-size: 16px;
            }

            .InfoPanel {
              &:last-of-type {
                margin-top: 15px;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
