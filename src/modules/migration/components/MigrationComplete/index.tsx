import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ethers, providers } from 'ethers';
import classNames from 'classnames';
import { TokenIcon, useThemeContext } from 'aave-ui-kit';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';
import { useLoopApr } from 'libs/aave-protocol-js/hooks/use-loop-apr';

import BaseButton from 'components/BaseButton';
import ZapDurationSelector from 'components/ZapLPModal/ZapDurationSelector';
import TabButtons from 'components/basic/TabButtons';
import { SOURCE_OPTIONS } from 'ui-config/zap';
import { MigrationStepSelectorProps } from '../../screens/MigrationMain';
import InfoIcon from 'images/InfoIcon';
import DLPLogo from 'images/DLPLogo';
import DLPBannerLeft from 'images/MigrationDlpBannerLeft';
import DLPBannerRight from 'images/MigrationDlpBannerRight';
import { messages } from './messages';
import staticStyles from './style';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from 'libs/pool-data-provider';
import { useWalletBalanceProviderContext } from 'libs/wallet-balance-provider/WalletBalanceProvider';
import AmountField from 'components/fields/AmountField';
import { LockZapContract } from 'libs/aave-protocol-js/LockZap/LockZapContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import CompactNumber from 'components/basic/CompactNumber';
import { useMigrationInfo } from 'libs/migration-provider/hooks/use-migration-info';
import { MigrationContract } from 'libs/aave-protocol-js/Migration/MigrationContract';
import { useRdntPrices } from 'libs/aave-protocol-js/hooks/use-rdnt-prices';
import { useUserRank } from 'libs/aave-protocol-js/hooks/use-user-rank';
import { useTokenPrices } from 'libs/aave-protocol-js/hooks/use-token-prices';
import { useWeb3React } from '@web3-react/core';
import { useVestHandler } from 'libs/aave-protocol-js/hooks/use-vest';
import EmissionStatusBar from 'components/basic/EmissionStatusBar';

export const commaSeparatedNumber = function (num: string) {
  return Number(num).toLocaleString();
};

export default function MigrationComplete({ step, goNextStep }: MigrationStepSelectorProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();
  const { highLoopApr } = useLoopApr();

  const { chainId, currentMarketData } = useProtocolDataContext();
  const { prices } = useRdntPrices();
  const { minDLPBalance } = useUserRank();
  const { tokenPrices } = useTokenPrices();
  const { library: provider } = useWeb3React<providers.Web3Provider>();

  const [explainerCard, setExplainerCard] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [showBanner, setShowBanner] = useState(false);
  const [selectSource, setSelectSource] = useState('BORROW');
  const [amount, setAmount] = useState('');
  const [rdntAmount, setRdntAmount] = useState('');
  const [quoteETHAmount, setQuoteETHAmount] = useState('');

  const [sendingTxs, setSendingTxs] = useState(false);
  const [txsStep, setTxsStep] = useState(1);
  const [txsTotalSteps, setTxsTotalSteps] = useState(2);
  const [zapErrorMessage, setZapErrorMessage] = useState('');

  const { networkConfig } = useStaticPoolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { walletData } = useWalletBalanceProviderContext();
  const { v1Balance: walletBalance, currentV1Address } = useMigrationInfo();
  const { lockedValue } = useVestHandler();

  const userTotalDepositValue = user?.totalLiquidityUSD || '0';
  const userTotalDlpDepositedValue = lockedValue.toString();
  const userEligibilityThreshold = String(Number(userTotalDepositValue) * 0.05);

  const nativeTokenPrice = useMemo(() => {
    const nativeToken = tokenPrices.find((item) => item.symbol === networkConfig.baseAsset);
    return nativeToken?.price || 0;
  }, [networkConfig, tokenPrices]);

  const newLockingValue =
    Number(amount) * nativeTokenPrice + Number(rdntAmount) * (prices?.tokenPrice || 0);
  const minDLPValue = minDLPBalance * (prices?.lpTokenPrice || 0);

  const zapAsset =
    selectSource === 'BORROW' ? networkConfig.baseAssetWrappedSymbol : networkConfig.baseAsset;
  const zapETHAssetBalance = ethers.utils.formatUnits(
    walletData['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'] || '0'
  );

  const poolReserve = reserves.find((reserve) => reserve.symbol === networkConfig.baseAsset);
  const maxUserAmountToBorrow = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  ).div(poolReserve?.priceInMarketReferenceCurrency || '1');
  const maxAmountToBorrow = BigNumber.max(
    BigNumber.min(poolReserve?.availableLiquidity || '', maxUserAmountToBorrow),
    0
  ).toString();

  const maxAmount = selectSource === 'BORROW' ? maxAmountToBorrow : zapETHAssetBalance;

  useEffect(() => {
    (async () => {
      if (Number(rdntAmount) <= 0) {
        setQuoteETHAmount('');
        return;
      }

      const liquidityZAPService = new LockZapContract(
        getProvider(chainId),
        currentMarketData.addresses.lockZap
      );

      const quoteETHAmount = await liquidityZAPService.quote(rdntAmount);
      setQuoteETHAmount((Number(quoteETHAmount) * 1.01).toString());
    })();
  }, [rdntAmount]);

  useEffect(() => {
    if (Number(quoteETHAmount) < Number(maxAmount)) {
      setAmount(quoteETHAmount);
    }
  }, [quoteETHAmount, selectSource]);

  const inputHandler = useCallback(
    (value: string) => {
      setAmount(value);
    },
    [setAmount, setRdntAmount]
  );

  const handleMaxButtonClick = () => {
    setAmount(maxAmount as string);
  };

  const inputRdntHandler = useCallback(
    () => (value: string) => {
      setRdntAmount(value);
    },
    [setRdntAmount]
  );

  const handleRdntMaxButtonClick = () => {
    setRdntAmount(walletBalance.toString() as string);
  };

  const handleCarousel = function (direction: string) {
    if (direction === 'BACK') {
      if (explainerCard - 1 < 0) setExplainerCard(2);
      else setExplainerCard(explainerCard - 1);
    } else if (direction === 'FORWARD') {
      if (explainerCard + 1 > 2) setExplainerCard(0);
      else setExplainerCard(explainerCard + 1);
    }
  };

  useEffect(() => {
    function handleScroll() {
      const bannerElement = document.getElementById('dLPBannerAnchor');
      if (!bannerElement) return;
      const bannerTop = bannerElement.getBoundingClientRect().top;
      setShowBanner(0 > bannerTop);
    }

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function sourceHandler(value: string) {
    setSelectSource(value);
  }

  const handleGetTransactions = useCallback(async () => {
    const userId = user?.id || '';
    const assetAddress = networkConfig?.baseAssetWrappedAddress || '';

    const isBorrow = selectSource === 'BORROW';

    const migrationContract = new MigrationContract(
      getProvider(chainId),
      currentMarketData.addresses?.migration || ''
    );

    const liquidityZAPService = new LockZapContract(
      getProvider(chainId),
      currentMarketData.addresses.lockZap
    );

    const txs = [];

    const migrationTxs = await migrationContract.exchange(
      userId,
      currentV1Address.rdntToken || '',
      rdntAmount
    );

    txs.push(...migrationTxs);

    const zapTxs = isBorrow
      ? await liquidityZAPService.zapAssetWithRdnt({
          assetAmount: amount,
          rdntAmount,
          assetAddress,
          rdntAddress: currentMarketData.addresses.rdntToken,
          durationIndex: selectedDuration,
          user: userId,
          assetDecimals: 18,
        })
      : await liquidityZAPService.zapETHWithRdnt(
          amount,
          rdntAmount,
          currentMarketData.addresses.rdntToken,
          selectedDuration,
          userId
        );

    txs.push(...zapTxs);
    return txs;
  }, [user, amount, rdntAmount, currentMarketData, selectedDuration]);

  const zapDLP = async () => {
    if (!provider) return;
    setSendingTxs(true);
    setTxsStep(1);
    setZapErrorMessage('');

    const txs = await handleGetTransactions();
    setTxsTotalSteps(txs.length);
    let allTxsSuccessful = true;

    try {
      for (let i = 0; i < txs.length; i++) {
        const extendedData = await txs[i].tx();
        const { from, ...txData } = extendedData;
        const signer = provider.getSigner(from);
        setTxsStep(i + 1);

        try {
          const sentTx = await signer.sendTransaction({
            ...txData,
            value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
          });
          console.log('tx', i, 'sent!');

          // Wait for the transaction to be confirmed
          await provider.waitForTransaction(sentTx.hash);
          console.log('tx', i, 'confirmed!');
        } catch (e) {
          console.log('sending tx error:', e);
          setZapErrorMessage(e.message);
          allTxsSuccessful = false;
          break;
        }
      }
    } catch (e) {
      console.log('tx error', e);
      setZapErrorMessage(e.message);
      allTxsSuccessful = false;
    }

    if (allTxsSuccessful) {
      if (Number(walletBalance) > 0.5) goNextStep(7);
      else goNextStep(8);
    }

    setSendingTxs(false);
  };

  return (
    <>
      <div className="MigrationComplete">
        <h5 className="MigrationLabel">{intl.formatMessage(messages.mainPageStepLabel)}</h5>
        <h1 className="MigrationTitle">{intl.formatMessage(messages.mainPageTitle)}</h1>
        <p className="MigrationDescription">{intl.formatMessage(messages.mainPageDescription)}</p>

        <div className="MigrationCompleteExplainerCarousel">
          {explainerCard === 0 && (
            <div className="MigrationCompleteCard MigrationCompleteExplainerCard">
              <span className="MigrationCompleteCardLabel">
                {intl.formatMessage(messages.explainerTitle1)}
              </span>
              <p className="MigrationDescription">
                {intl.formatMessage(messages.explainerDescription1)}
              </p>
              <div className="MigrationCompleteDlpBarContainer">
                <div className="MigrationCompleteDlpBarLabelContainer">
                  <div className="MigrationCompleteDlpBarLabelLeft">
                    <TokenIcon tokenSymbol={'RDNT'} width={24} height={24} />
                    <span>80% RDNT</span>
                  </div>
                  <div className="MigrationCompleteDlpBarLabelRight">
                    <span>20% ETH</span>
                    <TokenIcon
                      className="MigrationEthIcon"
                      tokenSymbol={'ETH'}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="MigrationCompleteDlpBar">
                  <div className="MigrationCompleteDlpBarFill"></div>
                </div>
              </div>
            </div>
          )}
          {explainerCard === 1 && (
            <div className="MigrationCompleteCard MigrationCompleteExplainerCard">
              <span className="MigrationCompleteCardLabel">
                {intl.formatMessage(messages.explainerTitle2)}
              </span>
              <p className="MigrationDescription">
                {intl.formatMessage(messages.explainerDescription2)}
              </p>
            </div>
          )}
          {explainerCard === 2 && (
            <div className="MigrationCompleteCard MigrationCompleteExplainerCard">
              <span className="MigrationCompleteCardLabel">
                {intl.formatMessage(messages.explainerTitle3)}
              </span>
              <p className="MigrationDescription">
                {intl.formatMessage(messages.explainerDescription3)}
              </p>
            </div>
          )}
          <div className="MigrationCompleteExplainerCarouselController">
            <div
              className="MigrationCompleteExplainerCarouselButton ButtonBack"
              onClick={() => handleCarousel('BACK')}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.63599L15.778 7.04999L10.828 12Z"
                  fill={currentTheme.text.main}
                />
              </svg>
            </div>
            <div className="MigrationCompleteExplainerCarouselCountContainer">
              <div
                className={classNames(
                  'MigrationCompleteExplainerCarouselCount',
                  explainerCard === 0 && 'CountActive'
                )}
              ></div>
              <div
                className={classNames(
                  'MigrationCompleteExplainerCarouselCount',
                  explainerCard === 1 && 'CountActive'
                )}
              ></div>
              <div
                className={classNames(
                  'MigrationCompleteExplainerCarouselCount',
                  explainerCard === 2 && 'CountActive'
                )}
              ></div>
            </div>
            <div
              className="MigrationCompleteExplainerCarouselButton ButtonForward"
              onClick={() => handleCarousel('FORWARD')}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.172 12L8.22198 7.04999L9.63598 5.63599L16 12L9.63598 18.364L8.22198 16.95L13.172 12Z"
                  fill={currentTheme.text.main}
                />
              </svg>
            </div>
          </div>
        </div>

        <nav className={classNames('MigrationCompleteBanner', showBanner && 'BannerVisible')}>
          <div className="MigrationCompleteBannerLabelContainer">
            <div className="MigrationCompleteBannerNumbers">
              <h4 className="MigrationCompleteCardMainNumber MigrationNumbersFont">
                $
                <CompactNumber
                  value={userTotalDlpDepositedValue}
                  maximumFractionDigits={2}
                  minimumFractionDigits={0}
                  showFullNum={false}
                />
              </h4>
              <h5 className="MigrationNumbersFont">
                /$
                <CompactNumber
                  value={userEligibilityThreshold}
                  maximumFractionDigits={2}
                  minimumFractionDigits={0}
                  showFullNum={false}
                />
              </h5>
            </div>
            <span className="MigrationCompleteBannerLabel">
              {intl.formatMessage(messages.dlpCardLabel2)}
            </span>
          </div>
          <div className="MigrationCompleteDlpBalanceBarContainer">
            <EmissionStatusBar
              locked={Number(userTotalDlpDepositedValue)}
              color="main"
              backgroundColor="#F3ECFE"
            />
          </div>
        </nav>

        <div className="MigrationSectionContainer">
          <div className="MigrationContentContainer">
            <h3 className="MigrationSectionTitle">
              {intl.formatMessage(messages.superchargeTitle)}
            </h3>
            <p className="MigrationDescription">
              {intl.formatMessage(messages.superchargeDescription1A)}
              <br></br>
              <br></br>
              {intl.formatMessage(messages.superchargeDescription1B, {
                dlpMinimum: `$${commaSeparatedNumber(userEligibilityThreshold)}`,
              })}
              &nbsp;
              <strong>
                <CompactNumber
                  value={highLoopApr * 100}
                  maximumFractionDigits={2}
                  minimumFractionDigits={0}
                  showFullNum={false}
                />
                % APR
              </strong>
              &nbsp;
              {intl.formatMessage(messages.superchargeDescription1D, {
                userTotalDeposits: `$${commaSeparatedNumber(userTotalDepositValue)}`,
              })}
            </p>
          </div>
          <div className="MigrationContentContainer">
            <div className="MigrationNote">
              <div className="MigrationNoteIconContainer">
                <InfoIcon />
              </div>
              <p className="MigrationDescription">
                <span className="MigrationNotePretext">
                  {intl.formatMessage(messages.superchargeNote1A)}
                </span>
                {intl.formatMessage(messages.superchargeNote1B)}
              </p>
            </div>
          </div>
          <div className="MigrationContentContainer">
            <div className="MigrationCompleteCard">
              <div className="MigrationCompleteCardRow">
                <span className="MigrationCompleteCardLabel">
                  {intl.formatMessage(messages.dlpCardLabel1)}
                </span>
                <h3 className="MigrationCompleteCardMainNumber MigrationNumbersFont">
                  $
                  <CompactNumber
                    value={userTotalDepositValue}
                    maximumFractionDigits={2}
                    minimumFractionDigits={0}
                    showFullNum={false}
                  />
                </h3>
              </div>
              <div className="MigrationCompleteCardRow">
                <span className="MigrationCompleteCardLabel">
                  {intl.formatMessage(messages.dlpCardLabel2)}
                </span>
                <div className="MigrationCompleteDlpBalanceLabelContainer">
                  <h3 className="MigrationCompleteCardMainNumber MigrationNumbersFont">
                    $
                    <CompactNumber
                      value={userTotalDlpDepositedValue}
                      maximumFractionDigits={2}
                      minimumFractionDigits={0}
                      showFullNum={false}
                    />
                  </h3>
                  <h5 className="MigrationNumbersFont">
                    /$
                    <CompactNumber
                      value={userEligibilityThreshold}
                      maximumFractionDigits={2}
                      minimumFractionDigits={0}
                      showFullNum={false}
                    />
                  </h5>
                </div>

                <div className="MigrationCompleteDlpBalanceBarContainer">
                  <EmissionStatusBar
                    locked={Number(userTotalDlpDepositedValue)}
                    color="main"
                    backgroundColor="#F3ECFE"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="dLPBannerAnchor" className="MigrationSectionContainer">
          <div className="MigrationCompleteSectionGraphic">
            <DLPBannerLeft className="BannerLeft" />
            <div className="GraphicContent">
              <DLPLogo className="LogoCenter" />
              <h2>
                Dynamic <span>Liquidity Pool</span>
              </h2>
            </div>
            <DLPBannerRight className="BannerRight" />
          </div>
          <div className="MigrationContentContainer">
            <h1 className="MigrationTitle">{intl.formatMessage(messages.creatingDlpTitle)}</h1>
            <p className="MigrationDescription">
              {intl.formatMessage(messages.creatingDlpDescription)}
            </p>
          </div>

          <div className="RdntInputField">
            <AmountField
              title="V1 RDNT balance:"
              maxAmount={walletBalance.toString()}
              disabled={!Number(walletBalance)}
              symbol={'RDNT'}
              maxDecimals={18}
              value={rdntAmount}
              onChange={inputRdntHandler()}
              onMaxButtonClick={handleRdntMaxButtonClick}
            />
            {Number(quoteETHAmount) > Number(maxAmount) && (
              <p className="MigrationError">
                You do not have sufficient {zapAsset} to zap the current amount of RDNT
              </p>
            )}
          </div>

          <div>
            <AmountField
              disabled={true}
              title={
                selectSource === 'BORROW'
                  ? `${networkConfig.baseAsset} available to borrow:`
                  : `${networkConfig.baseAsset} balance:`
              }
              maxAmount={maxAmount}
              symbol={zapAsset}
              maxDecimals={18}
              value={amount}
              onChange={inputHandler}
              onMaxButtonClick={handleMaxButtonClick}
              placeholderMsgKey={'placeholderEth'}
            />
          </div>

          {!!amount && newLockingValue * 0.95 < minDLPValue && (
            <div className="MigrationError">
              Minimum stake amount: {minDLPBalance} dLP {`(`}$
              {(minDLPBalance * (prices?.lpTokenPrice || 0)).toFixed(2)}
              {`)`}
            </div>
          )}

          <div className="MigrationContentContainer">
            <TabButtons
              values={SOURCE_OPTIONS}
              selectedValue={selectSource}
              setSelectedValue={sourceHandler}
            ></TabButtons>
          </div>

          <hr className="MigrationSectionDivider" />

          <div className="MigrationContentContainer">
            <h3 className="MigrationSectionTitle" style={{ marginBottom: '16px' }}>
              {intl.formatMessage(messages.creatingDlpStepDescription4)}
            </h3>
            <div className="MigrationCompleteDurationContainer">
              <ZapDurationSelector
                selected={selectedDuration}
                setSelected={setSelectedDuration}
                disabled={sendingTxs}
              />
            </div>
          </div>
        </div>

        {zapErrorMessage.length > 0 && (
          <div className="MigrationContentContainer">
            <div className="MigrationError">{zapErrorMessage}</div>
          </div>
        )}

        <div className="MigrationButtonField">
          <BaseButton
            action={() => {
              zapDLP();
            }}
            text={
              sendingTxs
                ? `Confirming (${txsStep}/${txsTotalSteps})`
                : intl.formatMessage(messages.mainPagePrimaryButton)
            }
            isLoading={sendingTxs}
            disabled={
              !Number(amount) ||
              Number(quoteETHAmount) >= Number(maxAmount) ||
              newLockingValue * 0.95 < minDLPValue ||
              sendingTxs
            }
          ></BaseButton>
          <div
            onClick={() => {
              if (!sendingTxs) history.push('/migration?step=7');
            }}
            className={`MigrationCompleteMigrateLooseButton ${
              sendingTxs && 'MigrateLooseButtonDisabled'
            }`}
          >
            <span>{intl.formatMessage(messages.mainPageSecondaryButton)}</span>
          </div>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx global>
        {`
          .MigrationCompleteCard {
            background: ${currentTheme.interface.mainTable};
            border-color: ${currentTheme.interface.offset1};
            color: ${currentTheme.text.main};
          }
          .MigrationCompleteCardLabel,
          .MigrationCompleteCardMainNumber,
          .MigrationCompleteBannerNumbers h4,
          .MigrationCompleteBannerLabel {
            color: ${currentTheme.text.main};
          }
          .MigrationCompleteBannerNumbers h5 {
            color: ${currentTheme.text.main}CC;
          }
          .MigrationCompleteExplainerCarouselCount {
            background: ${currentTheme.text.main}26;
          }
          .MigrationCompleteExplainerCarouselCount.CountActive {
            background: ${currentTheme.text.main};
          }
          .MigrationCompleteSectionGraphic {
            background: ${currentTheme.background.footer};
          }
          .MigrationCompleteBanner {
            background: ${currentTheme.palette.token2.hex};
          }
          .MigrationCompleteExplainerCarouselButton {
            background: ${currentTheme.background.footer};
          }
          .MigrationCompleteSectionGraphic .GraphicContent h2 {
            color: ${currentTheme.brand.main};
          }
        `}
      </style>
    </>
  );
}
