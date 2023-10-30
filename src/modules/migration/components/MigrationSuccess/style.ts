import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .MigrationSuccess {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
  }

  .MigrationSuccessContent {
    display: flex;
    flex-direction: column;
    max-width: 520px;
    width: 100%;
    padding: $base-section-spacing 16px;
    animation: slideUpFadeOut 0.25s ease-out forwards;
    padding-top: 116px;
    max-height: 600px;
  }

  .MigrationSuccessCheckmark {
    margin-bottom: $base-section-spacing;
  }

  .MigrationSuccessContent > .MigrationButtonField {
    margin-top: 64px;
  }
`;

export default staticStyles;
