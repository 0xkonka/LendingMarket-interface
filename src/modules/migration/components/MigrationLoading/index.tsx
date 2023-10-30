import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from 'aave-ui-kit';
import { MigrationStepSelectorProps } from '../../screens/MigrationMain';
import messages from './messages';
import staticStyles from './style';

const LOAD_TIME = 4000;

export default function MigrationLoading({ step, goNextStep }: MigrationStepSelectorProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  useEffect(() => {
    const timeout = setTimeout(() => goNextStep(), LOAD_TIME);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.height = '';
      document.body.style.overflowY = '';
    };
  }, []);

  return (
    <>
      <div className="MigrationLoading">
        <div className="MigrationLoadingContent" style={{ animationDelay: `${LOAD_TIME * 0.9}ms` }}>
          <div className="MigrationLoadingSpinner"></div>
          <div className="MigrationLoadingTitleWrapper">
            <h1 className="MigrationTitle">{intl.formatMessage(messages.title)}</h1>
            <div className="MigrationLoadingEllipses">
              <div className="MigrationLoadingEllipsesDot"></div>
              <div
                className="MigrationLoadingEllipsesDot"
                style={{ animationDelay: '500ms' }}
              ></div>
              <div
                className="MigrationLoadingEllipsesDot"
                style={{ animationDelay: '750ms' }}
              ></div>
            </div>
          </div>
          <p className="MigrationDescription">{intl.formatMessage(messages.description1)}</p>
          <div className="MigrationLoadingPillsContainer">
            <div className="MigrationLoadingPill">
              <div className="MigrationLoadingPillCheck">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 6.5L7.5 12L5 9.5"
                    stroke="#5F00FA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>{intl.formatMessage(messages.pill1)}</span>
            </div>
            <div
              className="MigrationLoadingPill"
              style={{ animationDelay: `${LOAD_TIME * 0.25}ms` }}
            >
              <div className="MigrationLoadingPillCheck">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 6.5L7.5 12L5 9.5"
                    stroke="#5F00FA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>{intl.formatMessage(messages.pill2)}</span>
            </div>
            <div
              className="MigrationLoadingPill"
              style={{ animationDelay: `${LOAD_TIME * 0.5}ms` }}
            >
              <div className="MigrationLoadingPillCheck">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 6.5L7.5 12L5 9.5"
                    stroke="#5F00FA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>{intl.formatMessage(messages.pill3)}</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .MigrationLoading {
            background: ${currentTheme.interface.mainTable};
          }
        `}
      </style>
    </>
  );
}
