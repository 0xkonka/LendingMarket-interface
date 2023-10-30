import { ReactNode } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { gradient, useThemeContext } from 'aave-ui-kit';

import { EthTransactionData, TxStatusType } from 'helpers/send-ethereum-tx';
import TxBottomStatusLine from '../TxBottomStatusLine';
import messages from './messages';

interface ActionsWrapperProps {
  approveTxData?: EthTransactionData;
  approveDelegationTxData?: EthTransactionData;
  approveDelegationVdWethTxData?: EthTransactionData;
  actionTxData?: EthTransactionData;
  selectedStep: number;
  setSelectedStep: (value: number) => void;
  numberOfSteps: number;
  unlockedSteps: number;
  error?: boolean;
  children: ReactNode;
}

export default function ActionsWrapper({
  approveTxData,
  approveDelegationTxData,
  approveDelegationVdWethTxData,
  actionTxData,
  selectedStep,
  setSelectedStep,
  numberOfSteps,
  unlockedSteps,
  error,
  children,
}: ActionsWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const activeGradient = gradient(
    90,
    `${currentTheme.secondary.rgb}, 1`,
    0,
    `${currentTheme.primary.rgb}, 1`,
    100
  );
  const allowedGradient = gradient(
    90,
    `${currentTheme.secondary.rgb}, 0.5`,
    0,
    `${currentTheme.primary.rgb}, 0.5`,
    100
  );

  const approveSubmitted = approveTxData?.txStatus === TxStatusType.submitted;
  const approveConfirmed = approveTxData?.txStatus === TxStatusType.confirmed;
  const approveError = approveTxData?.error && approveTxData.txStatus === TxStatusType.error;
  const approveDelegationSubmitted = approveDelegationTxData?.txStatus === TxStatusType.submitted;
  const approveDelegationConfirmed = approveDelegationTxData?.txStatus === TxStatusType.confirmed;
  const approveDelegationError =
    approveDelegationTxData?.error && approveDelegationTxData.txStatus === TxStatusType.error;
  const approveDelegationVdWethSubmitted =
    approveDelegationVdWethTxData?.txStatus === TxStatusType.submitted;
  const approveDelegationVdWethConfirmed =
    approveDelegationVdWethTxData?.txStatus === TxStatusType.confirmed;
  const approveDelegationVdWethError =
    approveDelegationVdWethTxData?.error &&
    approveDelegationVdWethTxData.txStatus === TxStatusType.error;
  const actionSubmitted = actionTxData?.txStatus === TxStatusType.submitted;
  const actionConfirmed = actionTxData?.txStatus === TxStatusType.confirmed;
  const actionError = actionTxData?.error && actionTxData.txStatus === TxStatusType.error;

  return (
    <div
      className={classNames('ActionsWrapper', {
        ActionsWrapper__submitted: actionSubmitted,
        ActionsWrapper__confirmed: actionConfirmed,
        ActionsWrapper__error: (!actionConfirmed && actionError) || (error && !actionConfirmed),
      })}
    >
      <div className="ActionsWrapper__buttons">
        {approveTxData && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonActive: selectedStep === 1,
              ActionsWrapper__buttonSubmitted: approveSubmitted,
              ActionsWrapper__buttonConfirmed: approveConfirmed || selectedStep > 1,
              ActionsWrapper__buttonError:
                (!approveConfirmed && approveError) || (error && !approveConfirmed),
            })}
            onClick={() => setSelectedStep(1)}
            disabled={approveConfirmed || !!approveError || selectedStep === 1}
          >
            <span>1</span>
            <p>{approveTxData.name}</p>
          </button>
        )}

        {approveDelegationTxData && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonActive: selectedStep === 2,
              ActionsWrapper__buttonSubmitted: approveDelegationSubmitted,
              ActionsWrapper__buttonConfirmed: approveDelegationConfirmed || selectedStep > 2,
              ActionsWrapper__buttonError:
                (!approveDelegationConfirmed && approveDelegationError) ||
                (error && !approveDelegationConfirmed),
            })}
            onClick={() => setSelectedStep(2)}
            disabled={approveDelegationConfirmed || !!approveDelegationError || selectedStep === 2}
          >
            <span>2</span>
            <p>{approveDelegationTxData.name}</p>
          </button>
        )}

        {approveDelegationVdWethTxData && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonActive: selectedStep === 3,
              ActionsWrapper__buttonSubmitted: approveDelegationVdWethSubmitted,
              ActionsWrapper__buttonConfirmed: approveDelegationVdWethConfirmed || selectedStep > 3,
              ActionsWrapper__buttonError:
                (!approveDelegationVdWethConfirmed && approveDelegationVdWethError) ||
                (error && !approveDelegationVdWethConfirmed),
            })}
            onClick={() => setSelectedStep(3)}
            disabled={
              approveDelegationVdWethConfirmed ||
              !!approveDelegationVdWethError ||
              selectedStep === 3
            }
          >
            <span>3</span>
            <p>{approveDelegationVdWethTxData.name}</p>
          </button>
        )}

        {actionTxData && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonActive: selectedStep === numberOfSteps,
              ActionsWrapper__buttonSubmitted: actionSubmitted,
              ActionsWrapper__buttonConfirmed: actionConfirmed,
              ActionsWrapper__buttonError:
                (!actionConfirmed && actionError) || (error && !actionConfirmed),
            })}
            onClick={() => unlockedSteps >= numberOfSteps && setSelectedStep(numberOfSteps)}
            disabled={actionConfirmed || !!actionError || selectedStep === numberOfSteps}
          >
            <span>{numberOfSteps}</span>
            <p>{actionTxData.name}</p>
          </button>
        )}

        {!!numberOfSteps && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonSubmitted: actionSubmitted,
              ActionsWrapper__buttonConfirmed: actionConfirmed,
              ActionsWrapper__buttonError:
                (!actionConfirmed && actionError) || (error && !actionConfirmed),
            })}
            onClick={() => unlockedSteps > numberOfSteps && setSelectedStep(numberOfSteps + 1)}
            disabled={true}
          >
            <span>{numberOfSteps + 1}</span>
            <p>
              {!actionError
                ? intl.formatMessage(actionSubmitted ? messages.pending : messages.finished)
                : intl.formatMessage(messages.failed)}
            </p>
          </button>
        )}
      </div>

      {children}

      {approveTxData && (approveConfirmed || approveSubmitted || !!approveError) && (
        <TxBottomStatusLine
          title={approveTxData.name}
          confirmed={approveConfirmed}
          submitted={approveSubmitted}
          failed={!!approveError}
          error={error && !approveConfirmed}
          txHash={approveTxData.txHash}
        />
      )}

      {approveDelegationTxData &&
        (approveDelegationConfirmed || approveDelegationSubmitted || !!approveDelegationError) && (
          <TxBottomStatusLine
            title={approveDelegationTxData.name}
            confirmed={approveDelegationConfirmed}
            submitted={approveDelegationSubmitted}
            failed={!!approveDelegationError}
            error={error && !approveDelegationConfirmed}
            txHash={approveDelegationTxData.txHash}
          />
        )}

      {approveDelegationVdWethTxData &&
        (approveDelegationVdWethConfirmed ||
          approveDelegationVdWethSubmitted ||
          !!approveDelegationVdWethError) && (
          <TxBottomStatusLine
            title={approveDelegationVdWethTxData.name}
            confirmed={approveDelegationVdWethConfirmed}
            submitted={approveDelegationVdWethSubmitted}
            failed={!!approveDelegationVdWethError}
            error={error && !approveDelegationVdWethConfirmed}
            txHash={approveDelegationVdWethTxData.txHash}
          />
        )}

      {actionTxData && (actionConfirmed || actionSubmitted || !!actionError) && (
        <TxBottomStatusLine
          title={actionTxData.name}
          confirmed={actionConfirmed}
          submitted={actionSubmitted}
          failed={!!actionError}
          error={error && !actionConfirmed}
          txHash={actionTxData.txHash}
        />
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .ActionsWrapper {
            width: 100%;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            display: flex;
            flex-direction: column;
            transition: $transition;
            margin-top: 20px;

            &__buttons {
              width: calc(100% + 1px);
              display: flex;
              border-right: 1px solid ${currentTheme.interface.divider};
              border-bottom: 1px solid ${currentTheme.interface.divider};
              border-radius: 50px;
            }

            &__button {
              display: flex;
              align-items: center;
              border-right: 1px solid ${currentTheme.interface.mainTable};
              color: ${currentTheme.text.main};
              justify-content: center;
              text-align: center;
              min-height: 20px;
              font-size: 10px;
              flex: 1;
              font-weight: 600;
              transition: $transition;
              cursor: default;
              padding: 6px 10px;
              background: ${currentTheme.interface.tableBorder};
              // white-space: nowrap;
              // text-overflow: ellipsis;
              // overflow: hidden;

              &:first-of-type {
                border-top-left-radius: 50px;
                border-bottom-left-radius: 50px;
              }

              &:last-of-type {
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
                border-right: none !important;
              }
              span,
              p {
                opacity: 0.8;
              }
              span {
                font-weight: 600;
                margin-right: 5px;
              }
            }

            &__buttonActive,
            &__buttonSubmitted,
            &__buttonConfirmed,
            &__buttonError {
              span,
              p {
                opacity: 1;
              }
            }

            &__submitted {
              // border: 1px solid ${currentTheme.brand.main};
            }
            &__confirmed {
              // border: 1px solid ${currentTheme.brand.main};
            }
            &__error {
              // border: 1px solid ${currentTheme.text.negative};
            }

            &__buttonAllowed {
              background: ${allowedGradient};
              color: ${currentTheme.white.hex};
              &:hover {
                background: ${activeGradient};
              }
            }

            &__buttonActive {
              background: ${currentTheme.brand.main};
              color: ${currentTheme.interface.mainTable};
            }

            &__buttonSubmitted {
              background: ${currentTheme.brand.main};
              color: ${currentTheme.interface.mainTable};
            }

            &__buttonConfirmed {
              background: ${currentTheme.brand.main};
              color: ${currentTheme.interface.mainTable};
            }

            &__buttonError {
              background: ${currentTheme.text.negative};
              color: ${currentTheme.interface.mainTable};
            }
          }
        `}
      </style>
    </div>
  );
}
