import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .MigrationLoading {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
  }

  .MigrationLoadingContent {
    display: flex;
    flex-direction: column;
    max-width: 520px;
    width: 100%;
    padding: $base-section-spacing 16px;
    animation: slideUpFadeOut 0.25s ease-out forwards;
  }

  .MigrationLoadingSpinner {
    border: 6px solid rgba($purple, 0.1);
    border-top-color: $purple;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    animation: spin 1s linear infinite;
    margin-top: $base-section-spacing;
    margin-bottom: $base-section-spacing;
  }

  .MigrationLoadingTitleWrapper > .MigrationTitle {
    font-size: $xxl-font-size;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .MigrationLoadingPillsContainer {
    padding-top: $base-section-spacing;
  }

  .MigrationLoadingPill {
    display: flex;
    align-items: center;
    color: $purple;
    background: rgba($purple, 0.1);
    border-radius: 64px;
    padding: 6px 8px;
    padding-right: 12px;
    width: max-content;
    margin-bottom: 16px;
    opacity: 0;
    transform: translateY(100%);
    animation: slideUpFadeIn 0.5s ease-out forwards;
  }

  @keyframes slideUpFadeIn {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes slideUpFadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .MigrationLoadingPill > span {
    font-weight: 600;
    font-size: $base-font-size;
  }

  .MigrationLoadingPillCheck {
    margin-right: 4px;
  }

  .MigrationLoadingEllipses {
    display: flex;
    align-items: end;
    height: 42px;
    padding-left: 4px;
    padding-bottom: 10px;
  }

  .MigrationLoadingEllipsesDot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    margin-right: 3px;
    background-color: $black;
    opacity: 0;
    animation: fadeInDots 1.5s forwards;
  }

  @keyframes fadeInDots {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .MigrationLoadingTitleWrapper {
    display: flex;
    flex-direction: row;
  }
`;

export default staticStyles;
