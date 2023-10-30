import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/variables';

  .SelectChainField {
    &__select {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      font-size: $fontSizeRegular;

      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        object-fit: contain;
        margin-right: 10px;
      }

      .network-icon {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        object-fit: contain;
        margin-right: 10px;
      }
    }

    &__select-value {
      display: flex;
      align-items: center;

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
