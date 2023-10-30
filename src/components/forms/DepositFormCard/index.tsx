import { useEffect, useState } from 'react';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { getAssetInfo, useThemeContext } from 'aave-ui-kit';
import { valueToBigNumber, EthereumTransactionTypeExtended } from '@aave/protocol-js';
import { BigNumber } from '@aave/protocol-js';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { ComputedReserveData, UserSummary } from 'libs/pool-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import RiskBar, { Action } from 'components/basic/RiskBar';
import AmountField from 'components/fields/AmountField';
import ConnectButton from 'components/ConnectButton';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useTxBuilderContext } from 'libs/tx-provider';
import { getReferralCode } from 'libs/referral-handler';
import { isEmpty } from 'helpers/utility';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import GradientButton from 'components/basic/GradientButton';
import CheckIcon from 'icons/Check';
import ProgressIcon from 'icons/Progress';
import messages from './messages';

interface DepositFormCardProps {
  currencySymbol: string;
  walletBalance: BigNumber;
  user?: UserSummary;
  poolReserve?: ComputedReserveData;
}

export default function DepositFormCard({
  currencySymbol,
  walletBalance,
  user,
  poolReserve,
}: DepositFormCardProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { networkConfig } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txs, setTxs] = useState<EthereumTransactionTypeExtended[]>([]);

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  if (maxAmountToDeposit.gt(0) && poolReserve?.symbol.toUpperCase() === networkConfig.baseAsset) {
    maxAmountToDeposit = maxAmountToDeposit.minus('0.001');
  }
  if (maxAmountToDeposit.lte(0)) {
    maxAmountToDeposit = valueToBigNumber('0');
  }
  const maxAmount = maxAmountToDeposit.toString(10);

  const handleAmountChange = (newAmount: string) => {
    const newAmountValue = valueToBigNumber(newAmount);
    setError('');
    if (maxAmount && newAmountValue.gt(maxAmount)) {
      setAmount(maxAmount as string);
      return;
    }

    if (newAmountValue.isNegative()) {
      setAmount('0');
      return;
    }

    if (newAmount !== amount) {
      setAmount(newAmount);
      return;
    }
  };

  const handleMaxButtonClick = () => {
    setAmount(maxAmount as string);
    setError('');
  };

  const handleGetTransactions = async () => {
    const txs = await lendingPool.deposit({
      user: user?.id || '',
      reserve: poolReserve?.underlyingAsset || '',
      amount: amount.toString(),
      referralCode: getReferralCode(),
    });
    setTxs(txs);
  };

  useEffect(() => {
    if (!valueToBigNumber(amount).gt(0) || !user) {
      setTxs([]);
      setStep(0);
      return;
    }

    handleGetTransactions();
  }, [amount]);

  const transactionHandler = (transaction: EthereumTransactionTypeExtended) => {
    setProgress(true);
    sendEthTransaction(transaction.tx, provider, () => {}, null, {
      onConfirmation: () => {
        setStep((prev) => prev + 1);
        setProgress(false);
        // show success button for 2 seconds
        if (step === txs.length - 1) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        }
        if (transaction.txType === 'DLP_ACTION') {
          setAmount('0');
        }
      },
      onError: () => {
        setProgress(false);
      },
    });
  };

  return (
    <div className="DepositFormCard">
      <p className="DepositFormCard__description">{intl.formatMessage(messages.description)}</p>

      <div className="DepositFormCard__container">
        <div className="DepositFormCard__inner">
          <AmountField
            title={intl.formatMessage(messages.availableSymbol, {
              symbol: getAssetInfo(currencySymbol).formattedName || currencySymbol,
            })}
            maxAmount={maxAmount}
            symbol={currencySymbol}
            maxDecimals={poolReserve?.decimals}
            value={amount}
            onChange={handleAmountChange}
            onMaxButtonClick={handleMaxButtonClick}
            error={error}
          />
          {Number(maxAmountToDeposit) ? (
            <RiskBar
              value={Number(amount)}
              action={Action.DEPOSIT}
              onChange={handleAmountChange}
              maxAmount={maxAmount as string}
              currencySymbol={currencySymbol}
            />
          ) : null}
        </div>

        <div className="DepositFormCard__action-container">
          {!currentAccount ? (
            <ConnectButton className="DepositFormCard__button" />
          ) : isEmpty(txs) ? (
            <GradientButton disabled color="grey" className="DepositFormCard__button">
              {intl.formatMessage(isSuccess ? messages.success : messages.deposit)}
            </GradientButton>
          ) : (
            <div className="DepositFormCard__button-container">
              {txs.map((tx, index) => {
                const txName = tx.txType === 'ERC20_APPROVAL' ? 'Approve' : 'Deposit';
                const disabled = index !== step;
                return (
                  <>
                    {!disabled && (
                      <GradientButton
                        key={index}
                        className={classNames('DepositFormCard__button')}
                        onClick={() => transactionHandler(tx)}
                        color={disabled || progress ? 'grey' : 'primary'}
                        disabled={disabled || progress}
                      >
                        {progress ? (
                          <>
                            <ProgressIcon /> {intl.formatMessage(messages.loading)}
                          </>
                        ) : txName === 'Approve' ? (
                          <>
                            {intl.formatMessage(messages.approve)}{' '}
                            <CheckIcon color={currentTheme.text.positive} />
                          </>
                        ) : (
                          intl.formatMessage(messages.deposit)
                        )}
                      </GradientButton>
                    )}
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .DepositFormCard {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;

            &__container {
              display: flex;
              width: 100%;
              gap: 58px;
            }

            &__inner {
              display: flex;
              flex-direction: column;
              max-width: 344px;
              gap: 10px;
              width: 100%;
            }

            &__action-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              padding-top: 30px;
            }

            &__button-container {
              display: flex;
              align-items: center;
            }

            &__button {
              padding: 8px;
              width: 150px;
              background: ${isCurrentThemeDark
                ? 'rgb(71,81,103, 0.25)'
                : currentTheme.interface.offset1};
              color: ${currentTheme.text.offset2};
              border: ${isCurrentThemeDark ? 'none' : '1px solid'};
              border-color: ${isCurrentThemeDark ? 'none' : currentTheme.text.offset4};

              &:hover {
                color: ${currentTheme.text.main};
              }
            }

            &__description {
              font-size: 12px;
              font-weight: 600;
              color: ${currentTheme.text.offset1};
            }
          }
        `}
      </style>
    </div>
  );
}
