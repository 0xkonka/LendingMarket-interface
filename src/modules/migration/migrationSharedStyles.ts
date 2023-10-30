import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/modules/migration/migrationVars';

  .MigrationLabel {
    color: $purple;
    font-weight: 600;
    font-size: $base-font-size;
    line-height: 135%;
    margin-top: $base-section-spacing;
    margin-bottom: 8px;
  }

  .MigrationTitle {
    font-weight: 600;
    font-size: $xl-font-size;
    line-height: 150%;
    margin-bottom: 8px;
  }

  .MigrationDescription {
    font-weight: 500;
    font-size: $base-font-size;
    line-height: 135%;
  }

  .MigrationDescription > strong {
    color: inherit;
    font-weight: 600;
  }

  .MigrationSectionTitle {
    font-weight: 600;
    font-size: $lg-font-size;
    line-height: 150%;
    margin-bottom: 8px;
  }

  .MigrationDisclaimer {
    font-weight: 500;
    font-size: $xs-font-size;
    line-height: 150%;
    padding-top: 16px;
  }

  .MigrationButtonField {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: $base-section-spacing;
  }

  .MigrationTextLink {
    display: inline-block;
    color: $purple;
    font-weight: 600;
  }

  .MigrationTextLink:hover {
    text-decoration: underline;
  }

  .MigrationCheckboxContainer {
    display: flex;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .MigrationCheckboxContainer .MigrationDescription {
    flex: 1;
  }

  .MigrationCheckbox {
    position: relative;
    height: 24px;
    width: 24px;
    border: 1px solid $purple;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 12px;
  }

  .MigrationCheckbox::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%) rotate(-45deg);
    width: 12px;
    height: 8px;
    border: 2px solid $white;
    border-top: none;
    border-right: none;
    opacity: 0;
  }

  .MigrationCheckbox:hover {
    background: rgba($purple, 0.05);
  }

  .MigrationCheckbox:checked {
    background: $purple;
  }

  .MigrationCheckbox:checked::before {
    opacity: 1;
  }

  .MigrationSectionContainer {
    display: flex;
    flex-direction: column;
    padding-top: $base-section-spacing;
    padding-bottom: $base-section-spacing;
  }

  .MigrationNote {
    display: flex;
    flex-direction: row;
    border-left: 2px solid $purple;
    padding: 8px 12px;
    background: rgba($purple, 0.05);
    color: $base-text-color;
  }

  .MigrationNote .MigrationNotePretext {
    font-weight: 600;
    color: $purple;
    margin-right: 4px;
  }

  .MigrationNoteIconContainer {
    display: flex;
    padding-top: 3px;
    padding-right: 12px;
  }

  .MigrationContentContainer {
    padding-top: 24px;
  }

  .MigrationInputField {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .MigrationInputFieldLabel {
    display: flex;
    font-weight: 600;
    font-size: $sm-font-size;
    margin-bottom: 12px;
  }

  .MigrationInputFieldLabelText {
    margin-right: 4px;
  }

  .MigrationInputFieldLabelNumber {
    color: $purple;
    font-family: 'Inter';
  }

  .MigrationSectionDivider {
    margin-top: 44px;
    margin-bottom: 16px;
    border: 1px solid;
  }

  .MigrationEthIcon {
    border-radius: 100%;
    border: 1px solid $gray-200;
  }

  .MigrationTable {
    border-radius: $base-radius;
    border: 1px solid;
    margin-top: $base-section-spacing;
    margin-bottom: 16px;
    box-shadow: 0px 2px 12px rgba(3, 7, 40, 0.05);
  }

  .MigrationTableItemRow {
    display: flex;
    padding: 24px 16px;
    border-bottom: 1px solid;
  }

  .MigrationTableItemRow:last-child {
    border: unset;
  }

  .MigrationTableItemLabel {
    display: flex;
    align-items: center;
    font-size: $lg-font-size;
    min-width: 104px;
  }

  .MigrationTableItemLabel > span {
    font-weight: 600;
    line-height: 100%;
    margin-left: 8px;
  }

  .MigrationTableItemNumbers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    text-align: right;
    min-height: 44px;
    font-family: 'Inter';
    min-width: 80px;
  }

  .MigrationTableItemValue {
    font-size: $lg-font-size;
    font-weight: 600;
  }

  .MigrationTableItemQuantity {
    color: rgba($black, 0.5);
    font-size: $xs-font-size;
  }

  .MigrationError {
    padding-top: 8px;
    color: red;
  }

  .MigrationNumbersFont {
    font-family: 'Inter';
  }

  @media (min-width: 425px) {
    .MigrationTitle {
      font-size: $xxl-font-size;
    }
    .MigrationTableItemLabel {
      min-width: 160px;
    }
  }
`;

export default staticStyles;
