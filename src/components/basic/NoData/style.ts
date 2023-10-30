import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .NoData {
    font-size: $fontSizeLarge;
    @include respond-to(xl) {
      font-size: $fontSizeRegular;
    }
    @include respond-to(lg) {
      font-size: $fontSizeMedium;
    }
    @include respond-to(md) {
      font-size: $fontSizeRegular;
    }
  }
`;

export default staticStyles;
