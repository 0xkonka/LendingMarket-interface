import { ChangeEvent, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext, SpinLoader } from 'aave-ui-kit';

import { FormattedTxErrorText } from 'ui-config';
import { TxStatusType } from 'helpers/send-ethereum-tx';
import Caption from 'components/basic/Caption';
import TextStatus from '../TextStatus';
import DotStatus from '../DotStatus';
import messages from './messages';
import { isEmpty } from 'helpers/utility';
import ContainedButton from 'components/basic/ContainedButton';
import OutlineButton from 'components/basic/OutlineButton';
import CopyIcon from 'icons/Copy';
import RadiantModal from 'components/basic/RadiantModal';
import ReturnBackIcon from 'icons/ReturnBack';
import BackIcon from 'icons/Back';

interface TxTopInfoProps {
  txStatus?: TxStatusType;
  title: string;
  description?: string;
  buttonTitle?: string;
  goToAfterSuccess?: string;
  successButtonTitle?: string;
  error?: boolean;
  loading?: boolean;
  failed?: string;
  mainTxFailedMessage?: string;
  numberOfSteps?: number;
  exceptionTxFailedMessages?: { error: string; message: string }[];
  onAfterSuccessClick?: (e: ChangeEvent) => void;
  previousStep?: () => void;
  initTxn?: () => void;
}

export default function TxTopInfo({
  txStatus,
  title,
  description,
  buttonTitle,
  goToAfterSuccess,
  successButtonTitle,
  loading,
  error,
  failed,
  numberOfSteps,
  mainTxFailedMessage,
  exceptionTxFailedMessages = [],
  onAfterSuccessClick = () => {},
  previousStep = () => {},
  initTxn = () => {},
}: TxTopInfoProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();

  const [isCopied, setIsCopied] = useState(false);
  const [isErrorReportVisible, setErrorReportVisible] = useState(false);
  const isErrorNeedToFormat = failed ? failed.search('{"') !== -1 : false;

  const txFailedErrorMessage = useMemo(() => {
    if (isEmpty(exceptionTxFailedMessages) || !failed) {
      return mainTxFailedMessage;
    }

    let errorMessage = mainTxFailedMessage;
    for (const exceptionTxFailedMessage of exceptionTxFailedMessages) {
      if (failed?.search(exceptionTxFailedMessage.error) !== -1) {
        errorMessage = exceptionTxFailedMessage.message;
      }
    }
    return errorMessage;
  }, [failed, mainTxFailedMessage, exceptionTxFailedMessages]);

  const handleCopied = () => {
    navigator.clipboard.writeText(failed || '').then(() => setIsCopied(true));
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="TxTopInfo">
      {!txStatus ? (
        <div
          className={classNames('TxTopInfo__inner', { TxTopInfo__errorInner: isErrorNeedToFormat })}
        >
          <div className="TxTopInfo__left-inner">
            <div className="TxTopInfo__title">
              {title} {isErrorNeedToFormat && `- ${intl.formatMessage(messages.error)}`}{' '}
              {error && <DotStatus error={error} />}
            </div>

            {description && !isErrorNeedToFormat && <span>{description}</span>}

            {isErrorNeedToFormat && <FormattedTxErrorText description={txFailedErrorMessage} />}
          </div>

          {!isErrorNeedToFormat && (
            <div className="TxTopInfo__right-inner">
              {!error ? (
                <div className="TxTopInfo__button-inner">
                  {loading && (
                    <SpinLoader color={currentTheme.lightBlue.hex} className="TxTopInfo__spinner" />
                  )}
                  <ContainedButton
                    type="submit"
                    size="small"
                    className="TxTopInfo__button"
                    disabled={loading}
                  >
                    {buttonTitle || intl.formatMessage(messages.submit)}
                  </ContainedButton>
                  <OutlineButton
                    size="small"
                    color="third"
                    className="TxTopInfo__button__Reset"
                    onClick={() => initTxn()}
                  >
                    {intl.formatMessage(messages.reset)}
                  </OutlineButton>
                </div>
              ) : (
                <OutlineButton
                  size="small"
                  color="third"
                  className="TxTopInfo__button"
                  onClick={history.goBack}
                >
                  {intl.formatMessage(messages.goBack)}
                </OutlineButton>
              )}
            </div>
          )}

          {isErrorNeedToFormat && (
            <div className="TxTopInfo__error-buttons">
              <div className="TxTopInfo__error-buttons__left">
                <OutlineButton
                  onClick={() => handleCopied()}
                  size="small"
                  color="third"
                  className="TxTopInfo__error-button"
                >
                  <CopyIcon />
                  {'  '}
                  {intl.formatMessage(isCopied ? messages.copied : messages.copyError)}
                </OutlineButton>
                <OutlineButton
                  className="TxTopInfo__showError-button"
                  size="small"
                  color="third"
                  onClick={() => setErrorReportVisible(true)}
                >
                  {intl.formatMessage(messages.showError)}
                </OutlineButton>
              </div>
              <div className="TxTopInfo__error-buttons__right">
                <OutlineButton
                  size="small"
                  color="third"
                  className="TxTopInfo__button"
                  onClick={() => previousStep()}
                >
                  <BackIcon height={12} width={12} />
                  {'  '}
                  {intl.formatMessage(messages.goBack)}
                </OutlineButton>
                <OutlineButton
                  size="small"
                  color="third"
                  className="TxTopInfo__button"
                  onClick={() => initTxn()}
                >
                  <ReturnBackIcon width={16} height={16} />
                  {'  '}
                  {intl.formatMessage(messages.reset)}
                </OutlineButton>
              </div>
            </div>
          )}
        </div>
      ) : (
        <TextStatus
          txStatus={txStatus}
          submitted={txStatus === TxStatusType.submitted}
          successButtonTitle={successButtonTitle}
          goToAfterSuccess={goToAfterSuccess}
          numberOfSteps={numberOfSteps}
          onAfterSuccessClick={onAfterSuccessClick}
        />
      )}

      {isErrorNeedToFormat && failed && (
        <RadiantModal
          isVisible={isErrorReportVisible}
          onBackdropPress={() => setErrorReportVisible(false)}
          withCloseButton={true}
          className="TxTopInfo__modal"
        >
          <div className="TxTopInfo__modal-content">
            <Caption color="purple" title={intl.formatMessage(messages.errorReport)} />
            <div className="TxTopInfo__errorReport-text">{failed}</div>
            <div className="TxTopInfo__modal-button-inner">
              <ContainedButton
                size="small"
                onClick={() => {
                  setErrorReportVisible(false);
                  navigator.clipboard.writeText(failed || '');
                }}
                className="TxTopInfo__error-button"
              >
                <CopyIcon /> {intl.formatMessage(messages.copyErrorAndClose)}
              </ContainedButton>
            </div>
          </div>
        </RadiantModal>
      )}

      <style jsx={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .TxTopInfo {
          padding: 20px;
          color: ${currentTheme.text.main};

          &__modal {
            max-width: 600px;
          }

          &__inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          &__errorInner {
            display: block;
            .TxTopInfo__left-inner {
              margin-right: 0;
              .TxTopInfo__title {
                color: ${currentTheme.brand.main};
              }
            }
          }

          &__left-inner {
            flex: 1;
            margin-right: 15px;
            text-align: left;
            .TxTopInfo__title {
              font-size: $fontSizeRegular;
              font-weight: 600;
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 5px;
              color: ${currentTheme.text.offset1};

              .DotStatus {
                margin-right: 5px;
              }
            }
            span {
              font-size: $fontSizeSmall;
              font-weight: 400;
              word-break: break-word;
            }
          }

          &__right-inner {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          &__button-inner {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          &__spinner {
            margin-right: 10px;
          }

          &__error-buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            gap: 8px;

            &__left {
              display: flex;
              align-items: center;
              gap: 10px;
            }

            &__right {
              display: flex;
              align-items: center;
              gap: 10px;
            }
          }

          .TxTopInfo__button,
          .TxTopInfo__error-button {
            padding-left: 10px;
            padding-right: 10px;
            min-height: 12px;
            font-size: $fontSizeMedium;
          }

          .TxTopInfo__error-button {
            @include respond-to(xl) {
              font-size: $fontSizeXSmall;
            }

            .Button__wrapper {
              flex-direction: row-reverse;
              img {
                margin-left: 10px;
                width: 15px;
                height: 16px;
                @include respond-to(xl) {
                  width: 13px;
                  height: 14px;
                }
              }
            }
          }

          &__showError-button {
            font-size: $fontSizeMedium;
            margin-left: 20px;
            transition: $transition;
            color: ${currentTheme.text.negative};
            &:hover {
              opacity: 0.7;
            }
          }

          &__modal-content {
            .Caption {
              margin-bottom: 20px;
              h2 {
                margin-bottom: 0;
              }
            }
          }
          &__errorReport-text {
            margin-bottom: 50px;
            margin-top: 20px;
            padding: 20px 15px;
            font-size: $fontSizeMedium;
            word-break: break-word;
            background: ${currentTheme.interface.mainTable};
            color: ${currentTheme.text.main};
          }

          &__modal-button-inner {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .DefaultButton {
              width: 160px;
              min-height: 40px;
              font-size: $fontSizeMedium;
              @include respond-to(xl) {
                font-size: $fontSizeSmall;
              }
              @include respond-to(lg) {
                font-size: $fontSizeXSmall;
                width: 120px;
                min-height: 30px;
              }
              @include respond-to(md) {
                width: 160px;
                min-height: 40px;
                font-size: $fontSizeSmall;
              }
              .Button__wrapper {
                flex-direction: row-reverse;
                img {
                  margin-left: 7px;
                  width: 15px;
                  height: 16px;
                  @include respond-to(xl) {
                    margin-left: 15px;
                  }
                  @include respond-to(lg) {
                    width: 11px;
                    height: 12px;
                    margin-left: 8px;
                  }
                  @include respond-to(md) {
                    width: 15px;
                    height: 16px;
                    margin-left: 15px;
                  }
                }
              }
            }
          }
        }

        .TxTopInfo__modal.ReactModal__Content {
          padding: 50px 15px !important;
          @include respond-to(xl) {
            padding: 40px 10px !important;
          }
          @include respond-to(lg) {
            padding: 30px 10px !important;
          }
          @include respond-to(md) {
            padding: 40px 10px !important;
          }
        }
      `}</style>
      <style jsx={true} global={true}>{`
        .TxTopInfo {
          &__error-buttons {
            .OutlineButton__small {
              min-width: 150px;
            }
          }
          &__button__Reset {
            font-weight: 600 !important;
            font-size: 11px !important;
            line-height: 15px !important;
            padding: 6px 12px !important;
          }

          &__errorInner {
            .TxTopInfo__left-inner {
              .TxTopInfo__title {
                color: ${currentTheme.purple.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
