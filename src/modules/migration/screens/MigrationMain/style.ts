import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars.scss';

  .MigrationContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 64px);
  }

  .MigrationContent {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .MigrationContent > div {
    flex: 1;
  }

  .MigrationStepWrapper {
    display: flex;
    justify-content: center;
    padding: 16px;
  }

  .MigrationStep {
    display: flex;
    flex-direction: column;
    max-width: 560px;
    width: 100%;
  }

  .MigrationProgressBar {
    display: flex;
    height: 12px;
    width: 100%;
    background: rgba($purple, 0.3);
    overflow: hidden;
  }

  .MigrationProgress {
    height: 100%;
    min-width: 16px;
    background: rgba($purple, 1);
    transition: all ease 0.5s;
  }

  .MigrationStepHeader {
    display: flex;
    align-items: center;
    margin-top: 16px;
    min-height: 44px;
  }

  .MigrationBackButton {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: -12px;
    width: 44px;
    height: 44px;
    cursor: pointer;
  }

  .MigrationStepHeaderVideoContainer {
    margin-top: 16px;
  }
`;

export default staticStyles;
