import { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from 'aave-ui-kit';

import { useLanguageContext } from 'libs/language-provider';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from 'libs/language-provider/constants';
import { languages } from './languages';
import messages from './messages';
import OpenArrowIcon from 'icons/OpenArrow';

interface LangSwitcherProps {
  className?: string;
}

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentLangSlug, changeLang } = useLanguageContext();

  const [visible, setVisible] = useState(false);

  const setLanguage = (langCode: SupportedLanguage) => {
    if (langCode === currentLangSlug) {
      return;
    }
    changeLang(langCode);
    setVisible(false);
  };

  return (
    <div className={classNames('LangSwitcher', className)}>
      <div
        className={classNames('LangSwitcher__header', {
          LangSwitcher__headerSelect: visible,
        })}
        onClick={() => setVisible((prev) => !prev)}
      >
        <div className="LangSwitcher__header-title">{intl.formatMessage(messages.caption)}:</div>
        <div className="LangSwitcher__header-language">
          <img
            src={languages[currentLangSlug].icon}
            alt={currentLangSlug}
            className="LangSwitcher__flag"
          />
          {currentLangSlug}
          <OpenArrowIcon width={8} height={8} />
        </div>
      </div>

      {visible && (
        <div className="LangSwitcher__languages">
          {SUPPORTED_LANGUAGES.map((lang, index) => (
            <div
              key={index}
              onClick={() => setLanguage(lang)}
              className={classNames('LangSwitcher__header', {
                LangSwitcher__languageActive: lang === currentLangSlug,
              })}
            >
              <div className="LangSwitcher__header-title">
                {intl.formatMessage(languages[lang].name)}
              </div>
              <img src={languages[lang].icon} alt={lang} className="LangSwitcher__flag" />
            </div>
          ))}
        </div>
      )}

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .LangSwitcher {
          &__header {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            border-top: 1px solid ${currentTheme.interface.divider};
          }

          &__headerSelect {
            & svg {
              transform: rotate(-180deg);
            }
          }

          &__header-title {
            display: flex;
            align-items: center;
            gap: 3px;
            font-weight: 600;
            font-size: 11px;
            color: ${currentTheme.text.offset2};
          }

          &__header-language {
            display: flex;
            align-items: center;
            gap: 4px;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 11px;
            color: ${currentTheme.text.offset2};
          }

          &__flag {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            object-fit: cover;
          }

          &__languages {
            display: flex;
            flex-direction: column;
          }

          &__languageActive {
            cursor: default;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
