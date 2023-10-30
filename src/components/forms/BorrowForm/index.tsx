import { FormEvent, ReactNode, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';
import { ChainId } from '@radiantcapital/contract-helpers';
import { valueToBigNumber, EthereumTransactionTypeExtended } from '@aave/protocol-js';

import { CHAIN_INFO, CHAINS, CHAIN_ID_TO_NETWORK } from 'ui-config/chains';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import TxEstimation from 'components/TxEstimation';
import AmountField from 'components/fields/AmountField';
import SelectChainField from 'components/fields/SelectChainField';
import GradientButton from 'components/basic/GradientButton';
import RiskBar, { Action } from 'components/basic/RiskBar';
import ConnectButton from 'components/ConnectButton';
import { getNetworkConfig } from 'helpers/config/markets-and-network-config';
import messages from './messages';
import LAYER_ZERO from 'images/icon/LayerZero';

interface BorrowFormProps {
  title?: string;
  description?: string | ReactNode;
  maxAmount?: string | number;
  amountFieldTitle?: string;
  currencySymbol: string;
  onSubmit: (amount: string, chainId: number, max?: boolean) => void;
  withRiskBar?: boolean;
  submitButtonTitle?: string;
  absoluteMaximum?: boolean;
  className?: string;
  maxDecimals?: number;
  warning?: ReactNode;
  children?: ReactNode;
  getTransactionData?: (
    user: string
  ) => () => Promise<EthereumTransactionTypeExtended[]> | EthereumTransactionTypeExtended[];
}

export default function BorrowForm({
  title,
  description,
  maxAmount,
  amountFieldTitle,
  currencySymbol,
  onSubmit,
  withRiskBar,
  submitButtonTitle,
  absoluteMaximum,
  className,
  maxDecimals,
  warning,
  children,
  getTransactionData,
}: BorrowFormProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { chainId } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const config = getNetworkConfig(chainId);

  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const [amount, setAmount] = useState('');
  const defaultNetwork = CHAIN_ID_TO_NETWORK[chainId] as any;
  const [selectChainId, setSelectChainId] = useState(
    defaultNetwork?.chainId || CHAIN_INFO.arbitrum.chainId
  );
  const [chainSelectVisible, setChainSelectVisible] = useState(false);
  const [error, setError] = useState('');

  const handleAmountChange = useCallback(
    (newAmount: string) => {
      const newAmountValue = valueToBigNumber(newAmount);
      setError('');
      if (maxAmount && newAmountValue.gt(maxAmount)) {
        setAmount(maxAmount as string);
        return setIsMaxSelected(true);
      } else if (newAmountValue.isNegative()) {
        setAmount('0');
      } else {
        setAmount(newAmount);
      }
      setIsMaxSelected(false);
    },
    [maxAmount, setAmount, setIsMaxSelected]
  );

  const handleMaxButtonClick = useCallback(() => {
    setAmount(maxAmount as string);
    setIsMaxSelected(true);
    setError('');
  }, [maxAmount, setAmount, setIsMaxSelected, setError]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valueToBigNumber(amount).isNaN() && +amount !== 0) {
      return onSubmit(amount, selectChainId, absoluteMaximum && isMaxSelected);
    }

    setError(intl.formatMessage(messages.error));
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('BorrowForm', className)}>
      <h2 className="BorrowForm__title">{title}</h2>

      <p className="BorrowForm__description">{description}</p>

      <div className="BorrowForm__container">
        {children}

        <AmountField
          title={amountFieldTitle}
          maxAmount={maxAmount}
          symbol={currencySymbol}
          maxDecimals={maxDecimals}
          value={amount}
          onChange={handleAmountChange}
          onMaxButtonClick={handleMaxButtonClick}
          error={error}
        />

        {[ChainId.mainnet].includes(chainId) && getTransactionData && (
          <TxEstimation getTransactionsData={getTransactionData} amount={amount} />
        )}

        {withRiskBar && (
          <RiskBar
            value={Number(amount)}
            action={Action.BORROW}
            onChange={handleAmountChange}
            maxAmount={maxAmount as string}
            currencySymbol={currencySymbol}
          />
        )}

        {CHAIN_ID_TO_NETWORK[chainId].availableTokens.includes(currencySymbol) &&
          import.meta.env.VITE_ENABLE_X_CHAIN_BORROW === 'true' && (
            <div className="BorrowForm__select">
              <p className="BorrowForm__select-label">{intl.formatMessage(messages.selectLabel)}</p>

              <SelectChainField
                className="BorrowForm__select-field"
                visible={chainSelectVisible}
                setVisible={setChainSelectVisible}
                placeholder={intl.formatMessage(messages.selectChain)}
                value={CHAIN_ID_TO_NETWORK[selectChainId]}
              >
                {CHAINS.filter(
                  (chain) =>
                    chain.isTestnet === config.isTestnet &&
                    chain.availableTokens.includes(currencySymbol)
                ).map((item) => (
                  <button
                    className="BorrowForm__select-button"
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

              <div className="BorrowForm__xchain-desc">
                <p>{intl.formatMessage(messages.poweredBy)}</p>
                <LAYER_ZERO />
                <a href="https://docs.radiant.capital/" target="_blank" rel="noreferrer">
                  {intl.formatMessage(messages.learnMore)}
                </a>
              </div>
            </div>
          )}

        {!!warning && <div className="BorrowForm__warning">{warning}</div>}
      </div>

      {!currentAccount ? (
        <ConnectButton />
      ) : (
        <GradientButton fullWidth type="submit">
          {submitButtonTitle || intl.formatMessage(messages.continue)}
        </GradientButton>
      )}

      <style jsx={true} global={true}>
        {`
          @import 'src/_mixins/variables';
          @import 'src/_mixins/screen-size';

          .BorrowForm {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: $maxFormWidth;

            &__title {
              font-size: 18px;
              font-weight: 600;
              color: ${currentTheme.text.main};
            }

            &__description {
              width: 100%;
              font-size: 14px;
              color: ${currentTheme.text.main};
              margin-bottom: 10px;
            }

            &__container {
              display: flex;
              flex-direction: column;
              width: 100%;
              gap: 20px;
            }

            &__warning {
              margin: 0 auto;
              text-align: center;
              font-size: $fontSizeMedium;
            }

            &__select {
              p {
                font-size: 16px;
              }
            }

            &__select-label {
              font-size: 12px;
              margin-bottom: 5px;
              color: ${currentTheme.text.main};
            }

            &__select-button {
              display: flex;
              align-items: center;
              font-size: 16px;
              padding: 10px;
              cursor: pointer;
              color: ${currentTheme.text.main};

              &:hover {
                background-color: rgba(71, 81, 103, 0.25);
              }

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

            &__xchain-desc {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              gap: 10px;
              margin-top: 20px;
              color: ${currentTheme.text.main};
              p {
                font-size: 12px;
              }
              a {
                font-size: 12px;
                color: ${currentTheme.text.main};
              }
            }
          }
        `}
      </style>
    </form>
  );
}
