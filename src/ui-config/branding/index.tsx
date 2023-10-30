import React from 'react';
import { IntlShape } from 'react-intl/src/types';
import { SocialIcon, SocialType } from 'aave-ui-kit';

import FormattedTxErrorTextUI, { FormattedTxErrorTextProps } from './FormattedTxErrorText';
import { UnlockWalletExtraText as UnlockWalletExtraTextUI } from './UnlockWalletExtraText';
import logo from 'images/radiant/Logo';

export const LOGO = logo;

export const socialIcons: SocialIcon[] = [
  // todo: medium icon
  // {
  //   url: 'https://github.com/radiant-capital/radiant-ui',
  //   type: SocialType.Github,
  // },
  {
    url: 'https://twitter.com/RDNTCapital',
    type: SocialType.Twitter,
  },
  {
    url: 'https://t.me/radiantcapitalofficial',
    type: SocialType.Telegram,
  },
  {
    url: 'https://discord.gg/radiantcapital',
    type: SocialType.Discord,
  },
];

export const FormattedTxErrorText: React.FC<FormattedTxErrorTextProps> = FormattedTxErrorTextUI;
export const UnlockWalletExtraText: React.FC<{ intl: IntlShape }> = UnlockWalletExtraTextUI;
