import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { rgba, useThemeContext, BasicModal } from 'aave-ui-kit';

import { ConnectorOptionalConfig, LedgerDerivationPath } from 'libs/web3-data-provider';
import AddressList from 'components/AddressList';
import SelectField from 'components/fields/SelectField';
import staticStyles from './style';
import messages from './messages';

interface AddressModalProps {
  showModal: boolean;
  onBackdropPress: () => void;
  activeAddress?: string;
  availableAddresses: string[];
  onSelectAddress: (address: string) => void;
  connectorConfig: ConnectorOptionalConfig;
  onConnectorConfigUpdate: (config: ConnectorOptionalConfig) => void;
  setModal: (val: boolean) => void;
  currentProviderName?: string;
}

const PAGE_SIZE = 4;

export default function AddressModal({
  showModal,
  onBackdropPress,
  activeAddress,
  availableAddresses,
  onSelectAddress,
  connectorConfig,
  onConnectorConfigUpdate,
  setModal,
  currentProviderName,
}: AddressModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const SELECT_OPTIONS = [
    { value: LedgerDerivationPath.LedgerLive, label: 'Ledger live' },
    { value: LedgerDerivationPath.Legacy, label: 'Legacy' },
  ];

  const handleButtonClick = (type: 'prev' | 'next') => {
    if (type === 'next') {
      onConnectorConfigUpdate({
        ...connectorConfig,
        accountsOffset: connectorConfig.accountsOffset + PAGE_SIZE,
      });
      return;
    }

    if (connectorConfig.accountsOffset <= 0) {
      return;
    }

    onConnectorConfigUpdate({
      ...connectorConfig,
      accountsOffset: connectorConfig.accountsOffset - PAGE_SIZE,
    });
  };

  const handlePathUpdate = (option: any) => {
    onConnectorConfigUpdate({
      ...connectorConfig,
      ledgerBaseDerivationPath: option.value as LedgerDerivationPath,
      accountsLength: PAGE_SIZE,
      accountsOffset: 0,
    });
  };

  const handleSelectAddress = (address: string, index: number) => {
    if (connectorConfig.ledgerBaseDerivationPath) {
      localStorage.setItem('ledgerPath', connectorConfig.ledgerBaseDerivationPath);
    }
    const offset = connectorConfig.accountsOffset + index;

    localStorage.setItem('ledgerAccountsOffset', offset.toString());
    localStorage.setItem('ledgerAccountsLength', '1');

    setModal(false);
    onSelectAddress(address);
    onConnectorConfigUpdate({
      ...connectorConfig,
      accountsOffset: offset,
      accountsLength: 1,
    });
  };

  const activeOptionBg = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);

  const currentOption = useMemo(
    () =>
      SELECT_OPTIONS.find((option) => option.value === connectorConfig.ledgerBaseDerivationPath),
    [connectorConfig.ledgerBaseDerivationPath]
  );

  return (
    <BasicModal
      className="AddressModal"
      isVisible={showModal}
      onBackdropPress={onBackdropPress}
      withCloseButton={true}
    >
      <div className="AddressModal__content">
        <div className="AddressModal__caption">
          <h3>{intl.formatMessage(messages.title)}</h3>
        </div>

        <div className="AddressModal__ledger-type">
          <h4>{intl.formatMessage(messages.selectCaption)}</h4>

          {currentProviderName === 'ledger' && (
            <SelectField value={<p>{`${currentOption?.value} - ${currentOption?.label}`} </p>}>
              {SELECT_OPTIONS.map((option) => (
                <button
                  className="AddressModal__select-option"
                  onClick={() => handlePathUpdate(option)}
                  key={option.value}
                  disabled={option.value === currentOption?.value}
                >
                  <p>
                    <span>{option.value}</span>
                    {option.label}
                  </p>
                </button>
              ))}
            </SelectField>
          )}
        </div>

        <div className="AddressModal__addresses">
          <h4>{intl.formatMessage(messages.addressesCaption)}</h4>

          <AddressList
            availableAddresses={availableAddresses}
            activeAddress={activeAddress}
            onSelectAddress={handleSelectAddress}
            pageSize={PAGE_SIZE}
            offset={connectorConfig.accountsOffset}
            skipPagination
          />

          <div className="AddressModal__pagination-buttons">
            <button
              onClick={() => handleButtonClick('prev')}
              disabled={!connectorConfig.accountsOffset}
              className="AddressModal__pagination-button AddressModal__pagination-buttonPrev"
              type="button"
            />
            <button
              onClick={() => handleButtonClick('next')}
              className="AddressModal__pagination-button AddressModal__pagination-buttonNext"
              type="button"
            />
          </div>
        </div>

        <style jsx={true} global={true}>
          {staticStyles}
        </style>
        <style jsx={true} global={true}>{`
          .AddressModal {
            color: ${currentTheme.darkBlue.hex};

            &__caption {
              h3 {
                color: ${currentTheme.primary.hex};
              }
            }

            &__select-option {
              &:hover {
                p {
                  color: ${currentTheme.primary.hex};
                  font-weight: 600;
                }
              }
              &:disabled {
                background: ${activeOptionBg};
                p {
                  color: ${currentTheme.darkBlue.hex};
                  font-weight: 400;
                }
              }
              p {
                color: ${currentTheme.darkBlue.hex};
              }
            }

            &__pagination-button {
              border-color: ${currentTheme.darkBlue.hex};
              &:after {
                border-color: ${currentTheme.darkBlue.hex};
              }
            }
          }
        `}</style>
      </div>
    </BasicModal>
  );
}
