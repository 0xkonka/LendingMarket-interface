import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/variables';

  .SelectTokenField {
    .DropdownWrapper__content {
      width: 100%;
      top: 0;
    }

    &__select {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      font-size: $fontSizeRegular;
    }

    &__select-value {
      display: flex;
      align-items: center;
      gap: 4px;

      span {
        font-size: $fontSizeLarge;
      }
    }

    &__selectValueActive {
      opacity: 1;
    }

    &__items {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default staticStyles;
