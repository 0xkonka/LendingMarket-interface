import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .TableAprCol {
    .ValuePercent__value {
      @include respond-to(xl) {
        font-size: $fontSizeMedium;
      }
      @include respond-to(sm) {
        font-size: $fontSizeSmall;
      }
    }

    &__noData {
      font-size: $fontSizeLarge;
      @include respond-to(xl) {
        font-size: $fontSizeMedium;
      }
      @include respond-to(sm) {
        font-size: $fontSizeSmall;
      }
    }
  }
`;

export default staticStyles;
