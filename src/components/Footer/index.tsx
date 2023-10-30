import { useThemeContext } from 'aave-ui-kit';
import { useIntl } from 'react-intl';

import Logo from 'components/Logo';
import OutLinkIcon from 'icons/OutLink';
import StatusChartIcon from 'icons/StatusChart';
import POWERED_BY_LAYER_ZERO from 'images/icon/PoweredByLayerZero';
import LINKS from 'ui-config/links';
import messages from './messages';

const FOOTER_MENU = [
  [
    {
      title: 'Documentation',
      description: 'Learn more about Radiant',
      link: 'https://docs.radiant.capital/radiant/',
      icon: null,
    },
    {
      title: 'Support Center',
      description: 'Submit feedback and report issues',
      link: 'https://support.radiant.capital/',
    },
    {
      title: 'Press Kit',
      description: 'Logo & brand assets',
      link: 'https://docs.radiant.capital/radiant/other-info/branding',
    },
  ],
  [
    {
      title: 'Discourse',
      description: 'Discuss governance proposals',
      link: 'https://community.radiant.capital/',
    },
    {
      title: 'Snapshot',
      description: 'Vote on live proposals',
      link: 'https://dao.radiant.capital/',
    },
  ],
  [
    {
      title: 'Medium',
      description: 'Long-form updates and news',
      link: 'https://medium.com/@RadiantCapital',
    },
    {
      title: 'Mirror',
      description: "Radiant's monthly newsletter",
      link: 'https://mirror.xyz/0xE1bd8447F97342E89A2B7500f5D34bCF3232e8b0',
    },
  ],
  [
    {
      title: 'Legal',
      description: 'Disclaimer & terms of service',
      link: 'https://docs.radiant.capital/radiant/other-info/legal-disclaimer',
    },
    {
      title: 'Career',
      description: 'Join our team',
      link: 'https://docs.radiant.capital/radiant/other-info/work-with-the-radiant-dao',
    },
  ],
  [
    {
      title: 'Security',
      description: 'Bug bounties',
      link: 'https://immunefi.com/bounty/radiant/',
    },
    {
      title: 'Status',
      description: 'Website uptime',
      link: 'https://status.radiant.capital/',
    },
  ],
];

const SOCIAL_MENU = [
  {
    title: 'Discord',
    link: 'https://discord.gg/radiantcapital',
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/RDNTCapital',
  },
  {
    title: 'Telegram',
    link: 'https://t.me/radiantcapitalofficial',
  },
  {
    title: 'YouTube',
    link: 'https://www.youtube.com/c/RadiantCapital/',
  },
];

export default function Footer() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <main className="Footer">
      <div className="Footer__container">
        <div className="Footer__info-container">
          <Logo />

          <div className="Footer__menu-container">
            {FOOTER_MENU.map((menuList, index) => (
              <div key={index} className="Footer__menu-list">
                {menuList.map((menu) => (
                  <a
                    key={menu.title}
                    target="_blank"
                    rel="noreferrer"
                    href={menu.link}
                    className="Footer__menu-item"
                  >
                    <p className="Footer__menu-item-title">
                      {menu.title}
                      <OutLinkIcon />
                    </p>
                    <p className="Footer__menu-item-description">{menu.description}</p>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <a
          href={LINKS.STATUS.link}
          target="_blank"
          rel="noreferrer"
          className="Footer__status-chart"
        >
          <StatusChartIcon /> {intl.formatMessage(messages.allSystem)}
        </a>
        <div className="Footer__bottom-container">
          <div className="Footer__social-menu-container">
            {SOCIAL_MENU.map((menu, index) => (
              <a key={menu.title} target="_blank" rel="noreferrer" href={menu.link}>
                <p className="Footer__social-menu-item-title">
                  {menu.title}
                  <OutLinkIcon />
                </p>
              </a>
            ))}
          </div>

          <p className="Footer__powered-by-layerzero">
            <POWERED_BY_LAYER_ZERO />
          </p>

          <p className="Footer__copyright">{intl.formatMessage(messages.copyRight)}</p>
        </div>
      </div>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/variables';
        @import 'src/_mixins/screen-size';

        .Footer {
          background: ${currentTheme.background.footer};
          border-top: 1px solid ${currentTheme.interface.tableBorder};
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 50px 20px;

          &__container {
            display: flex;
            flex-direction: column;
            max-width: $maxDeskWidth;
            width: 100%;
          }

          &__info-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            gap: 16px;
            margin-bottom: 60px;

            @include respond-to(lg) {
              flex-direction: column;
            }
          }

          &__menu-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            gap: 60px;

            @include respond-to(md) {
              grid-template-columns: 1fr 1fr;
            }
          }

          &__menu-list {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }

          &__menu-item {
            display: flex;
            flex-direction: column;
            gap: 6px;
            max-width: 130px;
            width: 100%;
            min-height: 60px;
          }

          &__menu-item-title {
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 14px;
            font-weight: 600;
            font-style: normal;
            line-height: 20px;
            color: ${currentTheme.text.main};
          }

          &__menu-item-description {
            font-size: 12px;
            color: ${currentTheme.text.offset2};
          }

          &__status-chart {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: ${currentTheme.text.offset3};
            margin-bottom: 16px;
          }

          &__bottom-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            width: 100%;

            @include respond-to(sm) {
              grid-template-columns: 1fr;
            }
          }

          &__social-menu-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 16px;
          }

          &__social-menu-item-title {
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 12px;
            font-weight: 700;
            color: ${currentTheme.text.main};
          }

          &__powered-by-layerzero {
            text-align: center;
            img {
              width: 195px;
              object-fit: contain;
            }
          }

          &__copyright {
            width: 100%;
            font-size: 12px;
            text-align: right;
            color: ${currentTheme.text.offset2};

            @include respond-to(sm) {
              text-align: center;
            }
          }
        }
      `}</style>
    </main>
  );
}
