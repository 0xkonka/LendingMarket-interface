import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/variables';
  @import 'src/_mixins/screen-size';

  .FreezedWarning {
    font-size: $fontSizeRegular;
    font-weight: 300;
    @include respond-to(xl) {
      font-size: $fontSizeMedium;
    }
    @include respond-to(lg) {
      font-size: $fontSizeSmall;
    }
    @include respond-to(sm) {
      font-size: $fontSizeXSmall;
    }
    a {
      font-weight: 600;
    }
  }
`;

export default staticStyles;
