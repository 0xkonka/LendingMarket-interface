import { FormEvent, useCallback, useState, useMemo, useEffect } from 'react';
import { ethers } from 'ethers';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import { CHAIN_INFO, CHAINS, CHAIN_ID_TO_NETWORK } from 'ui-config/chains';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import { RadiantOFTContract } from 'libs/aave-protocol-js/RadiantOFT/RadiantOFTContract';
import { useRdntBalanceContext } from 'libs/wallet-balance-provider/RdntBalanceProvider';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { TokenIcon } from 'helpers/config/assets-config';
import { getProvider, getNetworkConfig } from 'helpers/config/markets-and-network-config';
import AmountField from 'components/fields/AmountField';
import CompactNumber from 'components/basic/CompactNumber';
import PoolTxConfirmationView from 'components/PoolTxConfirmationView';
import ConnectButton from 'components/ConnectButton';
import GradientButton from 'components/basic/GradientButton';
import SelectChainField from 'components/fields/SelectChainField';
import messages from './messages';

interface BridgeFormProps {
  className?: string;
}

const AMOUNT_MIN = '1';

export default function BridgeForm({ className }: BridgeFormProps) {
  const intl = useIntl();
  const { user } = useDynamicPoolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { walletBalance } = useRdntBalanceContext();
  const { currentTheme } = useThemeContext();

  const config = useMemo(() => getNetworkConfig(chainId), [chainId]);

  const [isConfirm, setIsConfirm] = useState(false);
  const [fee, setFee] = useState('0');
  const [formData, setFormData] = useState({
    amount: AMOUNT_MIN,
  });
  const [errors, setErrors] = useState({
    amount: '',
  });
  const [toChainSelectVisible, setToChainSelectVisible] = useState(false);
  const [toChainId, setToChainId] = useState(
    config.isTestnet
      ? CHAIN_ID_TO_NETWORK[chainId].chainId !== CHAIN_INFO.arbitrumGoerli.chainId
        ? CHAIN_INFO.arbitrumGoerli.chainId
        : CHAIN_INFO.bscTest.chainId
      : CHAIN_ID_TO_NETWORK[chainId].chainId !== CHAIN_INFO.arbitrum.chainId
      ? CHAIN_INFO.arbitrum.chainId
      : CHAIN_INFO.bsc.chainId
  );

  const inputHandler = useCallback(
    (key: string, maxValue: string, minValue: string) => (value: string) => {
      if (maxValue && parseFloat(value) > parseFloat(maxValue)) {
        value = maxValue;
      }

      if (minValue && parseFloat(value) < parseFloat(minValue)) {
        setErrors((prev) => ({
          ...prev,
          [key]: `This field should be more than ${minValue}`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [key]: '',
        }));
      }

      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFormData, setErrors]
  );

  const handleMaxButtonClick = useCallback(
    (key: string, maxValue: string) => () => {
      setFormData((prev) => ({
        ...prev,
        [key]: maxValue,
      }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (parseFloat(formData.amount) <= 0) {
        setErrors((prev) => ({
          ...prev,
          amount: 'Please input the correct amount',
        }));
        return;
      }

      setIsConfirm(true);
    },
    [errors, formData, setIsConfirm, setErrors]
  );

  useEffect(() => {
    (async () => {
      try {
        const radiantOFTContract = new RadiantOFTContract(
          getProvider(chainId),
          currentMarketData.addresses.rdntToken
        );

        const userId = user?.id || '';
        const fees = await radiantOFTContract.estimateSendFee(
          toChainId || CHAIN_INFO.arbitrum.chainId,
          formData.amount,
          userId
        );
        const fee = ethers.utils.formatUnits(fees[0]);
        setFee(fee);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [toChainId, formData.amount]);

  const handleGetTransactions = useCallback(async () => {
    const radiantOFTContract = new RadiantOFTContract(
      getProvider(chainId),
      currentMarketData.addresses.rdntToken
    );

    const userId = user?.id || '';
    const fees = await radiantOFTContract.estimateSendFee(
      toChainId || CHAIN_INFO.arbitrum.chainId,
      formData.amount,
      userId
    );
    const fee = fees[0].toString();

    return await radiantOFTContract.bridge(userId, toChainId, formData.amount, fee);
  }, [user, toChainId, formData]);

  useEffect(() => {
    setToChainId(
      config.isTestnet
        ? CHAIN_ID_TO_NETWORK[chainId].chainId !== CHAIN_INFO.arbitrumGoerli.chainId
          ? CHAIN_INFO.arbitrumGoerli.chainId
          : CHAIN_INFO.bscTest.chainId
        : CHAIN_ID_TO_NETWORK[chainId].chainId !== CHAIN_INFO.arbitrum.chainId
        ? CHAIN_INFO.arbitrum.chainId
        : CHAIN_INFO.bsc.chainId
    );
  }, [chainId]);

  const handleMainTxExecuted = () => {};

  return (
    <div className={classNames('BridgeForm', className)}>
      {!isConfirm ? (
        <form onSubmit={handleSubmit} className="BridgeForm__inner">
          <div className="BridgeForm__container">
            <div className="BridgeForm__info-amount">
              <p className="BridgeForm__info-amount__label">{intl.formatMessage(messages.title)}</p>
              <div className="BridgeForm__value">
                <TokenIcon tokenSymbol={'rdnt'} height={15} width={15} />
                <CompactNumber value={walletBalance.toString()} showFullNum />
              </div>
            </div>
            <AmountField
              maxAmount={walletBalance.toString()}
              symbol={'RDNT'}
              maxDecimals={18}
              value={formData.amount}
              onChange={inputHandler('amount', walletBalance.toString(), AMOUNT_MIN)}
              onMaxButtonClick={handleMaxButtonClick('amount', walletBalance.toString())}
              error={errors.amount}
            />

            <p className="BridgeForm__sendTo">{intl.formatMessage(messages.toChain)}</p>

            <SelectChainField
              className="BridgeForm__select-field"
              visible={toChainSelectVisible}
              setVisible={setToChainSelectVisible}
              placeholder={intl.formatMessage(messages.selectChain)}
              value={CHAIN_ID_TO_NETWORK[toChainId]}
            >
              {CHAINS.filter(
                (chain) =>
                  chain.isTestnet === config.isTestnet &&
                  chain.rdntBridgingEnabled === true &&
                  chain.chainId !== CHAIN_ID_TO_NETWORK[chainId].chainId
              ).map((item) => (
                <button
                  className="BridgeForm__select-button"
                  type="button"
                  onClick={() => {
                    setToChainId(item.chainId);
                    setToChainSelectVisible(false);
                  }}
                  disabled={CHAIN_ID_TO_NETWORK[chainId].chainId === item.chainId}
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

          <div className="BridgeForm__info-container">
            <div className="BridgeForm__row">
              <p className="BridgeForm__label">{intl.formatMessage(messages.fee)}</p>
              <div className="BridgeForm__value">
                <TokenIcon tokenSymbol={'rdnt'} height={15} width={15} />
                <CompactNumber value={fee} minimumFractionDigits={4} maximumFractionDigits={6} />
              </div>
            </div>
          </div>

          {currentAccount ? (
            <GradientButton type="submit" size="big" fullWidth>
              {intl.formatMessage(messages.title)}
            </GradientButton>
          ) : (
            <ConnectButton size="big" fullWidth />
          )}
        </form>
      ) : (
        <div className="BridgeForm__inner">
          <PoolTxConfirmationView
            mainTxName={intl.formatMessage(messages.title)}
            boxTitle={intl.formatMessage(messages.title)}
            boxDescription={intl.formatMessage(messages.boxDescription)}
            getTransactionsData={handleGetTransactions}
            onMainTxExecuted={handleMainTxExecuted}
            blockingError=""
            mainTxFailedMessage={intl.formatMessage(messages.mainTxFailedMessage)}
            goBack={() => setIsConfirm(false)}
          />
        </div>
      )}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .BridgeForm {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          &__inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            max-width: 375px;

            .GradientButton {
              font-size: 16px;
            }
          }

          &__container {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;
          }

          &__info-amount {
            display: flex;
            justify-content: space-between;

            &__label {
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              color: ${currentTheme.text.main};
            }
          }

          &__info-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            padding: 15px 0px 50px 0px;
          }

          &__row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: 16px;
          }

          &__transferTitle {
            font-size: 16px;
            font-weight: 600;
            color: ${currentTheme.text.main};
          }

          &__transferValue {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 16px;
            font-weight: 600;
            color: ${currentTheme.text.offset1};
          }

          &__label {
            font-size: 14px;
            color: ${currentTheme.text.offset1};
          }

          &__value {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'Inter';
            font-size: 14px;
            font-weight: 600;
            color: ${currentTheme.text.offset1};
          }

          &__select-field {
            .DropdownWrapper__content {
              top: 58px;
            }
          }

          &__select-button {
            display: flex;
            align-items: center;
            font-size: 16px;
            padding: 10px;
            color: ${currentTheme.text.offset1};
            background-color: ${currentTheme.interface.mainTable};

            &:hover {
              color: ${currentTheme.text.main};
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

          &__sendTo {
            font-family: 'PP Mori';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: ${currentTheme.text.main};
          }
        }
      `}</style>
    </div>
  );
}
