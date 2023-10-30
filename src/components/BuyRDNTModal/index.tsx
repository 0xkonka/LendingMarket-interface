import { useCallback, useEffect, useState } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import { networkConfigs } from 'ui-config/networks';
import { useProtocolDataContext } from 'libs/protocol-data-provider';
import RadiantModal from 'components/basic/RadiantModal';
import CheckBoxField from 'components/fields/CheckBoxField';
import ContainedButton from 'components/basic/ContainedButton';
import messages from './messages';

const OFFSET_DAYS = 30;

interface BuyRDNTProps {
  setOpenModal: (openModal: boolean) => void;
}

export default function BuyRDNTModal({ setOpenModal }: BuyRDNTProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { chainId } = useProtocolDataContext();

  const [openBuyRDNTModal, setOpenBuyRDNTModal] = useState(false);
  const [agree, setAgree] = useState(false);
  const [networkTokenSymbol, setNetworkTokenSymbol] = useState(
    chainId === 56 || chainId === 97 ? 'BNB' : 'ETH'
  );

  useEffect(() => {
    const hideBuyRDNTModal = localStorage.getItem('hideBuyRDNTModal');
    const hideBuyRDNTModalDate = hideBuyRDNTModal ? new Date(hideBuyRDNTModal) : new Date();

    if (hideBuyRDNTModalDate <= new Date()) {
      setOpenBuyRDNTModal(true);
    } else {
      window.open(networkConfigs[chainId]?.buyRdntUrl || '', '_blank');
      setOpenModal(false);
    }
  }, []);

  useEffect(() => {
    setNetworkTokenSymbol(chainId === 56 || chainId === 97 ? 'BNB' : 'ETH');
  }, [chainId]);

  const agreeButtonHandler = useCallback(() => {
    let agreeDate = new Date();

    if (agree) {
      agreeDate.setDate(agreeDate.getDate() + OFFSET_DAYS);
    }

    localStorage.setItem('hideBuyRDNTModal', agreeDate.toString());
    window.open(networkConfigs[chainId]?.buyRdntUrl || '', '_blank');
    setOpenBuyRDNTModal(false);
    setOpenModal(false);
  }, [agree, chainId, setOpenBuyRDNTModal, setOpenModal]);

  const closeButtonHandler = useCallback(() => {
    setOpenBuyRDNTModal(false);
    setOpenModal(false);
  }, [setOpenBuyRDNTModal, setOpenModal]);

  return (
    <RadiantModal
      onBackdropPress={closeButtonHandler}
      isVisible={openBuyRDNTModal}
      withCloseButton={true}
      title={intl.formatMessage(messages.title, {
        swap: networkTokenSymbol === 'ETH' ? 'Balancer' : 'PancakeSwap',
      })}
      className={'buy-rdnt-modal'}
    >
      <p className="desc">
        {intl.formatMessage(messages.description1, {
          domain: <b>radiant.capital</b>,
        })}
        <br />
        {intl.formatMessage(messages.description2)}
      </p>

      <CheckBoxField
        value={agree}
        name="BuyRDNTModal__checkbox"
        onChange={() => setAgree(!agree)}
        title={intl.formatMessage(messages.confirm)}
      />

      <ContainedButton fullWidth onClick={agreeButtonHandler}>
        {intl.formatMessage(messages.continue)}
      </ContainedButton>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .buy-rdnt-modal {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          width: 100%;
          max-width: $maxFormWidth;

          .desc {
            font-size: 14px;
            color: ${currentTheme.text.main};
          }
        }
      `}</style>
    </RadiantModal>
  );
}
