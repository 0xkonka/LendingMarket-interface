import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';
  @import 'src/modules/migration/migrationVars';

  .RdntInputField {
    padding: 20px 0px;
  }

  .MigrationCompleteCard {
    display: flex;
    flex-direction: column;
    border-radius: $base-radius;
    border: 1px solid;
    box-shadow: 0px 2px 12px rgba(3, 7, 40, 0.05);
  }

  .MigrationCompleteExplainerCarousel {
    display: flex;
    flex-direction: column;
    padding-top: 32px;
  }

  .MigrationCompleteExplainerCarouselController {
    display: flex;
    margin-top: 16px;
  }

  .MigrationCompleteExplainerCarouselCountContainer {
    display: flex;
    align-items: center;
  }

  .MigrationCompleteExplainerCarouselCount {
    content: '';
    position: 'relative';
    height: 10px;
    width: 10px;
    border-radius: 100%;
    margin-right: 8px;
  }

  .MigrationCompleteExplainerCarouselCount:last-child {
    margin-right: unset;
  }

  .MigrationCompleteExplainerCarouselButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: rgba($purple, 0);
    border: 1px solid $gray-400;
    transition: all 0.1s ease;
    border-radius: $base-radius;
    cursor: pointer;

    &.ButtonBack {
      margin-right: 16px;
    }

    &.ButtonForward {
      margin-left: 16px;
    }
  }

  .MigrationCompleteExplainerCarouselButton:hover {
    background: rgba($purple, 0.03);
  }

  .MigrationCompleteExplainerCard {
    padding: 24px;
    min-width: 340px;
    min-width: 340px;
  }

  .MigrationCompleteCardRow {
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    border-bottom: 1px solid $gray-200;
  }

  .MigrationCompleteCardRow:last-child {
    border: unset;
  }

  .MigrationCompleteCardLabel {
    color: $base-text-color;
    font-size: $base-font-size;
    font-weight: 600;
    line-height: 135%;
    margin-bottom: 8px;
  }

  .MigrationCompleteCardMainNumber {
    color: $base-text-color;
    font-size: $xxl-font-size;
    font-weight: 600;
    line-height: 100%;
  }

  .MigrationCompleteSectionGraphic {
    width: 100%;
    height: 200px;
    border-radius: $base-radius;
    background: $gray-200;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .MigrationCompleteSectionGraphic {
    .GraphicContent {
      margin: 0px 40px;
    }
    .GraphicContent h2 {
      margin-top: 16px;
      color: #250078;
    }
    .GraphicContent span {
      display: inline-block;
    }
    .LogoCenter {
      position: relative;
      max-width: 48px;
      max-height: 48px;
      height: 100%;
      width: 100%;
    }
    .BannerLeft {
      position: absolute;
      left: 0;
    }
    .BannerRight {
      position: absolute;
      right: 0;
    }
  }

  .MigrationCompleteInputMaxButton {
    display: flex;
    align-items: center;
    color: $purple;
    padding: 0px 24px;
    cursor: pointer;
    border-radius: $base-radius;
    height: 100%;
    background: rgba($purple, 0);
    transition: 0.2s ease;
  }

  .MigrationCompleteInputMaxButton:hover {
    background: rgba($purple, 0.05);
  }

  .MigrationCompleteMigrateLooseButton {
    display: flex;
    justify-content: center;
  }

  .MigrationCompleteMigrateLooseButton.MigrateLooseButtonDisabled > span,
  .MigrationCompleteMigrateLooseButton.MigrateLooseButtonDisabled > span:hover {
    cursor: not-allowed;
    opacity: 0.3;
    text-decoration: none;
  }

  .MigrationCompleteMigrateLooseButton > span {
    color: $purple;
    font-size: $base-font-size;
    font-weight: 600;
    cursor: pointer;
    padding: 16px;
  }

  .MigrationCompleteMigrateLooseButton > span:hover {
    text-decoration: underline;
  }

  /* RDNT/WETH BAR */
  .MigrationCompleteDlpBarContainer {
    display: flex;
    flex-direction: column;
  }

  .MigrationCompleteDlpBarLabelContainer {
    display: flex;
    flex-direction: row;
    padding-top: 24px;
  }

  .MigrationCompleteDlpBarLabelLeft {
    margin-right: auto;
  }

  .MigrationCompleteDlpBarLabelLeft > span {
    margin-left: 8px;
  }

  .MigrationCompleteDlpBarLabelRight > span {
    margin-right: 8px;
  }

  .MigrationCompleteDlpBarLabelLeft,
  .MigrationCompleteDlpBarLabelRight {
    display: flex;
    align-items: center;
    font-size: $sm-font-size;
  }

  .MigrationCompleteDlpBar {
    width: 100%;
    height: 12px;
    border-radius: 8px;
    background: $blue;
    overflow: hidden;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .MigrationCompleteDlpBarFill {
    background: $purple;
    width: 80%;
    height: 100%;
    border-right: 2px solid $white;
  }

  /* DLP BALANCE */
  .MigrationCompleteDlpBalanceBarContainer {
    display: flex;
    flex-direction: column;
    padding-top: 12px;
  }

  .MigrationCompleteDlpBalanceLabelContainer {
    display: flex;
  }

  .MigrationCompleteDlpBalanceLabelContainer > h5,
  .MigrationCompleteBannerNumbers > h5 {
    color: $gray-600;
    font-size: $base-font-size;
    font-weight: 600;
    margin-top: auto;
    margin-left: 4px;
  }

  /* DLP TOPBAR */
  .MigrationCompleteBanner {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    padding: 12px 8px 8px 8px;
    background: $white;
    box-shadow: 0 1px 4px 0 rgba($black, 0.1);
    transform: translateY(-100%);
    transition: transform 0.25s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .BannerVisible {
    transform: translateY(0);
  }

  .MigrationCompleteBannerLabelContainer {
    display: flex;
    max-width: 780px;
    width: 100%;
  }

  .MigrationCompleteBannerLabel {
    font-size: $sm-font-size;
    font-weight: 600;
    color: $base-text-color;
  }

  .MigrationCompleteBannerNumbers {
    display: flex;
  }

  .MigrationCompleteBannerNumbers > h4 {
    color: $black;
    font-size: $xl-font-size;
    font-weight: 600;
  }

  .MigrationCompleteBannerLabel {
    margin-left: auto;
  }

  .MigrationCompleteBanner > .MigrationCompleteDlpBalanceBarContainer {
    max-width: 780px;
    width: 100%;
  }
`;

export default staticStyles;
