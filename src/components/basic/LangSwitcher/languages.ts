import { SupportedLanguage } from 'libs/language-provider/constants';

import messages from './messages';

import en from './images/en.png';
import cn from './images/cn.svg';
import ko from './images/ko.svg';
// import es from './images/es.svg';
// import fr from './images/fr.svg';
// import it from './images/it.svg';
// import ja from './images/ja.svg';
// import tr from './images/tr.svg';
// import vi from './images/vi.svg';
// import pt from './images/pt.svg';

export const languages = {
  [SupportedLanguage.en]: {
    name: messages.english,
    icon: en,
  },
  [SupportedLanguage.zh]: {
    name: messages.chinese,
    icon: cn,
  },
  [SupportedLanguage.ko]: {
    name: messages.korean,
    icon: ko,
  },
  // [SupportedLanguage.es]: {
  //   name: messages.spanish,
  //   icon: es,
  // },
  // [SupportedLanguage.fr]: {
  //   name: messages.french,
  //   icon: fr,
  // },
  // [SupportedLanguage.it]: {
  //   name: messages.italian,
  //   icon: it,
  // },
  // [SupportedLanguage.ja]: {
  //   name: messages.japanese,
  //   icon: ja,
  // },
  // [SupportedLanguage.tr]: {
  //   name: messages.turkish,
  //   icon: tr,
  // },
  // [SupportedLanguage.vi]: {
  //   name: messages.vietnamese,
  //   icon: vi,
  // },
  // [SupportedLanguage.pt]: {
  //   name: messages.portuguese,
  //   icon: pt,
  // },
};
