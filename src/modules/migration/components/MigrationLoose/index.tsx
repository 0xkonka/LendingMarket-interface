import { useIntl } from 'react-intl';
import { ethers, providers } from 'ethers';
import { useHistory } from 'react-router-dom';

import messages from './messages';
import staticStyles from './style';
import { MigrationStepSelectorProps } from '../../screens/MigrationMain';
import BaseButton from 'components/BaseButton';
import { MigrationContract } from 'libs/aave-protocol-js/Migration/MigrationContract';
import InfoIcon from 'images/InfoIcon';
import { valueToBigNumber } from '@aave/protocol-js';
import { useMigrationInfo } from 'libs/migration-provider/hooks/use-migration-info';
import CompactNumber from 'components/basic/CompactNumber';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import { useWeb3React } from '@web3-react/core';
import AmountField from 'components/fields/AmountField';
import { useState, useEffect } from 'react';

export default function MigrationLoose({ goNextStep }: MigrationStepSelectorProps) {
  const intl = useIntl();
  const history = useHistory();
  const { library: provider } = useWeb3React<providers.Web3Provider>();

  const { user } = useDynamicPoolDataContext();
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { v1Balance: newV1Balance, currentV1Address } = useMigrationInfo();
  const [v1Balance, setV1Balance] = useState(valueToBigNumber('0'));
  const [error, setError] = useState('');
  const [v1ConvertAmount, setV1ConvertAmount] = useState(v1Balance.toString());

  const [sendingTxs, setSendingTxs] = useState(false);
  const [txsStep, setTxsStep] = useState(1);
  const [txsTotalSteps, setTxsTotalSteps] = useState(1);
  const [zapErrorMessage, setZapErrorMessage] = useState('');

  useEffect(() => {
    setV1ConvertAmount(v1Balance.toString());
  }, [user, v1Balance]);

  useEffect(() => {
    if (newV1Balance.toString() !== v1Balance.toString()) {
      setV1Balance(newV1Balance);
    }
  }, [newV1Balance]);

  const migrationHandler = async () => {
    if (!provider) return;
    setSendingTxs(true);
    setTxsStep(1);
    setZapErrorMessage('');

    try {
      const userId = user?.id || '';
      const migrationContract = new MigrationContract(
        getProvider(chainId),
        currentMarketData.addresses?.migration || ''
      );

      const migrationTxs = await migrationContract.exchange(
        userId,
        currentV1Address.rdntToken || '',
        v1ConvertAmount.toString()
      );
      setTxsTotalSteps(migrationTxs.length);

      let allTxsSuccessful = true;

      for (let i = 0; i < migrationTxs.length; i++) {
        const extendedData = await migrationTxs[i].tx();
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
        } catch (error) {
          console.log(error);
          setZapErrorMessage(error.message);
          allTxsSuccessful = false;
          break;
        }
      }

      if (allTxsSuccessful) {
        goNextStep(8);
      }
    } catch (error) {
      console.log(error);
    }

    setSendingTxs(false);
  };

  const handleMaxButtonClick = () => {
    setV1ConvertAmount(v1Balance.toString());
  };

  const handleAmountChange = (newAmount: string) => {
    const newAmountValue = valueToBigNumber(newAmount);
    setError('');
    if (v1Balance.toString() && newAmountValue.gt(v1Balance.toString())) {
      setV1ConvertAmount(v1Balance.toString() as string);
      return;
    }

    if (newAmount !== v1ConvertAmount) {
      setV1ConvertAmount(newAmount.toString());
      return;
    }
  };

  return (
    <>
      <div className="MigrationLoose">
        <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
        <div className="MigrationContentContainer">
          <div className="MigrationInputField">
            <div className="MigrationInputFieldLabel">
              <p className="MigrationInputFieldLabelText">
                {intl.formatMessage(messages.inputLabel)}
              </p>
              <span className="MigrationInputFieldLabelNumber">
                <CompactNumber value={Number(v1Balance)} showFullNum />
              </span>
            </div>
            <AmountField
              className="MigrationInputField__V1Amount"
              maxAmount={v1Balance.toString()}
              symbol={'RDNT'}
              value={v1ConvertAmount}
              onChange={handleAmountChange}
              onMaxButtonClick={handleMaxButtonClick}
              error={error}
            />
            {/* <Input
              isDisabled={true}
              inputLeftContent={<img src={IconRadiant} alt="RDNT Icon" />}
              value={v1Balance.toString()}
              onChange={() => {}}
            /> */}
          </div>
        </div>
        <div className="MigrationContentContainer">
          <div className="MigrationNote">
            <div className="MigrationNoteIconContainer">
              <InfoIcon />
            </div>
            <p className="MigrationDescription">
              <span className="MigrationNotePretext">{intl.formatMessage(messages.note1A)}</span>
              {intl.formatMessage(messages.note1B)}
            </p>
          </div>
        </div>

        {zapErrorMessage.length > 0 && (
          <div className="MigrationContentContainer">
            <div className="MigrationError">{zapErrorMessage}</div>
          </div>
        )}

        <div className="MigrationButtonField">
          <BaseButton
            action={migrationHandler}
            isLoading={sendingTxs}
            disabled={sendingTxs}
            text={
              sendingTxs
                ? `Confirming (${txsStep}/${txsTotalSteps})`
                : intl.formatMessage(messages.primaryButton)
            }
          ></BaseButton>
          <div
            onClick={() => history.push('/migration?step=8')}
            className="MigrationLooseContinueButton"
          >
            <span>{intl.formatMessage(messages.secondaryButton)}</span>
          </div>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MigrationLoose {
          .MigrationInputField__V1Amount {
            .AmountField__wrapper {
              padding: 0 26px;
            }
            .AmountField__input input {
              padding: 23px 5px 23px 23px;
            }
          }
        }
      `}</style>
    </>
  );
}
