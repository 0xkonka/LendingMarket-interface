import { PERMISSION } from '@radiantcapital/contract-helpers';
import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useThemeContext } from 'aave-ui-kit';

import PermissionWarning from 'ui-config/branding/PermissionWarning';
import { useUserWalletDataContext } from 'libs/web3-data-provider';
import migrationSharedStyles from '../../migrationSharedStyles';
import VideoContainer from '../../components/VideoContainer';
import MigrationStart from '../../components/MigrationStart';
import MigrationClaim from '../../components/MigrationClaim';
import MigrationRemove from '../../components/MigrationRemove';
import MigrationWithdraw from '../../components/MigrationWithdraw';
import MigrationDeposit from '../../components/MigrationDeposit';
import MigrationLoading from '../../components/MigrationLoading';
import MigrationComplete from '../../components/MigrationComplete';
import MigrationLoose from '../../components/MigrationLoose';
import MigrationSuccess from '../../components/MigrationSuccess';
import staticStyles from './style';

export interface MigrationStepSelectorProps {
  step?: number;
  goNextStep?: any;
  isWalletConnected?: boolean;
}

export const getMaximumTableDecimals = function (symbol: string) {
  switch (symbol) {
    case 'ETH':
      return 3;
    case 'WBTC':
      return 5;
    default:
      return 2;
  }
};

const migrationVideoUrls: any = {
  0: 'https://www.youtube.com/embed/FBF817nID30?rel=0',
  1: 'https://www.youtube.com/embed/Dwkj65C5PZ0?rel=0',
  2: 'https://www.youtube.com/embed/waheyMpGOA0?rel=0',
  3: 'https://www.youtube.com/embed/1VQlTYvs_U4?rel=0',
  4: '',
  5: 'https://www.youtube.com/embed/R5W4hpdU05w?rel=0',
  6: 'https://www.youtube.com/embed/KubP_DR8fjU?rel=0',
  7: '',
  8: '',
};

function MigrationStepSelector({
  step,
  goNextStep,
  isWalletConnected,
}: MigrationStepSelectorProps) {
  switch (step) {
    case 0:
      return (
        <MigrationStart
          isWalletConnected={isWalletConnected}
          step={step}
          goNextStep={goNextStep}
        ></MigrationStart>
      );
    case 1:
      return <MigrationClaim step={step} goNextStep={goNextStep}></MigrationClaim>;
    case 2:
      return <MigrationRemove step={step} goNextStep={goNextStep}></MigrationRemove>;
    case 3:
      return <MigrationWithdraw step={step} goNextStep={goNextStep}></MigrationWithdraw>;
    case 4:
      return <MigrationLoading step={step} goNextStep={goNextStep}></MigrationLoading>;
    case 5:
      return <MigrationDeposit step={step} goNextStep={goNextStep}></MigrationDeposit>;
    case 6:
      return <MigrationComplete step={step} goNextStep={goNextStep}></MigrationComplete>;
    case 7:
      return <MigrationLoose step={step} goNextStep={goNextStep}></MigrationLoose>;
    case 8:
      return <MigrationSuccess step={step} goNextStep={goNextStep}></MigrationSuccess>;
    default:
      return <MigrationStart step={step} goNextStep={goNextStep}></MigrationStart>;
  }
}

function MigrationMain() {
  const history = useHistory();
  const location = useLocation();
  const { currentAccount } = useUserWalletDataContext();
  const { currentTheme } = useThemeContext();

  const [step, setStep] = useState(0);

  const goNextStep = (num: number) => {
    if (num) history.push(`/migration?step=${num}`);
    else history.push(`/migration?step=${step + 1}`);
  };

  const goPreviousStep = () => {
    // exception to skip over loading page
    if (step === 5) history.push(`/migration?step=${step - 2}`);
    else history.push(`/migration?step=${step - 1}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const step = Number(searchParams.get('step'));
    if (step && step >= 1 && step <= 8 && currentAccount) {
      setStep(step);
    } else {
      setStep(0);
    }
  }, [currentAccount, history, location]);

  return (
    <>
      <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
        <div className="MigrationContainer">
          <div className="MigrationProgressBar">
            <div
              className="MigrationProgress"
              style={{ width: `calc(${(step / 8) * 100}%)` }}
            ></div>
          </div>
          <div className="MigrationContent">
            <div className="MigrationStepWrapper">
              <div className="MigrationStep">
                <div className="MigrationStepHeader">
                  {step > 0 && (
                    <div onClick={() => goPreviousStep()} className="MigrationBackButton">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 12H5M5 12L12 19M5 12L12 5"
                          stroke={currentTheme.text.main}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {step !== 7 && (
                  <div className="MigrationStepHeaderVideoContainer">
                    <VideoContainer url={migrationVideoUrls[step]} />
                  </div>
                )}

                <MigrationStepSelector
                  isWalletConnected={!!currentAccount}
                  step={step}
                  goNextStep={goNextStep}
                />
              </div>
            </div>
          </div>
        </div>
      </PermissionWarning>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {migrationSharedStyles}
      </style>

      <style jsx={true} global={true}>
        {`
          .MigrationTitle,
          .MigrationSectionTitle {
            color: ${currentTheme.text.main};
          }

          .MigrationDescription,
          .MigrationDisclaimer,
          .MigrationNote,
          .MigrationInputFieldLabelText {
            color: ${currentTheme.text.main}CC;
          }

          .MigrationTableItemValue,
          .MigrationTableItemQuantity {
            color: ${currentTheme.text.main};
          }

          .MigrationTable {
            background: ${currentTheme.interface.mainTable};
          }

          .MigrationTable,
          .MigrationTableItemRow {
            border-color: ${currentTheme.interface.offset1};
          }

          .MigrationSectionDivider {
            border-color: ${currentTheme.interface.offset1};
          }
        `}
      </style>
    </>
  );
}

export default MigrationMain;
