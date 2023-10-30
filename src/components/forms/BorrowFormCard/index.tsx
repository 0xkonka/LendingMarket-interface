import { useEffect, useState } from 'react';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useThemeContext } from 'aave-ui-kit';
import { valueToBigNumber, EthereumTransactionTypeExtended, InterestRate } from '@aave/protocol-js';
import { BigNumber } from '@aave/protocol-js';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { CHAIN_INFO, CHAINS, CHAIN_ID_TO_NETWORK } from 'ui-config/chains';
import { ComputedReserveData, UserSummary } from 'libs/pool-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useTxBuilderContext } from 'libs/tx-provider';
import { getReferralCode } from 'libs/referral-handler';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { StargateBorrowContract } from 'libs/aave-protocol-js/StargateBorrow/StargateBorrowContract';
import RiskBar, { Action } from 'components/basic/RiskBar';
import AmountField from 'components/fields/AmountField';
import SelectChainField from 'components/fields/SelectChainField';
import ConnectButton from 'components/ConnectButton';
import { isEmpty } from 'helpers/utility';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';
import { getNetworkConfig, getProvider } from 'helpers/config/markets-and-network-config';
import GradientButton from 'components/basic/GradientButton';
import CheckIcon from 'icons/Check';
import ProgressIcon from 'icons/Progress';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import CompactNumber from 'components/basic/CompactNumber';
import messages from './messages';

interface BorrowFormCardProps {
  currencySymbol: string;
  user?: UserSummary;
  poolReserve?: ComputedReserveData;
}

export default function BorrowFormCard({ currencySymbol, user, poolReserve }: BorrowFormCardProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const { currentMarketData, chainId } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const config = getNetworkConfig(chainId);

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txs, setTxs] = useState<EthereumTransactionTypeExtended[]>([]);
  const defaultNetwork = CHAIN_ID_TO_NETWORK[chainId] as any;
  const [selectChainId, setSelectChainId] = useState(
    defaultNetwork?.chainId || CHAIN_INFO.arbitrum.chainId
  );
  const [chainSelectVisible, setChainSelectVisible] = useState(false);

  const { requiredRdntToClaim, lockedValue } = useVestHandler();

  const maxUserAmountToBorrow = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  ).div(poolReserve?.priceInMarketReferenceCurrency || '1');
  let maxAmountToBorrow = BigNumber.max(
    BigNumber.min(poolReserve?.availableLiquidity || '', maxUserAmountToBorrow),
    0
  );
  if (
    maxAmountToBorrow.gt(0) &&
    user?.totalBorrowsMarketReferenceCurrency !== '0' &&
    maxUserAmountToBorrow.lt(
      valueToBigNumber(poolReserve?.availableLiquidity || '0').multipliedBy('1.01')
    )
  ) {
    maxAmountToBorrow = maxAmountToBorrow.multipliedBy('0.99');
  }
  const maxAmount = maxAmountToBorrow.toString(10);

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
    const destNetwork = CHAIN_ID_TO_NETWORK[chainId] as any;
    const userId = user?.id || '';

    if (chainId !== destNetwork.chainId && false) {
      const stargateBorrowContract = new StargateBorrowContract(
        getProvider(chainId),
        currentMarketData.addresses.stargateBorrow
      );

      const quoteData = await stargateBorrowContract.quoteLayerZeroSwapFee(
        chainId || CHAIN_INFO.arbitrum.chainId,
        userId
      );
      const borrowValue = quoteData[0].toString();
      const assetAddress = poolReserve?.underlyingAsset || '';
      const debtTokenAddress = poolReserve?.variableDebtTokenAddress || '';

      return await stargateBorrowContract.borrow(
        userId,
        assetAddress,
        debtTokenAddress,
        amount.toString(),
        chainId || CHAIN_INFO.arbitrum.chainId,
        borrowValue
      );
    }

    const interestRateMode = InterestRate.Variable;
    const txs = await lendingPool.borrow({
      interestRateMode,
      referralCode: getReferralCode(),
      user: user?.id || '',
      amount: amount.toString(),
      reserve: poolReserve?.underlyingAsset || '',
      debtTokenAddress: poolReserve?.variableDebtTokenAddress || '',
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
      // when user rejects the transaction
      onError: () => {
        setProgress(false);
      },
    });
  };

  return (
    <div className="BorrowFormCard">
      <p className="BorrowFormCard__description">{intl.formatMessage(messages.description)}</p>

      <div className="BorrowFormCard__container">
        <div className="BorrowFormCard__inner">
          <AmountField
            title={intl.formatMessage(messages.availableToBorrow)}
            maxAmount={maxAmount}
            symbol={currencySymbol}
            maxDecimals={poolReserve?.decimals}
            value={amount}
            onChange={handleAmountChange}
            onMaxButtonClick={handleMaxButtonClick}
            error={error}
          />
          {Number(maxAmount) ? (
            <RiskBar
              value={Number(amount)}
              action={Action.BORROW}
              onChange={handleAmountChange}
              maxAmount={maxAmount as string}
              currencySymbol={currencySymbol}
            />
          ) : null}

          {CHAIN_ID_TO_NETWORK[chainId].availableTokens.includes(currencySymbol) &&
            import.meta.env.VITE_ENABLE_X_CHAIN_BORROW === 'true' &&
            false && (
              <div className="BorrowFormCard__select">
                <p className="BorrowFormCard__select-label">
                  {intl.formatMessage(messages.sendTo)}
                </p>

                <SelectChainField
                  className="BorrowFormCard__select-field"
                  visible={chainSelectVisible}
                  setVisible={setChainSelectVisible}
                  placeholder={intl.formatMessage(messages.selectChain)}
                  value={CHAIN_ID_TO_NETWORK[selectChainId]}
                >
                  {CHAINS.filter((chain) => chain.isTestnet === config.isTestnet).map((item) => (
                    <button
                      className="BorrowFormCard__select-button"
                      type="button"
                      onClick={() => {
                        setSelectChainId(item.chainId);
                        setChainSelectVisible(false);
                      }}
                      disabled={
                        selectChainId === item.chainId ||
                        !item.availableTokens.includes(currencySymbol)
                      }
                      key={item.chainId}
                    >
                      {typeof item.image === 'string' ? (
                        <img src={item.image} alt="network-icon" />
                      ) : (
                        <item.image className="network-icon" />
                      )}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </SelectChainField>
              </div>
            )}
        </div>

        <div className="BorrowFormCard__auto">
          <div className="BorrowFormCard__auto-description">
            <p>{intl.formatMessage(messages.requiredLockForEmissions)}</p>
            <strong>
              {'$'}
              <CompactNumber
                value={lockedValue}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </strong>
          </div>
          <div className="BorrowFormCard__auto-description">
            <p>{intl.formatMessage(messages.yourLockedValue)}</p>
            <strong>
              {'$'}
              <CompactNumber
                value={requiredRdntToClaim}
                maximumFractionDigits={2}
                minimumFractionDigits={0}
                showFullNum={false}
              />
            </strong>
          </div>
          {/* <div className="BorrowFormCard__auto-check">
            <CheckBoxField
              value={isAutoBorrow}
              name=""
              onChange={() => {
                setIsAutoBorrow(!isAutoBorrow);
              }}
            />
            <p>
              Automatically borrow and Zap into Locked LP to ensure you stay eligible for RDNT
              rewards
            </p>
          </div> */}
        </div>

        <div className="BorrowFormCard__action-container">
          {/* <StepProgress steps={txs.length} step={step} /> */}
          {!currentAccount ? (
            <ConnectButton className="BorrowFormCard__button" />
          ) : isEmpty(txs) ? (
            <GradientButton disabled color="grey" className="BorrowFormCard__button">
              {intl.formatMessage(isSuccess ? messages.success : messages.borrow)}
            </GradientButton>
          ) : (
            <div className="BorrowFormCard__button-container">
              {txs.map((tx, index) => {
                const txName = tx.txType === 'ERC20_APPROVAL' ? 'Approve' : 'Borrow';
                const disabled = index !== step;
                return (
                  <>
                    {!disabled && (
                      <GradientButton
                        key={index}
                        className={classNames('BorrowFormCard__button')}
                        onClick={() => transactionHandler(tx)}
                        color={disabled || progress ? 'grey' : 'primary'}
                        disabled={disabled || progress}
                      >
                        {progress ? (
                          <>
                            <ProgressIcon /> {intl.formatMessage(messages.progress)}
                          </>
                        ) : txName === 'Approve' ? (
                          <>
                            {intl.formatMessage(messages.approve)} <CheckIcon color="#FFF" />
                          </>
                        ) : (
                          intl.formatMessage(messages.borrow)
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

          .BorrowFormCard {
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

            &__auto {
              display: flex;
              flex-direction: column;
              max-width: 344px;
              padding-top: 25px;

              p {
                font-family: 'PP Mori';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 17px;
                color: ${currentTheme.text.offset2};
              }

              strong {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                text-align: right;
                color: ${currentTheme.text.main};
              }

              &-description {
                display: flex;
                justify-content: space-between;
                gap: 25px;
                margin-bottom: 8px;
              }

              &-check {
                display: flex;
                margin-top: 8px;
                gap: 10px;

                input {
                  opacity: 1;
                  width: 20px;
                  height: 20px;
                }
              }
            }

            &__action-container {
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              padding-bottom: 60px;
              gap: 10px;
            }

            &__button-container {
              display: flex;
              align-items: center;
              gap: 20px;
            }

            &__button {
              padding: 8px;
              width: 150px;
              background: ${isCurrentThemeDark
                ? 'rgb(71,81,103, 0.25)'
                : currentTheme.interface.offset1};
              color: ${currentTheme.text.offset1};
              border: ${isCurrentThemeDark ? 'none' : '1px solid'};

              &:hover {
                color: ${currentTheme.text.main};
              }
            }

            &__description {
              font-size: 12px;
              font-weight: 600;
              color: ${currentTheme.text.offset1};
            }

            &__select-label {
              font-size: 12px;
              color: ${currentTheme.text.offset2};
              margin-bottom: 5px;
            }

            &__select-button {
              display: flex;
              align-items: center;
              font-size: 16px;
              padding: 10px;

              img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: contain;
                margin-right: 10px;
              }

              .network-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: contain;
                margin-right: 10px;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
