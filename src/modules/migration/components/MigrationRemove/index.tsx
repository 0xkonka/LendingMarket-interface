import { useIntl } from 'react-intl';
import { useCallback, useEffect, useState } from 'react';
import { TokenIcon } from 'aave-ui-kit';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import BaseButton from 'components/BaseButton';
import { MigrationStepSelectorProps } from '../../screens/MigrationMain';
import BaseOutlineButton from 'components/BaseOutlineButton';
import Input from '../Input';
import messages from './messages';
import staticStyles from './style';
import { useMigrationInfo } from 'libs/migration-provider/hooks/use-migration-info';
import { useDynamicPoolDataContext } from 'libs/pool-data-provider';
import { MasterChefContract } from 'libs/aave-protocol-js/MasterChef/MasterChefContract';
import { getProvider } from 'helpers/config/markets-and-network-config';
import { sendEthTransaction } from 'helpers/send-ethereum-tx';

export default function MigrationRemove({ goNextStep }: MigrationStepSelectorProps) {
  const intl = useIntl();
  const { user } = useDynamicPoolDataContext();
  const { migrationChainId, currentV1Address } = useMigrationInfo();
  const { library: provider } = useWeb3React<providers.Web3Provider>();

  const [isMainButtonDisabled, setIsMainButtonDisabled] = useState(true);
  const [isRemovingLoading, setIsRemovingLoading] = useState(false);

  // Form
  const [userStakedAmount, setUserStakedAmount] = useState('0');

  useEffect(() => {
    if (!user) {
      return;
    }

    const masterChefContract = new MasterChefContract(
      getProvider(migrationChainId),
      currentV1Address.stakingToken,
      currentV1Address.masterChef
    );

    const getData = async () => {
      try {
        const _userStakedAmount = await masterChefContract.getUserAmount(user.id);
        setUserStakedAmount(_userStakedAmount.toString());
      } catch (error) {
        console.log('useRdntethStake => Error: ', error);
      }
    };

    getData();
  }, [user]);

  const unStakeHandler = useCallback(async () => {
    if (!user) {
      return null;
    }
    setIsRemovingLoading(true);
    try {
      const masterChefContract = new MasterChefContract(
        getProvider(migrationChainId),
        currentV1Address.stakingToken,
        currentV1Address.masterChef
      );

      const txn = await masterChefContract.withdraw(user.id, userStakedAmount);

      await sendEthTransaction(txn, provider, () => {}, null, {
        onConfirmation: () => {
          setIsMainButtonDisabled(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
    setIsRemovingLoading(false);
  }, [migrationChainId, currentV1Address, user, userStakedAmount]);

  return (
    <>
      <div className="MigrationRemove">
        <h5 className="MigrationLabel">{intl.formatMessage(messages.stepLabel)}</h5>
        <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
        <p className="MigrationDescription">{intl.formatMessage(messages.description)}</p>

        <div className="MigrationSectionContainer">
          <h3 className="MigrationSectionTitle">{intl.formatMessage(messages.sectionTitle1)}</h3>
          <Input
            classes="MigrationRemoveInput"
            isDisabled={true}
            inputLeftContent={
              <div className="MigrationRemoveInputIcons">
                <TokenIcon
                  className="MigrationRemoveRdntIcon"
                  tokenSymbol={'RDNT'}
                  width={24}
                  height={24}
                />
                <TokenIcon
                  className="MigrationRemoveEthIcon MigrationEthIcon"
                  tokenSymbol={'ETH'}
                  width={24}
                  height={24}
                />
              </div>
            }
            value={userStakedAmount}
            onChange={(value) => setUserStakedAmount(value)}
          />
          <BaseOutlineButton
            isLoading={isRemovingLoading}
            action={unStakeHandler}
            text={intl.formatMessage(messages.unStakeButton)}
          />
        </div>

        <div className="MigrationSectionContainer">
          <h3 className="MigrationSectionTitle">{intl.formatMessage(messages.sectionTitle2)}</h3>
          <BaseOutlineButton
            action={() => {
              window.open(
                `https://www.sushi.com/earn/42161:0x24704aff49645d32655a76df6d407e02d146dafc`,
                '_blank'
              );
            }}
            isArrowVisible={true}
            text={intl.formatMessage(messages.visitButton)}
          />
        </div>

        <div className="MigrationButtonField">
          <label className="MigrationCheckboxContainer">
            <input
              className="MigrationCheckbox"
              type="checkbox"
              checked={!isMainButtonDisabled}
              onChange={(event) => setIsMainButtonDisabled(!event.target.checked)}
            />
            <p style={{ paddingRight: '24px' }} className="MigrationDescription">
              {intl.formatMessage(messages.checkboxText)}
            </p>
          </label>
          <BaseButton
            disabled={isMainButtonDisabled}
            action={() => goNextStep()}
            text={intl.formatMessage(messages.primaryButton)}
            isArrowVisible={true}
          ></BaseButton>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
